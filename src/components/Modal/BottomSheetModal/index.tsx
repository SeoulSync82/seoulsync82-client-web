import { Modal } from '..';
import { Button } from '@/components/Button';

const BottomSheetModal = ({
  onConfirm,
  onCancel,
  children,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <Modal>
      <div className="fixed bottom-0 left-0 right-0 mx-auto h-fit w-full max-w-[430px] rounded-t-[8px] bg-white p-[20px]">
        <div className="text-20 font-bold text-gray-900">해당 내역을 삭제할까요?</div>
        <div className="">{children}</div>
        <div className="mt-[16px] flex w-full items-center justify-end gap-[16px]">
          <Button
            bgColor="white"
            textColor="gray400"
            borderColor="gray200"
            rounded={4}
            onClick={onCancel}
          >
            취소
          </Button>
          <Button bgColor="primary" textColor="white" rounded={4} onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default BottomSheetModal;
