import ThemeService from './ThemeService';

const queryKeys = {
  getThemes: ['themes'] as const,
};

export const queryOptions = {
  getThemes: () => ({
    queryKey: queryKeys.getThemes,
    queryFn: () => ThemeService.getThemes(),
  }),
};
