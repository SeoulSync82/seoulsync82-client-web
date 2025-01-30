import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryOptions } from './queries';
import NotificationService from './NotificationService';

export const useNotificationList = (size: number = 10, last_id: number = 0) => {
  return useQuery(queryOptions.getNotificationList(size, last_id));
};

export const useSetReadNotification = ({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(queryOptions.getNotificationList());

  return useMutation({
    mutationFn: (uuid: string) => NotificationService.setReadNotification(uuid),
    onSuccess,
    onError,
  });
};
