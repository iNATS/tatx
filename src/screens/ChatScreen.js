import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const ChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'مرحباً بك في دعم تاتكس! 👋',
      sender: 'support',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'كيف يمكنني مساعدتك اليوم؟',
      sender: 'support',
      timestamp: new Date(Date.now() - 3590000),
    },
  ]);
  const scrollViewRef = useRef(null);

  const quickReplies = [
    'لدي مشكلة في طلب',
    'أريد استرجاع مبلغ',
    'تأخر في التوصيل',
    'منتج خاطئ',
    'استفسار عام',
  ];

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate support response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: 'شكراً لتواصلك معنا. سيقوم أحد ممثلي الخدمة بالرد عليك قريباً.',
          sender: 'support',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const handleQuickReply = (text) => {
    setMessage(text);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.supportAvatar}>
            <Ionicons name="headset" size={24} color={colors.white} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>دعم تاتكس</Text>
            <View style={styles.onlineStatus}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>متصل الآن</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="call" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.welcomeGradient}>
            <Ionicons name="chatbubbles" size={32} color={colors.white} />
            <Text style={styles.welcomeTitle}>مرحباً بك في الدعم</Text>
            <Text style={styles.welcomeSubtitle}>فريقنا هنا لمساعدتك 24/7</Text>
          </LinearGradient>
        </View>

        {/* Messages */}
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === 'user' ? styles.userMessageWrapper : styles.supportMessageWrapper,
            ]}
          >
            {msg.sender === 'support' && (
              <View style={styles.supportAvatarSmall}>
                <Ionicons name="headset" size={16} color={colors.white} />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.supportBubble,
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.sender === 'user' && styles.userMessageText,
              ]}>
                {msg.text}
              </Text>
              <Text style={[
                styles.messageTime,
                msg.sender === 'user' ? styles.userMessageTime : styles.supportMessageTime,
              ]}>
                {formatTime(msg.timestamp)}
              </Text>
            </View>
          </View>
        ))}

        {/* Quick Replies */}
        {messages.length < 4 && (
          <View style={styles.quickRepliesContainer}>
            <Text style={styles.quickRepliesTitle}>ردود سريعة</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.quickRepliesList}>
                {quickReplies.map((reply, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickReplyChip}
                    onPress={() => handleQuickReply(reply)}
                  >
                    <Text style={styles.quickReplyText}>{reply}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={22} color={colors.textTertiary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="اكتب رسالتك..."
            placeholderTextColor={colors.textTertiary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons 
              name={message.trim() ? 'send' : 'send'} 
              size={20} 
              color={message.trim() ? colors.white : colors.textTertiary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  supportAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  headerInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  onlineText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
  },
  welcomeCard: {
    marginBottom: spacing.lg,
  },
  welcomeGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.lg,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginTop: spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  supportMessageWrapper: {
    justifyContent: 'flex-start',
  },
  supportAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  supportBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    ...shadows.sm,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  userMessageText: {
    color: colors.white,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  supportMessageTime: {
    color: colors.textTertiary,
  },
  quickRepliesContainer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  quickRepliesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  quickRepliesList: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickReplyChip: {
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  quickReplyText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.sm,
    minHeight: 48,
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.cardSecondary,
  },
});

export default ChatScreen;
