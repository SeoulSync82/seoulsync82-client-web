import NotificationItem, {
  NotificationItemProps,
} from '@/components/pages/notifications/NotificationItem';
import withAuthGuard from '@/hoc/withAuthGuard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import {
  useNotificationList,
  useSetReadNotification,
} from '@/service/notification/useNotificationService';

const NotificationPage = () => {
  const { data: notificationListData, hasNextPage, fetchNextPage } = useNotificationList();
  const { mutate: readNotification } = useSetReadNotification();
  const { bottomRef } = useIntersectionObserver(hasNextPage, fetchNextPage);

  const onClickReadNotification = (uuid: string) => {
    readNotification(uuid);
  };

  return (
    <div className="page">
      <NotificationList
        notifications={notificationListData || []}
        onClickReadNotification={onClickReadNotification}
      />
      <div ref={bottomRef} />
    </div>
  );
};

const NotificationList = ({
  notifications,
  onClickReadNotification,
}: {
  notifications: NotificationItemProps[];
  onClickReadNotification: (uuid: string) => void;
}) => (
  <>
    {notifications?.map((notification) => (
      <NotificationItem
        key={notification.id}
        {...notification}
        onClick={() => onClickReadNotification(notification.uuid)}
      />
    ))}
  </>
);

export default withAuthGuard(NotificationPage);
