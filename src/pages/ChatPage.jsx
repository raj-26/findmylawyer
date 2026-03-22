import React, { useState, useRef, useEffect } from 'react';
import { Lock, Phone, Paperclip, Search } from 'lucide-react';
import { Card, Input, Button, Avatar, AvatarFallback, AvatarImage } from '../ui';
import { PageHeader } from '../components/PageHeader';

const ChatListItem = ({ chat, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full min-w-0 text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
      active ? 'bg-blue-100' : 'hover:bg-gray-100'
    }`}
  >
    <Avatar className="shrink-0">
      <AvatarImage src={chat.avatar} />
      <AvatarFallback>{chat.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center gap-2 min-w-0">
        <p className={`font-bold text-sm truncate ${active ? 'text-blue-800' : 'text-primary-900'}`}>{chat.name}</p>
        <p className={`text-xs shrink-0 ${active ? 'text-blue-600' : 'text-primary-500'}`}>{chat.time}</p>
      </div>
      <p className={`text-xs truncate block ${active ? 'text-blue-700' : 'text-primary-600'}`}>{chat.lastMessage}</p>
    </div>
  </button>
);

const MessageBubble = ({ message, isOwn }) => (
  <div className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    {!isOwn && <Avatar className="w-8 h-8"><AvatarFallback>C</AvatarFallback></Avatar>}
    <div
      className={`max-w-md px-4 py-2 rounded-2xl ${
        isOwn
          ? 'bg-primary-800 text-white rounded-br-lg'
          : 'bg-white border border-gray-200 text-primary-900 rounded-bl-lg'
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <p className={`text-xs mt-1 text-right ${isOwn ? 'text-primary-300' : 'text-primary-500'}`}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);

export const ChatPage = ({ onNavigate, navState }) => {
  const [chats] = useState([
    { id: 1, name: 'Priya Patel', avatar: '', lastMessage: 'Thanks for reviewing the contract.', time: '10:24 AM', active: true },
    { id: 2, name: 'Amit Singh', avatar: '', lastMessage: 'When can we schedule the call?', time: 'Yesterday', active: false },
    { id: 3, name: 'Rajesh Kumar', avatar: '', lastMessage: 'I have uploaded the documents.', time: 'Mar 3', active: false },
  ]);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'client', text: 'Hello, I have uploaded all the property documents you requested.', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { id: 2, sender: 'lawyer', text: 'Thank you Priya. I will review them before our session tomorrow.', timestamp: new Date(Date.now() - 9 * 60 * 1000) },
    { id: 3, sender: 'client', text: 'The contract also needs a clause about IP ownership.', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
    { id: 4, sender: 'client', text: 'Thanks for reviewing the contract.', timestamp: new Date(Date.now() - 7 * 60 * 1000) },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!navState?.clientName) return;
    const matchedChat = chats.find(
      (chat) => chat.name.toLowerCase() === navState.clientName.toLowerCase()
    );
    if (matchedChat) {
      setActiveChat(matchedChat);
    }
  }, [navState, chats]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message = { id: messages.length + 1, sender: 'lawyer', text: newMessage, timestamp: new Date() };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Secure attorney-client communications"
        showBack={false}
      />
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[70vh]">
          {/* Chat List */}
          <Card className="xl:col-span-4 flex flex-col p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" />
                <Input placeholder="Search chats..." className="pl-10" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} active={activeChat.id === chat.id} onClick={() => setActiveChat(chat)} />
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="xl:col-span-8 flex flex-col p-0">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeChat.avatar} />
                  <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-primary-900">{activeChat.name}</h3>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm"><Phone size={16} className="mr-1" /> Call</Button>
                <div className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                  <Lock size={14} />
                  End-to-End Encryption
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} isOwn={msg.sender === 'lawyer'} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="ghost" size="icon"><Paperclip size={20} /></Button>
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
