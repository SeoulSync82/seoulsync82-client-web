import { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';

const ReviewPage = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div className="min-h-screen bg-white px-4 pb-8 pt-6">
      <CourseAddBox />
      <StarRating value={selectedStars} onChange={setSelectedStars} />
      <hr className="mb-10" />
      <OneLineReviewInput value={review} onChange={setReview} />
    </div>
  );
};

export default ReviewPage;

const CourseAddBox = () => (
  <Link
    to="/course-history"
    className="mb-8 flex h-[100px] flex-col items-center justify-center gap-3 rounded-md bg-gray-50"
  >
    <SvgIcon name="Plus" width={35} height={35} />
    <div className="text-base text-gray-300">코스를 추가해주세요</div>
  </Link>
);

const StarRating = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <div className="mb-10 flex flex-col gap-5">
    <div className="text-center text-lg font-semibold text-gray-900">추천 코스는 어떠셨나요?</div>
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <SvgIcon
          key={n}
          name="FullStar"
          width={36}
          height={36}
          onClick={() => onChange(n)}
          color={n <= value ? '#9070CF' : undefined}
        />
      ))}
    </div>
    <div className="text-center text-sm text-gray-300">별점을 선택해주세요</div>
  </div>
);

const OneLineReviewInput = ({
  value,
  onChange,
  maxLength = 600,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) => (
  <div>
    <div className="mb-5 text-center text-lg font-semibold text-gray-900">한줄평을 들려주세요!</div>
    <div className="rounded-md bg-gray-50">
      <input
        type="text"
        placeholder="멋진 경험을 한줄로 남겨주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[44px] w-full rounded-md bg-gray-50 p-3 text-sm font-normal text-gray-900 placeholder-gray-300 outline-none"
        maxLength={maxLength}
      />
    </div>
  </div>
);
