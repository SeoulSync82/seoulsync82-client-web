import { useLocation, useNavigate } from 'react-router';

interface NavigateOptions {
  replace?: boolean;
  state?: {
    previousPath?: string;
  };
}
export function useQueryParams() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const getQueryParam = (key: string) => {
    return searchParams.get(key);
  };

  const updateQueryParam = (key: string, value: string, navigateOptions: NavigateOptions = {}) => {
    searchParams.set(key, value);
    navigate(
      {
        pathname,
        search: `?${searchParams.toString()}`,
      },
      navigateOptions,
    );
  };

  const deleteQueryParam = (key: string, navigateOptions: NavigateOptions = {}) => {
    searchParams.delete(key);
    navigate(
      {
        pathname,
        search: `?${searchParams.toString()}`,
      },
      navigateOptions,
    );
  };
  return { searchParams, getQueryParam, updateQueryParam, deleteQueryParam };
}
