import { Button } from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';

const AddPlaceButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      fullWidth
      rounded={8}
      height={76}
      bgColor="gray-50"
      textColor="black"
      onClick={onClick}
      className="my-4 justify-start px-5 text-left shadow-[2px_2px_8px_0_rgba(0,0,0,0.1)]"
    >
      <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full bg-primary-500">
        <SvgIcon name="Plus" width={24} height={24} active={false} />
      </div>
      <div className="ml-3 text-black">
        <p className="mb-2 text-16 font-semibold">플러스를 누르면 추가할 수 있어요 !</p>
        <p className="text-12 font-medium text-primary-500">다른 장소 추천받기</p>
      </div>
    </Button>
  );
};
export default AddPlaceButton;
