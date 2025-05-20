import { Link, useLocation } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import useReviewStore from '@/stores/reviewSlice';
import { useEffect } from 'react';

const ReviewPage = () => {
  const { state: selectedCourse } = useLocation();

  const setStars = useReviewStore((state) => state.setStars);
  const setReview = useReviewStore((state) => state.setReview);

  useEffect(() => {
    return () => {
      setStars(0);
      setReview('');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white px-4">
      {selectedCourse ? <CourseSummaryBox course={selectedCourse} /> : <AddCourseBox />}
      <StarRating />
      <ReviewArea />
    </div>
  );
};

export default ReviewPage;

const AddCourseBox = () => (
  <Link
    to="/course-history"
    className="mb-8 flex h-[100px] flex-col items-center justify-center gap-3 rounded-md bg-gray-50"
  >
    <SvgIcon name="Plus" width={35} height={35} />
    <div className="text-sm text-gray-300">코스를 추가해주세요</div>
  </Link>
);

const StarRating = () => {
  const stars = useReviewStore((state) => state.stars);
  const setStars = useReviewStore((state) => state.setStars);

  return (
    <div className="mb-10 flex flex-col gap-5 border-t-[1px] border-gray-200 pt-10">
      <div className="text-center text-lg font-semibold text-gray-900">추천 코스는 어떠셨나요?</div>
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <SvgIcon
            key={n}
            name="FullStar"
            width={36}
            height={36}
            onClick={() => setStars(n)}
            color={n <= stars ? '#9070CF' : undefined}
          />
        ))}
      </div>
      <div className="text-center text-sm text-gray-300">별점을 선택해주세요</div>
    </div>
  );
};

const ReviewArea = () => {
  const review = useReviewStore((state) => state.review);
  const setReview = useReviewStore((state) => state.setReview);

  return (
    <div className="border-t-[1px] border-gray-200 pt-10">
      <div className="mb-5 text-center text-lg font-semibold text-gray-900">
        한줄평을 들려주세요!
      </div>
      <div className="relative h-[140px] rounded-md bg-gray-50 p-3">
        <textarea
          placeholder="멋진 경험을 한줄로 남겨주세요."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={600}
          className="w-full resize-none bg-transparent text-sm text-gray-900 placeholder-gray-300 outline-none"
        />
        <div className="absolute bottom-3 right-4 text-sm text-gray-300">
          {review.length}/{600}
        </div>
      </div>
    </div>
  );
};

const CourseSummaryBox = ({
  course,
}: {
  course: { customs: string; course_name: string; created_at: string };
}) => (
  <div className="flex h-[92px] w-full flex-col justify-center gap-2.5 px-1">
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-1">
        {course.customs
          .split(',')
          .filter((v: string) => v)
          .map((tag: string, idx: number) => (
            <span
              key={`${tag}-${idx}`}
              className="flex h-5 items-center justify-center rounded-full border-[1px] border-[#E0D1FF] px-2 text-10 font-semibold text-primary-500"
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
        {course.course_name}
      </div>
      <div className="text-xs leading-none text-gray-400">추천일자 {course.created_at}</div>
    </div>
  </div>
);
