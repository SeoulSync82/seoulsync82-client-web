import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NotificationService from './NotificationService';
import { AxiosResponse } from 'axios';

export const useNotificationList = (size: number = 10, next_page: string = '') => {
  return useInfiniteQuery({
    queryKey: ['getNotificationList', size, next_page],
    queryFn: ({ pageParam = next_page }) =>
      NotificationService.getNotificationList(size, pageParam.toString()),
    getNextPageParam: (lastPage) => {
      return lastPage.data.next_page || undefined;
    },
    initialPageParam: next_page,
  });
};

export const useSetReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, string>({
    mutationFn: (uuid: string) => NotificationService.setReadNotification(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotificationList'] });
    },
  });
};
