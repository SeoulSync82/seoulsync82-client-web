import { cn } from '@/utils/clsx';
import { GlobalPortal } from '@/context/GlobalPortal';
import { HTMLAttributes } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  renderActions?: () => React.ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, renderActions, children, ...rest }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <GlobalPortal.Consumer>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content {...rest}>
        {children}
        {renderActions?.()}
      </Modal.Content>
    </GlobalPortal.Consumer>
  );
};
export default Modal;

Modal.Content = ({ children, className, ...rest }: Partial<ModalProps>) => {
  return (
    <div
      {...rest}
      className={cn(
        'z-100 max-container fixed left-0 right-0 top-0 mx-auto flex h-full w-full',
        className,
      )}
    >
      {children}
    </div>
  );
};

Modal.Backdrop = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div
      className="z-100 fixed left-0 right-0 top-0 mx-auto flex h-full w-full max-w-[430px] bg-[rgba(0,0,0,0.6)]"
      onClick={onClick}
    />
  );
};
