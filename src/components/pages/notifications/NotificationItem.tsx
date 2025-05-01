import Image from '@/components/Image';
import { cn } from '@/utils/tailwindcss';

export interface NotificationItem {
  id: number;
  uuid: string;
  content: string;
  target_uuid: string;
  user_uuid: string;
  user_thumbnail: string;
  read_at: string;
  created_at: string;
  target_type: 'comment' | 'reaction';
}
export interface NotificationItemProps extends NotificationItem {
  onClick: () => void;
}

export default function NotificationItem({
  content,
  created_at,
  user_thumbnail,
  read_at,
  target_type,
  onClick,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 px-5 py-4 hover:cursor-pointer',
        read_at && 'text-gray-300 opacity-60',
      )}
      onClick={onClick}
    >
      <Image
        src={user_thumbnail}
        alt="Profile"
        width={36}
        height={36}
        rounded="full"
        fallbackWidth={20}
        fallbackHeight={20}
      />
      <div className="flex flex-col gap-1">
        <NotificationType target_type={target_type} read_at={read_at} />
        <NotificationContent content={content} />
        <NotificationTime created_at={created_at} />
      </div>
    </div>
  );
}

const NotificationContent = ({ content }: { content: string }) => (
  <div
    className="font-regular text-sm text-gray-900"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const NotificationType = ({ target_type, read_at }: { target_type: string; read_at: string }) => (
  <div className={cn('text-sm font-bold', read_at ? 'text-gray-300' : 'text-primary-500')}>
    {target_type === 'comment' && '댓글'}
    {target_type === 'reaction' && '좋아요'}
  </div>
);

const NotificationTime = ({ created_at }: { created_at: string }) => {
  const convertDateToTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.ceil(timeDiff / (1000 * 60));
    const hours = Math.ceil(minutes / 60);
    const days = Math.ceil(hours / 24);
    const weeks = Math.ceil(days / 7);
    const months = Math.ceil(weeks / 4);
    const years = Math.ceil(months / 12);

    switch (true) {
      case years > 0:
        return `${years}년 전`;
      case months > 0:
        return `${months}개월 전`;
      case weeks > 0:
        return `${weeks}주 전`;
      case days > 0:
        return `${days}일 전`;
      case hours > 0:
        return `${hours}시간 전`;
      case minutes > 0:
        return `${minutes}분 전`;
      default:
        return '방금 전';
    }
  };

  return (
    <div className="font-regular text-sm text-gray-300">{convertDateToTimeAgo(created_at)}</div>
  );
};
