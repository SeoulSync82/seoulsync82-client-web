import { cn } from '@/utils/tailwindcss';
import { GlobalPortal } from '@/context/GlobalPortal';
import { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  renderActions?: () => ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, renderActions, children, ...rest }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <GlobalPortal.Consumer>
      <ModalBackdrop onClick={onClose} />
      <ModalContent {...rest}>{children}</ModalContent>
      {renderActions?.()}
    </GlobalPortal.Consumer>
  );
};

const ModalContent = ({ children, className, ...rest }: Partial<ModalProps>) => (
  <div {...rest} className={cn('mx-auto flex', className)}>
    {children}
  </div>
);

const ModalBackdrop = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="max-container fixed inset-0 cursor-pointer bg-[rgba(0,0,0,0.6)]"
    onClick={onClick}
  />
);

export default Modal;
