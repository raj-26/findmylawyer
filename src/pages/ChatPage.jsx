import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, SmilePlus, Paperclip } from 'lucide-react';
import { Card, CardHeader, CardTitle, Input, Button } from '../ui';

export const ChatPage = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      text: 'Hello, I have a question about my case',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: 2,
      sender: 'lawyer',
      text: 'Hi! Sure, what would you like to know?',
      timestamp: new Date(Date.now() - 9 * 60 * 1000),
    },
    {
      id: 3,
      sender: 'client',
      text: 'What are the next steps in my case?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
    },
    {
      id: 4,
      sender: 'lawyer',
      text: 'Based on the documents, we should file a petition next week.',
      timestamp: new Date(Date.now() - 7 * 60 * 1000),
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'lawyer',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate client response
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'client',
          text: 'Thank you for the guidance! When should we schedule the next meeting?',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const MessageBubble = ({ message, isOwn }) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-primary-800 text-white rounded-br-none'
            : 'bg-primary-100 text-primary-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-primary-200' : 'text-primary-600'}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Client Chat</h1>
        <p className="text-primary-600">Real-time conversation with clients</p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat List (Desktop) */}
        <div className="lg:col-span-1 hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle>Active Chats</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                <p className="font-bold text-primary-900 text-sm">Rajesh Kumar</p>
                <p className="text-xs text-primary-600">Active now</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-primary-50 rounded-lg transition-colors">
                <p className="font-bold text-primary-900 text-sm">Priya Patel</p>
                <p className="text-xs text-primary-600">Last message: 1h ago</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-primary-50 rounded-lg transition-colors">
                <p className="font-bold text-primary-900 text-sm">Amit Singh</p>
                <p className="text-xs text-primary-600">Last message: 3d ago</p>
              </button>
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-screen lg:h-[600px]">
            {/* Chat Header */}
            <div className="border-b border-primary-100 p-4 flex items-center justify-between bg-primary-50">
              <div>
                <h3 className="font-bold text-primary-900">Rajesh Kumar</h3>
                <p className="text-xs text-primary-600">Active now</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors text-primary-800">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors text-primary-800">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors text-primary-800">
                  <Info size={20} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender === 'lawyer'}
                />
              ))}
              {isTyping && (
                <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce animation-delay-200" />
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce animation-delay-400" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-primary-100 p-4 bg-primary-50 space-y-3">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors text-primary-800">
                  <SmilePlus size={20} />
                </button>
                <button className="p-2 hover:bg-primary-100 rounded-lg transition-colors text-primary-800">
                  <Paperclip size={20} />
                </button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  variant="primary"
                  className="px-4"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
