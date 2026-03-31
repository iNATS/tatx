import { isSupabaseConfigured, supabase } from '../lib/supabase';

const normalizeUserProfile = (profile, addresses = []) => ({
  id: profile?.id || null,
  name: profile?.full_name || 'عميل التطبيق',
  phone: profile?.phone || null,
  email: profile?.email || null,
  role: profile?.role || 'user',
  city: profile?.city || 'الرياض',
  district: profile?.district || '',
  walletBalance: Number(profile?.wallet_balance || 0),
  addresses: (addresses || []).map((address) => ({
    id: address.id,
    label: address.label,
    address: address.address_line,
    details: address.details || '',
    isDefault: Boolean(address.is_default),
    icon: address.icon || 'home-outline',
  })),
});

export const upsertAppUser = async (userInput) => {
  if (!isSupabaseConfigured || !supabase || !userInput?.phone) {
    return { data: null, error: null };
  }

  const payload = {
    phone: userInput.phone,
    full_name: userInput.name || 'عميل التطبيق',
    email: userInput.email || null,
    city: userInput.city || 'الرياض',
    district: userInput.district || null,
    role: userInput.role || 'user',
    wallet_balance: Number(userInput.walletBalance || 0),
  };

  const { data, error } = await supabase
    .from('app_users')
    .upsert(payload, { onConflict: 'phone' })
    .select()
    .single();

  return { data, error };
};

export const fetchAppUserByPhone = async (phone) => {
  if (!isSupabaseConfigured || !supabase || !phone) {
    return { data: null, error: null };
  }

  const { data: profile, error } = await supabase
    .from('app_users')
    .select('*')
    .eq('phone', phone)
    .maybeSingle();

  if (error || !profile) {
    return { data: null, error };
  }

  const { data: addresses, error: addressError } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', profile.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true });

  if (addressError) {
    return { data: normalizeUserProfile(profile), error: addressError };
  }

  return { data: normalizeUserProfile(profile, addresses), error: null };
};

export const syncUserAddresses = async (userId, addresses = []) => {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return { data: addresses, error: null };
  }

  const { error: deleteError } = await supabase
    .from('user_addresses')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    return { data: null, error: deleteError };
  }

  if (!addresses.length) {
    return { data: [], error: null };
  }

  const payload = addresses.map((address, index) => ({
    user_id: userId,
    label: address.label || `عنوان ${index + 1}`,
    address_line: address.address || '',
    details: address.details || null,
    icon: address.icon || 'home-outline',
    is_default: Boolean(address.isDefault),
  }));

  const { data, error } = await supabase
    .from('user_addresses')
    .insert(payload)
    .select('*');

  if (error) {
    return { data: null, error };
  }

  return {
    data: data.map((address) => ({
      id: address.id,
      label: address.label,
      address: address.address_line,
      details: address.details || '',
      isDefault: Boolean(address.is_default),
      icon: address.icon || 'home-outline',
    })),
    error: null,
  };
};

export const fetchSupportConversation = async ({ phone, name }) => {
  if (!isSupabaseConfigured || !supabase || !phone) {
    return { data: null, error: null };
  }

  const { data: profile } = await upsertAppUser({ phone, name, role: 'user' });

  if (!profile?.id) {
    return { data: null, error: null };
  }

  const { data: existingConversation } = await supabase
    .from('support_conversations')
    .select('*')
    .eq('user_id', profile.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let conversation = existingConversation;

  if (!conversation) {
    const { data: createdConversation, error: conversationError } = await supabase
      .from('support_conversations')
      .insert({
        user_id: profile.id,
        subject: 'دعم التطبيق',
        status: 'open',
        last_message_preview: 'مرحباً بك في مركز الدعم.',
      })
      .select()
      .single();

    if (conversationError) {
      return { data: null, error: conversationError };
    }

    conversation = createdConversation;

    await supabase.from('support_messages').insert({
      conversation_id: conversation.id,
      sender_role: 'support',
      content: 'مرحباً بك في مركز الدعم. كيف نساعدك اليوم؟',
    });
  }

  const { data: messages, error } = await supabase
    .from('support_messages')
    .select('*')
    .eq('conversation_id', conversation.id)
    .order('created_at', { ascending: true });

  if (error) {
    return { data: null, error };
  }

  return {
    data: {
      conversation,
      messages: (messages || []).map((message) => ({
        id: message.id,
        sender: message.sender_role === 'support' ? 'support' : 'user',
        text: message.content,
        time: new Date(message.created_at).toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })),
    },
    error: null,
  };
};

export const sendSupportMessage = async ({ phone, name, text }) => {
  if (!isSupabaseConfigured || !supabase || !phone || !text?.trim()) {
    return { data: null, error: null };
  }

  const { data: conversationData, error: conversationError } = await fetchSupportConversation({
    phone,
    name,
  });

  if (conversationError || !conversationData?.conversation?.id) {
    return { data: null, error: conversationError };
  }

  const conversationId = conversationData.conversation.id;

  const { data: userMessage, error } = await supabase
    .from('support_messages')
    .insert({
      conversation_id: conversationId,
      sender_role: 'user',
      content: text.trim(),
    })
    .select()
    .single();

  if (error) {
    return { data: null, error };
  }

  const autoReplyText = 'تم استلام رسالتك، وسيتم الرد عليك خلال دقائق.';

  const { data: supportMessage } = await supabase
    .from('support_messages')
    .insert({
      conversation_id: conversationId,
      sender_role: 'support',
      content: autoReplyText,
    })
    .select()
    .single();

  await supabase
    .from('support_conversations')
    .update({
      last_message_preview: text.trim(),
      status: 'open',
    })
    .eq('id', conversationId);

  return {
    data: [
      {
        id: userMessage.id,
        sender: 'user',
        text: userMessage.content,
        time: 'الآن',
      },
      supportMessage
        ? {
            id: supportMessage.id,
            sender: 'support',
            text: supportMessage.content,
            time: 'الآن',
          }
        : null,
    ].filter(Boolean),
    error: null,
  };
};
