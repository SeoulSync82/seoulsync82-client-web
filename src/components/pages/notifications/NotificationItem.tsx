export interface NotificationItem {
  id: number;
  uuid: string;
  content: string;
  target_uuid: string;
  user_uuid: string;
  user_thumbnail: string;
  read_at: string; // 철자 수정 요청
  created_at: string;
}
export interface NotificationItemProps extends NotificationItem {
  onClick: () => void;
}

export default function NotificationItem({
  content,
  created_at,
  user_thumbnail,
  onClick,
}: NotificationItemProps) {
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

  const checkIsRead = () => {
    const readTimestamp = new Date(read_at).getTime();
    const currentTimeStamp = new Date().getTime();
    const timeDiff = Math.abs(readTimestamp - currentTimeStamp);
    return timeDiff > 0 ? true : false;
  };

  return (
    <div className="flex h-[70px] w-full items-center gap-[14px] px-[20px]" onClick={onClick}>
      <img src={user_thumbnail} alt="Profile" className="h-[40px] w-[40px] rounded-full" />
      <div>
        <div
          className="font-regular text-[15px] text-gray-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="font-regular mt-[10px] text-12 text-gray-300">
          {convertDateToTimeAgo(created_at)}
        </div>
      </div>
    </div>
  );
}
