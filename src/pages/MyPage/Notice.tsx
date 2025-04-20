const notices = [
  {
    title: '[공지] 서울싱크82 개인정보처리방침 개정 사전 안내합니다',
    date: '2025.04.21',
  },
  {
    title: '[공지] 전산시스템 점검에 따른 서비스 일시 중단 안내 (3월 15일 04시~ 06시)',
    date: '2025.04.22',
  },
  {
    title: '[공지] 서울싱크82 개인정보처리방침 개정 사전 안내합니다',
    date: '2025.04.21',
  },
];

export default function NoticePage() {
  return (
    <div className="page w-full overflow-y-auto bg-white px-4">
      {notices.map((notice, index) => (
        <NoticeItem key={index} title={notice.title} date={notice.date} />
      ))}
    </div>
  );
}

interface NoticeItemProps {
  title: string;
  date: string;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ title, date }) => (
  <div className="flex w-full flex-col justify-center gap-2 border-b border-gray-200 py-3 last:border-none">
    <div className="line-clamp-2 w-full text-base font-normal text-black">{title}</div>
    <div className="font-regular text-sm text-gray-300">{date}</div>
  </div>
);
