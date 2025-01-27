import SVGIcon from '@/components/svg-icon/SVGIcon';
import { useNavigate } from 'react-router';

export default function DefaultHeader({ pageName }: { pageName: string }) {
  const navigate = useNavigate();
  const onClickPrevButton = () => navigate(-1);

  return (
    <div className="relative flex h-full w-full items-center">
      <SVGIcon
        name="ArrowLeft"
        width={24}
        height={24}
        active={false}
        onClick={onClickPrevButton}
        color="#000"
      />
      <div className="absolute left-1/2 top-1/2 max-h-[48px] max-w-[50%] -translate-x-1/2 -translate-y-1/2 text-16 font-bold text-[#101010]">
        {pageName}
      </div>
    </div>
  );
}
