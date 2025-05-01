import SvgIcon from '@/components/SvgIcon';
import { useNavigate } from 'react-router';

export interface DefaultHeaderProps {
  pageName: string;
  rightActions?: React.ReactNode;
}

const DefaultHeader = ({ pageName, rightActions }: DefaultHeaderProps) => {
  const navigate = useNavigate();
  const onClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex h-[60px] w-full items-center justify-between">
      <SvgIcon name="ArrowLeft" width={24} height={24} active={false} onClick={onClickBackButton} />
      <div className="absolute left-1/2 top-1/2 max-h-12 max-w-[50%] -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-[#101010]">
        {pageName}
      </div>
      {rightActions}
    </div>
  );
};

export default DefaultHeader;
