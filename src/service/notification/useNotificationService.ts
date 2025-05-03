import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NotificationService from './NotificationService';
import { AxiosResponse } from 'axios';

export const useNotificationList = (size: number = 10) =>
  useInfiniteQuery({
    queryKey: ['notificationList', size],
    queryFn: ({ pageParam = 0 }) => NotificationService.getNotificationList(size, pageParam),
    getNextPageParam: (lastPage) => {
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.items);
    },
  });

export const useSetReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, Error, string>({
    mutationFn: (uuid: string) => NotificationService.setReadNotification(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] });
    },
  });
};
