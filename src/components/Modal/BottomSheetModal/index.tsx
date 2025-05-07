import { Modal } from '..';
import { Button } from '@/components/Button';
import { ModalProps } from '../Modal';

interface BottomSheetModalProps extends ModalProps {
  children?: React.ReactNode;
}

const BottomSheetModal = ({ children, onConfirm, onClose, isOpen }: BottomSheetModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      <div className="fixed bottom-0 left-0 right-0 mx-auto h-fit w-full max-w-[430px] rounded-t-[8px] bg-white p-[20px]">
        <div className="text-20 font-bold text-gray-900">해당 내역을 삭제할까요?</div>
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-4 flex w-full items-center justify-end gap-[16px]">
          <Button
            fullWidth
            bgColor="white"
            textColor="gray-400"
            borderColor="gray-200"
            rounded={4}
            onClick={onClose}
            height={56}
          >
            취소
          </Button>
          <Button
            fullWidth
            bgColor="primary"
            textColor="white"
            rounded={4}
            onClick={onConfirm}
            height={56}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default BottomSheetModal;
