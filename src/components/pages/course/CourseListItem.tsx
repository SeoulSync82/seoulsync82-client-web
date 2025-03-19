import SVGIcon from '@/components/SvgIcon';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';

export interface CourseListItemProps {
  course_name: string;
  course_image: string;
  customs: string;
  created_at: string;
  course_uuid?: string;
}

export default function CourseListItem({
  course_name,
  course_image,
  customs,
  created_at,
  course_uuid,
}: CourseListItemProps) {
  return (
    <Link to={`/course/${course_uuid}`} className="flex h-[100px] w-full px-[20px]">
      <div className="flex w-full items-center gap-[10px] border-b-[1px] border-gray-200">
        <img
          src={course_image ?? ''}
          alt=""
          className="h-[70px] min-w-[70px] rounded-[4px] object-cover"
        />
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-[10px] text-14 font-bold">{course_name}</div>
            <div className="mt-[8px] flex items-center gap-[10px] text-12 font-semibold text-primary-500">
              {customs
                .split(',')
                .map((v: string) => '#' + v)
                .join(' ')}
            </div>
            <div className="mt-[4px] flex items-center gap-[10px] text-12 font-semibold text-gray-300">
              {convertDateToYMD(created_at)}
            </div>
          </div>
          <SVGIcon name="Heart" width={14} height={14} active className="" />
        </div>
      </div>
    </Link>
  );
}
