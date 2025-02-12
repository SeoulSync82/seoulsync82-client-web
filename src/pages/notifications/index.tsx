import NotificationItem, {
  NotificationItemProps,
} from '@/components/pages/notifications/NotificationItem';
import withAuthGuard from '@/hoc/withAuthGuard';
import {
  useNotificationList,
  useSetReadNotification,
} from '@/service/notification/useNotificationService';

function NotificationPage() {
  const { data: notificationData } = useNotificationList();
  const { mutate: readNotification } = useSetReadNotification();

  const onClickReadNoti = (uuid: string) => {
    readNotification(uuid);
  };
  return (
    <div className="mx-auto h-screen w-full max-w-md bg-white">
      {notificationData?.data.items.map((notification: NotificationItemProps) => (
        <NotificationItem key={notification.id} {...notification} onClick={() => onClickReadNoti} />
      ))}
    </div>
  );
}

export default withAuthGuard(NotificationPage);