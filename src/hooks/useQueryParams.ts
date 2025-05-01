import { useLocation, useNavigate, useSearchParams } from 'react-router';

interface NavigateOptions {
  replace?: boolean;
  state?: {
    previousPath?: string;
  };
}
export function useQueryParams() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = (key: string) => {
    return searchParams.get(key);
  };

  const updateQueryParam = (key: string, value: string, navigateOptions: NavigateOptions = {}) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
    navigate(
      {
        pathname,
        search: `?${searchParams.toString()}`,
      },
      navigateOptions,
    );
  };

  const deleteQueryParam = (key: string, navigateOptions: NavigateOptions = {}) => {
    setSearchParams((prev) => {
      prev.delete(key);
      return prev;
    });
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
