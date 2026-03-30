import { isSupabaseConfigured, supabase } from '../lib/supabase';

export const submitVendorApplication = async (application) => {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Supabase is not configured.'),
    };
  }

  const payload = {
    store_name: application.storeName,
    owner_name: application.ownerName,
    phone: application.phone,
    email: application.email || null,
    category: application.category,
    description: application.description || null,
    address: application.address,
    city: application.city,
    cr_number: application.crNumber,
    id_number: application.idNumber,
    bank_name: application.bankName || null,
    account_number: application.accountNumber || null,
    iban: application.iban || null,
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('vendor_applications')
    .insert(payload)
    .select()
    .single();

  return { data, error };
};

export const fetchVendorApplicationStatus = async (phone) => {
  if (!isSupabaseConfigured || !supabase || !phone) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from('vendor_applications')
    .select('id,store_name,owner_name,phone,category,status,review_notes,created_at,approved_at,rejected_at')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return { data, error };
};
