import NotificationItem, {
  NotificationItemProps,
} from '@/components/pages/notifications/NotificationItem';
import withAuthGuard from '@/hoc/withAuthGuard';
import {
  useNotificationList,
  useSetReadNotification,
} from '@/service/notification/useNotificationService';

const NotificationPage = () => {
  const { data: notificationListData } = useNotificationList();
  const { mutate: readNotification } = useSetReadNotification();

  const onClickReadNotification = (uuid: string) => {
    readNotification(uuid);
  };

  return (
    <div className="page">
      {notificationListData?.map((notification: any) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClick={() => onClickReadNotification(notification.uuid)}
        />
      ))}
    </div>
  );
};

export default withAuthGuard(NotificationPage);
