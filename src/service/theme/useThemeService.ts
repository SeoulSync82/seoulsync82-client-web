import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useThemesList = () => {
  return useQuery(queryOptions.getThemes());
};
