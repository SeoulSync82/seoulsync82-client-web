import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from './UserService';

export const useUserProfile = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => UserService.getUserProfile(),
    enabled,
  });
};

export const useEditUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; profile_image: string }) =>
      UserService.editUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useUserLogout = () => {
  return useMutation({
    mutationFn: () => UserService.userLogout(),
  });
};
