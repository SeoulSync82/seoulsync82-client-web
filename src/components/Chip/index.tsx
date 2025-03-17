import SVGIcon from '../SvgIcon';

export type ChipPropsType = {
  size: 'small' | 'medium';
  active?: boolean;
  content: string;
  onClick?: () => void;
  onClickCancel?: () => void;
};

export type TagPropsType = {
  size: 'small' | 'medium';
  content: string;
  color: string;
};

export default function Chip({ size, content, active, onClick, onClickCancel }: ChipPropsType) {
  const sizeVariants = {
    small: 'h-[36px]',
    medium: 'h-[36px]',
  };

  const activeStyle = active
    ? 'text-primary-600 bg-primary-50 border-primary-500 font-bold'
    : 'text-gray-900 bg-white border-gray-200 font-medium';

  return (
    <div
      className={`flex items-center justify-center rounded-[100px] border-[1.5px] px-[10px] ${sizeVariants[size]} ${activeStyle}`}
    >
      <div className="text-14" onClick={onClick}>
        {content}
      </div>
      {active && (
        <SVGIcon
          name={'Cancel'}
          width={16}
          height={16}
          active={false}
          onClick={onClickCancel}
          color="#805BC8"
        />
      )}
    </div>
  );
}
