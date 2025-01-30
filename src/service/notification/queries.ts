import NotificationService from './NotificationService';

const queryKeys = {
  getNotificationList: ['notificationList'] as const,
} as const;

export const queryOptions = {
  getNotificationList: (size: number = 10, last_id: number = 0) => ({
    queryKey: queryKeys.getNotificationList,
    queryFn: () => NotificationService.getNotificationList(size, last_id),
  }),
};
