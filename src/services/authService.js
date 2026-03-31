import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { fetchAppUserByPhone, upsertAppUser } from './appUserService';

const generateOtpCode = () => String(Math.floor(1000 + Math.random() * 9000));

export const requestAuthCode = async ({ phone, mode = 'login', profile = {} }) => {
  if (!phone) {
    return { data: null, error: new Error('Phone is required.') };
  }

  if (!isSupabaseConfigured || !supabase) {
    return {
      data: {
        phone,
        code: '1234',
        mode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        profile,
      },
      error: null,
    };
  }

  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('auth_verifications')
    .insert({
      phone,
      auth_mode: mode,
      code,
      full_name: profile.name || null,
      city: profile.city || null,
      expires_at: expiresAt,
      is_used: false,
    })
    .select()
    .single();

  return { data, error };
};

export const verifyAuthCode = async ({ phone, code, mode = 'login', profile = {} }) => {
  if (!phone || !code) {
    return { data: null, error: new Error('Phone and code are required.') };
  }

  if (!isSupabaseConfigured || !supabase) {
    const fallbackUser = {
      phone,
      name: profile.name || 'مستخدم جديد',
      city: profile.city || 'الرياض',
      district: profile.district || 'حي الياسمين',
      role: 'user',
      walletBalance: 0,
      addresses: [],
    };

    return {
      data: {
        user: fallbackUser,
      },
      error: code === '1234' ? null : new Error('Invalid verification code.'),
    };
  }

  const { data: verification, error } = await supabase
    .from('auth_verifications')
    .select('*')
    .eq('phone', phone)
    .eq('code', code)
    .eq('is_used', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !verification) {
    return { data: null, error: error || new Error('Verification code not found.') };
  }

  if (new Date(verification.expires_at).getTime() < Date.now()) {
    return { data: null, error: new Error('Verification code expired.') };
  }

  const { data: existingUser } = await fetchAppUserByPhone(phone);

  if (mode === 'login' && !existingUser) {
    return { data: null, error: new Error('هذا الرقم غير مسجل. أنشئ حسابًا أولاً.') };
  }

  const { data: savedUser, error: saveError } = await upsertAppUser({
    phone,
    name: existingUser?.name || profile.name || verification.full_name || 'مستخدم التطبيق',
    city: existingUser?.city || profile.city || verification.city || 'الرياض',
    district: existingUser?.district || profile.district || 'حي الياسمين',
    role: 'user',
    walletBalance: existingUser?.walletBalance || 0,
  });

  if (saveError) {
    return { data: null, error: saveError };
  }

  await supabase
    .from('auth_verifications')
    .update({
      is_used: true,
      verified_at: new Date().toISOString(),
    })
    .eq('id', verification.id);

  const { data: dbUser } = await fetchAppUserByPhone(phone);

  return {
    data: {
      user: dbUser || {
        id: savedUser?.id || null,
        phone,
        name: profile.name || verification.full_name || 'مستخدم التطبيق',
        city: profile.city || verification.city || 'الرياض',
        district: 'حي الياسمين',
        role: 'user',
        walletBalance: 0,
        addresses: [],
      },
    },
    error: null,
  };
};
