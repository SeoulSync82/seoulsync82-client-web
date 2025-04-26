import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NotificationService from './NotificationService';
import { AxiosResponse } from 'axios';

const queryKeys = {
  notificationList: (size: number, nextPage: string) =>
    ['getNotificationList', size, nextPage] as const,
};

export const useNotificationList = (size: number = 10, nextPage: string = '') => {
  return useInfiniteQuery({
    queryKey: queryKeys.notificationList(size, nextPage),
    queryFn: ({ pageParam = nextPage }) =>
      NotificationService.getNotificationList(size, pageParam.toString()),
    getNextPageParam: (lastPage) => lastPage.data.next_page || undefined,
    initialPageParam: nextPage,
    select: (data) => {
      console.log(data.pages.flatMap((page) => page.data.items));
      return data.pages.flatMap((page) => page.data.items);
    },
  });
};

export const useSetReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, Error, string>({
    mutationFn: (uuid: string) => NotificationService.setReadNotification(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationList(10, '') });
    },
  });
};
