import { BeatLoader } from 'react-spinners';

interface LoadingProps {
  color?: string;
  size?: number;
  isLoading?: boolean;
  // type?: 'bounce' | 'beat'; // TODO: type 추가
}

const Loading = ({ color = '#9070CF', size = 15, isLoading = true }: LoadingProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <BeatLoader color={color} size={size} loading={isLoading} />
    </div>
  );
};
export default Loading;
