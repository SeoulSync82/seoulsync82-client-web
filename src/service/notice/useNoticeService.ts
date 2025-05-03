import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import NoticeService from './NoticeService';

export const useNoticeService = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['notice'],
    queryFn: ({ pageParam = '' }) => NoticeService.getNoticeList(size, pageParam),
    getNextPageParam: (lastPage) => {
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.items);
    },
  });
};

export const useNoticeDetailService = (uuid: string) => {
  return useQuery({
    queryKey: ['notice', uuid],
    queryFn: () => NoticeService.getNoticeDetail(uuid),
  });
};
