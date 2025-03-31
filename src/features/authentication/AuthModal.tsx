import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { useState } from 'react';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  defaultForm: 'login' | 'register';
}

export default function AuthModal({
  isAuthModalOpen,
  setIsAuthModalOpen,
  defaultForm,
}: AuthModalProps) {
  const [isRegistering, setIsRegistering] = useState<boolean>(
    defaultForm === 'register'
  );

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        {isRegistering ? (
          <RegisterForm
            setIsRegistering={setIsRegistering}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        ) : (
          <LoginForm
            setIsRegistering={setIsRegistering}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
