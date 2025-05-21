import NotificationItem, {
  NotificationItemProps,
} from '@/components/pages/notifications/NotificationItem';
import withAuthGuard from '@/hoc/withAuthGuard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import {
  useNotificationList,
  useSetReadNotification,
} from '@/service/notification/useNotificationService';
import { useNavigate } from 'react-router';

const NotificationPage = () => {
  const navigate = useNavigate();

  const { data: notificationListData, hasNextPage, fetchNextPage } = useNotificationList();
  const { mutate: readNotification } = useSetReadNotification();

  const { bottomRef } = useIntersectionObserver(hasNextPage, fetchNextPage);

  const onClickReadNotification = (notification: NotificationItemProps) => {
    readNotification(notification.uuid);
    navigate(`/course/community/${notification.target_uuid}`);
  };

  return (
    <div className="page">
      {notificationListData?.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClick={() => onClickReadNotification(notification)}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default withAuthGuard(NotificationPage);
