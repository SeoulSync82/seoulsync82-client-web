import Image from '@/components/Image';
import SvgIcon from '@/components/SvgIcon';
import { useCancelCourseBookmark, useAddCourseBookmark } from '@/service/course/useCourseService';
import { Link, useLocation } from 'react-router';

export interface CourseListItemProps {
  course_name: string;
  course_image: string;
  course_uuid?: string;
  line: string;
  subway: string;
  isBookmarked?: boolean;
  community_uuid?: string;
}

export default function CourseListItem({
  course_name,
  course_image,
  line,
  subway,
  course_uuid,
  community_uuid,
  isBookmarked,
}: CourseListItemProps) {
  const tags = [...line.split(','), ...subway.split(',').map((v) => `${v}역`)];

  const { mutate: addCourseBookmark } = useAddCourseBookmark();
  const { mutate: cancelCourseBookmark } = useCancelCourseBookmark();

  const onClickBookmark = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (isBookmarked) {
      cancelCourseBookmark(course_uuid as string);
    } else {
      addCourseBookmark(course_uuid as string);
    }
  };

  // const location = useLocation();
  // const course_type = location.pathname.split('/')[1] === 'community' ? 'community' : 'my-course';

  return (
    <Link
      to={`/course/my-course/${course_uuid}${community_uuid ? `?community_post_uuid=${community_uuid}` : ''}`}
      className="flex items-center px-5"
    >
      <div className="flex w-full gap-3 border-b-[1px] border-gray-200 py-4">
        <CourseImage
          course_image={course_image}
          isBookmarked={isBookmarked}
          onClickBookmark={onClickBookmark}
        />
        <CourseDetails course_name={course_name} tags={tags} />
      </div>
    </Link>
  );
}

const CourseImage = ({
  course_image,
  isBookmarked,
  onClickBookmark,
}: {
  course_image: string;
  isBookmarked?: boolean;
  onClickBookmark: (e: React.MouseEvent<SVGSVGElement>) => void;
}) => (
  <div className="relative">
    <Image
      src={course_image}
      alt="Course Image"
      width={80}
      height={80}
      objectFit="cover"
      rounded="lg"
      fallbackWidth={32}
      fallbackHeight={32}
      fallbackStatus="bad"
      fallbackBgColor="gray-50"
    />
    {isBookmarked && (
      <SvgIcon
        name="Bookmark"
        width={24}
        height={24}
        color={isBookmarked ? '#E1D9F2' : undefined}
        className="absolute bottom-1 right-1"
        onClick={onClickBookmark}
      />
    )}
  </div>
);

const CourseDetails = ({ course_name, tags }: { course_name: string; tags: string[] }) => (
  <div className="flex flex-col items-start justify-center gap-1">
    <TagList tags={tags} />
    <Rating />
    <CourseName name={course_name} />
  </div>
);

const Tag = ({ tag }: { tag: string }) => (
  <span className="flex h-5 items-center justify-center rounded-full border-[1px] border-[#E0D1FF] px-2 text-10 font-semibold text-primary-500">
    {tag}
  </span>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex items-center gap-1">
    {tags.map((tag) => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
);

const Rating = () => (
  <div className="flex h-4 items-center justify-center gap-1">
    <SvgIcon name="FullStar" width={16} height={16} color="#FFC01D" />
    <span className="flex items-center justify-center pt-1 text-sm font-semibold leading-4 text-gray-900">
      4.2
    </span>
    <span className="flex items-center justify-center pt-1 text-sm font-normal leading-4 text-gray-400">
      (999+)
    </span>
  </div>
);

const CourseName = ({ name }: { name: string }) => (
  <div className="flex items-center gap-1">
    <span className="text-sm font-bold leading-5">{name}</span>
  </div>
);
