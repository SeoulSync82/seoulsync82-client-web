import SVGIcon from '@/components/SvgIcon';
import { useLocation, useNavigate } from 'react-router';

export default function DefaultHeader({ pageName }: { pageName: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickBackButton = () => {
    if (location.state && location.state.previousPath) {
      navigate(location.state.previousPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative flex h-[60px] w-full items-center">
      <SVGIcon
        name="ArrowLeft"
        width={24}
        height={24}
        active={false}
        onClick={onClickBackButton}
        color="#000"
      />
      <div className="absolute left-1/2 top-1/2 max-h-[48px] max-w-[50%] -translate-x-1/2 -translate-y-1/2 text-20 font-bold text-[#101010]">
        {pageName}
      </div>
    </div>
  );
}
