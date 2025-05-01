import Image from '@/components/Image';
import SvgIcon from '@/components/SvgIcon';
import { Link } from 'react-router';

export interface CourseListItemProps {
  course_name: string;
  course_image: string;
  course_uuid?: string;
  line: string;
  subway: string;
}

export default function CourseListItem({
  course_name,
  course_image,
  line,
  subway,
  course_uuid,
}: CourseListItemProps) {
  const tags = [...line.split(','), ...subway.split(',').map((v) => `${v}역`)];

  return (
    <Link to={`/course/${course_uuid}`} className="flex items-center px-5">
      <div className="flex w-full gap-3 border-b-[1px] border-gray-200 py-4">
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
          // placeholder={<div className="h-full w-full animate-pulse bg-gray-200" />}
        />
        <div className="flex flex-col items-start justify-center gap-1">
          <TagList tags={tags} />
          <Rating />
          <CourseName name={course_name} />
        </div>
      </div>
    </Link>
  );
}

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
    <span className="text-sm font-bold leading-5">{name.split(',')[0] + ','}</span>
    <span className="text-sm font-medium leading-5">{name.split(',')[1]}</span>
  </div>
);
