import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { chatMessages } from '../data/staticData';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(Date.now()),
        sender: 'user',
        text: message,
        textEn: message,
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>تواصل</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.supportBubble,
            ]}
          >
            {msg.sender === 'user' && (
              <View style={styles.userAvatar}>
                <Ionicons name="person" size={20} color={colors.white} />
              </View>
            )}
            <View
              style={[
                styles.bubble,
                msg.sender === 'user' ? styles.userBubbleContent : styles.supportBubbleContent,
              ]}
            >
              {msg.sender === 'support' && (
                <View style={styles.supportBadge}>
                  <Text style={styles.supportBadgeText}>TATX</Text>
                </View>
              )}
              <Text
                style={[
                  styles.messageText,
                  msg.sender === 'user' ? styles.userMessageText : styles.supportMessageText,
                ]}
              >
                {msg.text}
              </Text>
              <Text style={styles.messageTime}>{msg.timestamp}</Text>
            </View>
            {msg.sender !== 'user' && (
              <View style={[styles.supportAvatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.supportAvatarText}>T</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="شكرا لسرعة ردكم"
          placeholderTextColor={colors.gray}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  userBubble: {
    flexDirection: 'row-reverse',
  },
  supportBubble: {
    flexDirection: 'row',
  },
  bubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: 16,
  },
  userBubbleContent: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 4,
  },
  supportBubbleContent: {
    backgroundColor: '#9E9E9E',
    borderBottomLeftRadius: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  supportBadge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  supportBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: colors.text,
    textAlign: 'right',
  },
  supportMessageText: {
    color: colors.white,
    textAlign: 'right',
  },
  messageTime: {
    fontSize: 10,
    color: colors.gray,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    textAlign: 'right',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
