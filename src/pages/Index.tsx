import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

interface Chat {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'calls' | 'contacts' | 'stories' | 'profile'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Анна Смирнова',
      username: '@anna_sm',
      avatar: '👩‍💼',
      lastMessage: 'Отлично, жду встречи!',
      time: '14:32',
      unread: 2,
      online: true,
      typing: false
    },
    {
      id: 2,
      name: 'Команда разработки',
      username: '@dev_team',
      avatar: '👨‍💻',
      lastMessage: 'Дмитрий: Релиз готов к тестированию',
      time: '13:15',
      unread: 5,
      online: true
    },
    {
      id: 3,
      name: 'Михаил Петров',
      username: '@mikhail_designer',
      avatar: '🧑‍🎨',
      lastMessage: 'Посмотри новый дизайн',
      time: '11:42',
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Мама ❤️',
      username: '@mom',
      avatar: '👩',
      lastMessage: 'Ты: Приеду в выходные',
      time: 'Вчера',
      unread: 0,
      online: true
    },
    {
      id: 5,
      name: 'Александр К.',
      username: '@alex_gamer',
      avatar: '🎮',
      lastMessage: 'Го в игру вечером?',
      time: 'Вчера',
      unread: 0,
      online: false
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: 'Привет! Как дела с проектом?',
      time: '14:28',
      sent: false
    },
    {
      id: 2,
      text: 'Привет! Всё отлично, почти закончил дизайн 🎨',
      time: '14:29',
      sent: true,
      status: 'read'
    },
    {
      id: 3,
      text: 'Можем созвониться завтра утром?',
      time: '14:30',
      sent: false
    },
    {
      id: 4,
      text: 'Конечно! В 10:00 подойдёт?',
      time: '14:31',
      sent: true,
      status: 'read'
    },
    {
      id: 5,
      text: 'Отлично, жду встречи!',
      time: '14:32',
      sent: false
    }
  ];

  const stories = [
    { id: 1, name: 'Моя история', avatar: '😎', yours: true },
    { id: 2, name: 'Анна', avatar: '👩‍💼', viewed: false },
    { id: 3, name: 'Михаил', avatar: '🧑‍🎨', viewed: false },
    { id: 4, name: 'Команда', avatar: '👨‍💻', viewed: true },
    { id: 5, name: 'Мама', avatar: '👩', viewed: true }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[hsl(var(--chat-bg))] to-[hsl(var(--background))]">
      <header className="bg-white dark:bg-[hsl(var(--card))] border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--telegram-blue))] to-[hsl(var(--whatsapp-green))] bg-clip-text text-transparent">
            Call&Text
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Search" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </header>

      {activeTab === 'chats' && (
        <div className="mb-4 px-4 pt-4">
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div
                    className={`relative ${
                      story.yours
                        ? 'ring-2 ring-[hsl(var(--whatsapp-green))] ring-offset-2'
                        : story.viewed
                        ? 'ring-2 ring-muted ring-offset-2'
                        : 'ring-2 ring-[hsl(var(--telegram-blue))] ring-offset-2'
                    } rounded-full`}
                  >
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                        {story.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {story.yours && (
                      <div className="absolute bottom-0 right-0 bg-[hsl(var(--whatsapp-green))] rounded-full p-1">
                        <Icon name="Plus" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground max-w-[60px] truncate">
                    {story.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 bg-white dark:bg-[hsl(var(--card))] border-r border-border flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-2">
              {chats.map((chat) => (
                <Card
                  key={chat.id}
                  className={`mb-1 p-3 cursor-pointer hover:bg-muted/50 transition-all border-0 ${
                    selectedChat === chat.id ? 'bg-primary/5 shadow-sm' : ''
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[hsl(var(--online-green))] rounded-full border-2 border-white dark:border-[hsl(var(--card))] animate-pulse-slow" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {chat.typing ? (
                            <span className="text-[hsl(var(--telegram-blue))] italic">печатает...</span>
                          ) : (
                            chat.lastMessage
                          )}
                        </p>
                        {chat.unread > 0 && (
                          <Badge className="ml-2 bg-[hsl(var(--telegram-blue))] text-white hover:bg-[hsl(var(--telegram-blue))]/90 px-2 py-0 h-5 text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 flex flex-col bg-[hsl(var(--chat-bg))]">
          {selectedChat ? (
            <>
              <div className="bg-white dark:bg-[hsl(var(--card))] border-b border-border px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                      {chats.find((c) => c.id === selectedChat)?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">{chats.find((c) => c.id === selectedChat)?.name}</h2>
                      <span className="text-xs text-muted-foreground">
                        {chats.find((c) => c.id === selectedChat)?.username}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {chats.find((c) => c.id === selectedChat)?.online ? (
                        <span className="text-[hsl(var(--online-green))]">онлайн</span>
                      ) : (
                        'был(а) недавно'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 text-[hsl(var(--telegram-blue))]"
                  >
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 text-[hsl(var(--telegram-blue))]"
                  >
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sent ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.sent
                            ? 'bg-[hsl(var(--message-sent))] text-foreground rounded-br-sm'
                            : 'bg-[hsl(var(--message-received))] text-foreground rounded-bl-sm shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          <span className="text-xs opacity-60">{message.time}</span>
                          {message.sent && message.status === 'read' && (
                            <Icon name="CheckCheck" size={14} className="text-[hsl(var(--telegram-blue))]" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="bg-white dark:bg-[hsl(var(--card))] border-t border-border p-4">
                <div className="flex items-center gap-2 max-w-4xl mx-auto">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background">
                      <Icon name="Smile" size={20} />
                    </Button>
                    <Input
                      type="text"
                      placeholder="Сообщение..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                  </div>
                  {messageInput.trim() ? (
                    <Button
                      size="icon"
                      className="rounded-full bg-[hsl(var(--telegram-blue))] hover:bg-[hsl(var(--telegram-blue))]/90"
                      onClick={handleSendMessage}
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 text-[hsl(var(--telegram-blue))]"
                    >
                      <Icon name="Mic" size={20} />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
                <p className="text-muted-foreground">Начните общение или выберите существующий диалог</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <nav className="bg-white dark:bg-[hsl(var(--card))] border-t border-border px-2 py-2">
        <div className="flex items-center justify-around max-w-4xl mx-auto">
          {[
            { id: 'chats', icon: 'MessageSquare', label: 'Чаты', badge: 7 },
            { id: 'calls', icon: 'Phone', label: 'Звонки' },
            { id: 'contacts', icon: 'Users', label: 'Контакты' },
            { id: 'stories', icon: 'Circle', label: 'Истории', badge: 3 },
            { id: 'profile', icon: 'User', label: 'Профиль' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-col h-auto py-2 px-4 hover:bg-primary/10 relative ${
                activeTab === tab.id
                  ? 'text-[hsl(var(--telegram-blue))]'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <Icon name={tab.icon as any} size={22} />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.badge && tab.badge > 0 && activeTab !== tab.id && (
                <Badge className="absolute top-1 right-2 bg-[hsl(var(--telegram-blue))] text-white hover:bg-[hsl(var(--telegram-blue))]/90 px-1.5 py-0 h-4 text-[10px] min-w-4">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;