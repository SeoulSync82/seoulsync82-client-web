import NotificationService from "./NotificationService";

const queryKeys = {
  getNotificationList: ['notificationList'] as const,
} as const;

export const queryOptions = {
  getNotificationList: () => ({
    queryKey: queryKeys.getNotificationList,
    queryFn: () => NotificationService.getNotificationList(),
  }),
};
