import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
}

const AuthModal = ({ open, onOpenChange, onAuthSuccess }: AuthModalProps) => {
  const [phone, setPhone] = useState('');

  const handleSocialAuth = (provider: string) => {
    console.log(`Авторизация через ${provider}`);
    setTimeout(() => {
      onAuthSuccess();
      onOpenChange(false);
    }, 1000);
  };

  const handlePhoneAuth = () => {
    if (phone.length >= 10) {
      onAuthSuccess();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-2">
            Вход в Call&Text
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Выберите способ авторизации
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-red-50 hover:border-red-300 transition-colors"
              onClick={() => handleSocialAuth('Яндекс')}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FC3F1D">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.9 15.5h-2.5v-6c0-1.2-.4-1.8-1.2-1.8-.9 0-1.5.7-1.5 1.9v5.9H8.2V8h2.5v1.1c.5-.8 1.3-1.3 2.4-1.3 1.8 0 2.8 1.2 2.8 3.3v4.4z"/>
                </svg>
              </div>
              <span className="font-medium">Войти через Яндекс ID</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              onClick={() => handleSocialAuth('ВКонтакте')}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0077FF">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.41h-1.41c-.54 0-.71-.43-1.68-1.4-0.85-0.82-1.23-0.93-1.44-0.93-0.29 0-0.38 0.09-0.38 0.53v1.28c0 0.34-0.11 0.55-1.01 0.55-1.49 0-3.14-0.9-4.3-2.57-1.76-2.37-2.24-4.15-2.24-4.51 0-0.21 0.09-0.4 0.53-0.4h1.41c0.4 0 0.55 0.18 0.7 0.61 0.77 2.16 2.06 4.05 2.59 4.05 0.2 0 0.29-0.09 0.29-0.59V9.5c-0.06-0.95-0.56-1.03-0.56-1.37 0-0.17 0.14-0.34 0.37-0.34h2.21c0.33 0 0.45 0.17 0.45 0.56v3.78c0 0.33 0.15 0.45 0.24 0.45 0.2 0 0.36-0.12 0.73-0.49 1.12-1.26 1.93-3.21 1.93-3.21 0.11-0.23 0.28-0.45 0.73-0.45h1.41c0.42 0 0.51 0.21 0.42 0.56-0.15 0.71-1.54 2.75-1.54 2.75-0.17 0.28-0.24 0.4 0 0.72 0.17 0.24 0.74 0.72 1.12 1.16 0.68 0.77 1.21 1.41 1.34 1.86 0.14 0.44-0.08 0.67-0.51 0.67z"/>
                </svg>
              </div>
              <span className="font-medium">Войти через ВКонтакте</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-orange-50 hover:border-orange-300 transition-colors"
              onClick={() => handleSocialAuth('Одноклассники')}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#EE8208">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 6.5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm4.9 9.3c-.6.6-1.5 1-2.5 1.2l1.4 1.4c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3s-.5-.1-.7-.3L12 17.4l-2.4 2.4c-.2.2-.5.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1 0-1.4l1.4-1.4c-1-.2-1.9-.6-2.5-1.2-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0c.9.9 2.4.9 3.2 0 .5-.5 1.3-.5 1.8 0 .4.5.4 1.3-.1 1.8z"/>
                </svg>
              </div>
              <span className="font-medium">Войти через Одноклассники</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              onClick={() => handleSocialAuth('Discord')}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#5865F2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <span className="font-medium">Войти через Discord</span>
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                или по номеру телефона
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              className="w-full h-12 bg-[hsl(var(--telegram-blue))] hover:bg-[hsl(var(--telegram-blue))]/90"
              onClick={handlePhoneAuth}
              disabled={phone.length < 10}
            >
              Продолжить
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center px-4">
            Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
