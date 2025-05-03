import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from './UserService';

export const useUserProfile = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => UserService.getUserProfile(),
    enabled,
    gcTime: Infinity,
  });
};

export const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      profile_image,
      uuid,
    }: {
      name: string;
      profile_image: string;
      uuid: string;
    }) => UserService.editUserProfile({ name, profile_image, uuid }),
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
