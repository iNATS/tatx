import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { fetchSupportConversation, sendSupportMessage } from '../services/appUserService';

const getMessageDirectionStyle = (value) => {
  const content = String(value || '').trim();

  if (!content) {
    return { writingDirection: 'rtl', textAlign: 'right' };
  }

  const hasArabic = /[\u0600-\u06FF]/.test(content);
  const hasLatin = /[A-Za-z]/.test(content);
  const hasUrlLikeContent = /[@:/._-]/.test(content);

  if (!hasArabic && (hasLatin || hasUrlLikeContent)) {
    return { writingDirection: 'ltr', textAlign: 'left' };
  }

  return { writingDirection: 'rtl', textAlign: 'right' };
};

const ChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isRTL, rowDirection, textAlignStart, supportTopics = [], user } = useApp();
  const scrollViewRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'support', text: 'مرحباً بك في مركز الدعم. كيف نساعدك اليوم؟', time: '09:30' },
  ]);

  useEffect(() => {
    let cancelled = false;

    const loadConversation = async () => {
      if (!user?.phone) {
        return;
      }

      const { data } = await fetchSupportConversation({
        phone: user.phone,
        name: user.name,
      });

      if (!cancelled && data?.messages?.length) {
        setMessages(data.messages);
      }
    };

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, [user?.phone, user?.name]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const pendingText = message.trim();
    const nextMessage = { id: Date.now().toString(), sender: 'user', text: pendingText, time: 'الآن' };
    setMessages((prev) => [...prev, nextMessage]);
    setMessage('');

    const { data } = await sendSupportMessage({
      phone: user?.phone,
      name: user?.name,
      text: pendingText,
    });

    if (data?.length) {
      setMessages((prev) => {
        const withoutPending = prev.filter((item) => item.id !== nextMessage.id);
        return [...withoutPending, ...data];
      });
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: `${Date.now()}-reply`, sender: 'support', text: 'تم استلام رسالتك، وسيتم الرد عليك خلال دقائق.', time: 'الآن' }]);
      }, 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الدعم والمساعدة</Text>
        <TouchableOpacity onPress={() => Alert.alert('اتصال', 'سيتم تحويلك إلى خدمة العملاء.')} style={styles.headerButton}>
          <Ionicons name="call-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>دائما معك وقت ما تحتاجنا</Text>
          <Text style={styles.heroSubtitle}>اختر موضوعًا سريعًا أو ابدأ المحادثة مباشرة مع فريق الدعم.</Text>
        </View>

        <View style={[styles.topicsWrap, { flexDirection: rowDirection }]}>
          {supportTopics.map((topic) => (
            <TouchableOpacity key={topic} style={styles.topicChip} onPress={() => setMessage(topic)}>
              <Text style={[styles.topicText, { textAlign: textAlignStart }]}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.messagesCard}>
          {messages.map((item) => (
            <View key={item.id} style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.supportRow]}>
              <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.supportBubble]}>
                <Text style={[styles.messageText, getMessageDirectionStyle(item.text), item.sender === 'user' && styles.userMessageText]}>{item.text}</Text>
                <Text style={[styles.messageTime, getMessageDirectionStyle(item.time), item.sender === 'user' && styles.userTime]}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md), flexDirection: rowDirection }]}>
        <TouchableOpacity style={styles.attachButton} onPress={() => Alert.alert('مرفقات', 'سيتم إتاحة إضافة الصور قريباً.')}>
          <Ionicons name="attach-outline" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="اكتب رسالتك"
          placeholderTextColor={colors.textTertiary}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]} disabled={!message.trim()} onPress={sendMessage}>
          <Ionicons name="send" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.card, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: fonts.bold, color: colors.text },
  content: { padding: spacing.md, paddingBottom: 120 },
  heroCard: { backgroundColor: colors.primary, borderRadius: 28, padding: spacing.lg, ...shadows.md },
  heroTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 24, textAlign: 'right' },
  heroSubtitle: { color: 'rgba(255,255,255,0.86)', marginTop: spacing.sm, textAlign: 'right', lineHeight: 22 },
  topicsWrap: { flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  topicChip: { backgroundColor: colors.card, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10, ...shadows.sm },
  topicText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13 },
  messagesCard: { marginTop: spacing.lg, backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, ...shadows.sm },
  messageRow: { marginBottom: spacing.sm },
  userRow: { alignItems: 'flex-end' },
  supportRow: { alignItems: 'flex-start' },
  messageBubble: { maxWidth: '82%', borderRadius: 22, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  supportBubble: { backgroundColor: colors.cardSecondary },
  userBubble: { backgroundColor: colors.primary },
  messageText: { color: colors.text, textAlign: 'right', lineHeight: 21 },
  userMessageText: { color: colors.white },
  messageTime: { color: colors.textTertiary, fontSize: 11, marginTop: spacing.xs, textAlign: 'right' },
  userTime: { color: 'rgba(255,255,255,0.7)' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingTop: spacing.md, alignItems: 'center', gap: spacing.sm, ...shadows.float },
  attachButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, minHeight: 48, paddingHorizontal: spacing.md, textAlign: 'right', color: colors.text },
  sendButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendButtonDisabled: { opacity: 0.45 },
});

export default ChatScreen;
