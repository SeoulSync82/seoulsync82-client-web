import { useParams } from 'react-router-dom';
import { useNoticeDetailService } from '@/service/notice/useNoticeService';
import { convertDateToYMD } from '@/utils';

const NoticeDetailPage = () => {
  const { id } = useParams();
  const { data: noticeDetail } = useNoticeDetailService(id as string);

  return (
    <div className="page px-5">
      <NoticeHeader
        date={convertDateToYMD(noticeDetail?.data?.published_at, 'dot')}
        title={noticeDetail?.data?.title}
      />
      <NoticeContent content={noticeDetail?.data?.content} />
    </div>
  );
};

const NoticeHeader = ({ date, title }: { date: string; title: string }) => (
  <div className="flex w-full flex-col justify-center gap-1.5 border-b border-gray-200 py-4">
    <div className="flex w-full items-center gap-2">
      <span className="flex h-5 items-center justify-center rounded-md bg-gray-200 px-2 text-xs font-semibold text-gray-600">
        공지
      </span>
      <div className="font-regular text-xs font-semibold text-gray-300">{date}</div>
    </div>
    <div className="line-clamp-2 w-full text-base font-semibold text-gray-800">{title}</div>
  </div>
);

const NoticeContent = ({ content }: { content: string }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} className="mt-5" />
);

export default NoticeDetailPage;
