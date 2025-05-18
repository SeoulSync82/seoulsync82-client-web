import { useQuery } from '@tanstack/react-query';
import ThemeService from './ThemeService';

export const useThemesList = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: () => ThemeService.getThemes(),
  });
};
