import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import NoticeService from './NoticeService';

export const useNoticeService = () => {
  return useInfiniteQuery({
    queryKey: ['notice'],
    queryFn: ({ pageParam = '' }) => NoticeService.getNoticeList(10, pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.last_item_id || '',
    initialPageParam: '',
  });
};

export const useNoticeDetailService = (uuid: string) => {
  return useQuery({
    queryKey: ['notice', uuid],
    queryFn: () => NoticeService.getNoticeDetail(uuid),
  });
};
