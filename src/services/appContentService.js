import {
  demoAccounts,
  demoMarket,
  homeServices,
  homeOffers,
  onboardingSlides,
  notifications,
  restaurants,
  products,
  orders,
  paymentMethods,
  stayBookingOptions,
  supportTopics,
  walletTransactions,
  user,
} from '../data/staticData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export const defaultAppContent = {
  demoAccounts,
  demoMarket,
  homeServices,
  homeOffers,
  onboardingSlides,
  notifications,
  restaurants,
  products,
  orders,
  paymentMethods,
  stayBookingOptions,
  supportTopics,
  walletTransactions,
  user,
};

const sectionKeys = [
  'demoAccounts',
  'demoMarket',
  'homeServices',
  'homeOffers',
  'onboardingSlides',
  'notifications',
  'restaurants',
  'products',
  'orders',
  'paymentMethods',
  'stayBookingOptions',
  'supportTopics',
  'walletTransactions',
  'user',
];

const mapSectionsToContent = (rows = []) => {
  const nextContent = { ...defaultAppContent };

  rows.forEach((row) => {
    if (!row?.section_key || typeof row.payload === 'undefined' || !row.is_active) {
      return;
    }

    nextContent[row.section_key] = row.payload;
  });

  return nextContent;
};

export const fetchAppContent = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return {
      content: defaultAppContent,
      source: 'static',
      error: null,
    };
  }

  const { data, error } = await supabase
    .from('app_content_sections')
    .select('section_key,payload,is_active,updated_at')
    .in('section_key', sectionKeys);

  if (error) {
    return {
      content: defaultAppContent,
      source: 'static',
      error,
    };
  }

  return {
    content: mapSectionsToContent(data),
    source: 'supabase',
    error: null,
  };
};

export const createOrderInSupabase = async (order) => {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null };
  }

  const payload = {
    order_number: order.id,
    customer_name: order.customerName || order.user?.name || order.userName || 'عميل التطبيق',
    customer_phone: order.customerPhone || order.user?.phone || null,
    vendor_name: order.restaurantName || 'طلب جديد',
    status: order.status || 'pending',
    address: order.address || null,
    payment_method: order.paymentMethod || null,
    currency: order.currency || 'SAR',
    subtotal: Number(order.subtotal || 0),
    delivery_fee: Number(order.deliveryFee || 0),
    discount: Number(order.discount || 0),
    total: Number(order.total || 0),
    notes: order.notes || null,
    delivery_window: order.deliveryWindow || null,
    items: order.items || [],
    raw_order: order,
  };

  const { data, error } = await supabase
    .from('customer_orders')
    .insert(payload)
    .select()
    .single();

  return { data, error };
};
