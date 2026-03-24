import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';

const quickTopics = ['تتبع الطلب', 'استرجاع مبلغ', 'مشكلة في الرحلة', 'الدفع', 'الاشتراك كتاجر'];

const ChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'support', text: 'مرحباً بك في مركز الدعم. كيف نساعدك اليوم؟', time: '09:30' },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const nextMessage = { id: Date.now().toString(), sender: 'user', text: message.trim(), time: 'الآن' };
    setMessages((prev) => [...prev, nextMessage]);
    setMessage('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `${Date.now()}-reply`, sender: 'support', text: 'تم استلام رسالتك، وسيتم الرد عليك خلال دقائق.', time: 'الآن' }]);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
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

        <View style={styles.topicsWrap}>
          {quickTopics.map((topic) => (
            <TouchableOpacity key={topic} style={styles.topicChip} onPress={() => setMessage(topic)}>
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.messagesCard}>
          {messages.map((item) => (
            <View key={item.id} style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.supportRow]}>
              <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.supportBubble]}>
                <Text style={[styles.messageText, item.sender === 'user' && styles.userMessageText]}>{item.text}</Text>
                <Text style={[styles.messageTime, item.sender === 'user' && styles.userTime]}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
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
  header: { backgroundColor: colors.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: fonts.bold, color: colors.text },
  content: { padding: spacing.md, paddingBottom: 120 },
  heroCard: { backgroundColor: colors.primary, borderRadius: 28, padding: spacing.lg, ...shadows.md },
  heroTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 24, textAlign: 'right' },
  heroSubtitle: { color: 'rgba(255,255,255,0.86)', marginTop: spacing.sm, textAlign: 'right', lineHeight: 22 },
  topicsWrap: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  topicChip: { backgroundColor: colors.card, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10, ...shadows.sm },
  topicText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13 },
  messagesCard: { marginTop: spacing.lg, backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, ...shadows.sm },
  messageRow: { marginBottom: spacing.sm },
  userRow: { alignItems: 'flex-start' },
  supportRow: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '82%', borderRadius: 22, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  supportBubble: { backgroundColor: colors.cardSecondary },
  userBubble: { backgroundColor: colors.primary },
  messageText: { color: colors.text, textAlign: 'right', lineHeight: 21 },
  userMessageText: { color: colors.white },
  messageTime: { color: colors.textTertiary, fontSize: 11, marginTop: spacing.xs, textAlign: 'right' },
  userTime: { color: 'rgba(255,255,255,0.7)' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingTop: spacing.md, flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.sm, ...shadows.float },
  attachButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, minHeight: 48, paddingHorizontal: spacing.md, textAlign: 'right', color: colors.text },
  sendButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendButtonDisabled: { opacity: 0.45 },
});

export default ChatScreen;
