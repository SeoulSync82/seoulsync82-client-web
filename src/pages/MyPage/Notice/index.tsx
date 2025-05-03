import { useNoticeService } from '@/service/notice/useNoticeService';
import { Link } from 'react-router-dom';
import { convertDateToYMD } from '@/utils';

export default function NoticePage() {
  const { data: noticesList } = useNoticeService();

  return (
    <div className="page px-5">
      {noticesList?.map((notice: { uuid: string; title: string; published_at: string }) => (
        <NoticeItem
          key={notice.uuid}
          title={notice.title}
          date={convertDateToYMD(notice.published_at, 'dot')}
          uuid={notice.uuid}
        />
      ))}
    </div>
  );
}

interface NoticeItemProps {
  title: string;
  date: string;
  uuid: string;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ title, date, uuid }) => (
  <Link
    to={`/my-page/notice/${uuid}`}
    className="flex w-full flex-col justify-center gap-1.5 border-b border-gray-200 py-4 last:border-none hover:cursor-pointer"
  >
    <div className="flex w-full items-center gap-2">
      <span className="flex h-5 items-center justify-center rounded-md bg-gray-200 px-2 text-xs font-semibold text-gray-600">
        공지
      </span>
      <div className="font-regular text-xs font-semibold text-gray-300">{date}</div>
    </div>
    <div className="line-clamp-2 w-full text-base font-normal text-gray-800">{title}</div>
  </Link>
);
