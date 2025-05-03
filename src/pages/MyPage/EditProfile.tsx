import SvgIcon from '@/components/SvgIcon';
import withAuthGuard from '@/hoc/withAuthGuard';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useEditUserProfile } from '@/service/user/useUserService';
import useUserStore from '@/stores/userSlice';
import { cn } from '@/utils/tailwindcss';
import { useNavigate } from 'react-router-dom';

export const EditProfilePage = () => {
  const userProfile = useUserStore((state) => state.userProfile);
  const userNameValidation = useUserStore((state) => state.userNameValidation);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const setUserNameValidation = useUserStore((state) => state.setUserNameValidation);

  const checkValidateUserName = (name: string) => {
    let errorMessage = '';
    if (name.length > 8) {
      errorMessage = '닉네임은 8자 이하로 입력해주세요.';
    } else if (name.length < 2) {
      errorMessage = '2자 이상 입력해주세요.';
    }
    setUserNameValidation({ errorMessage });
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkValidateUserName(e.target.value);
    setUserProfile({ name: e.target.value });
  };
  const { handleSelectImageFile } = useImageUpload();

  const uploadProfileImage = async () => {
    try {
      const imageCDNUrl = await handleSelectImageFile();
      setUserProfile({
        profile_image: imageCDNUrl,
        uuid: userProfile.uuid,
      });
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const onClickEditProfileImageButton = () => {
    uploadProfileImage();
  };

  return (
    <div className="page flex flex-col gap-5">
      <ProfileImageSection
        profileImage={userProfile.profile_image}
        onClickEditProfileImageButton={onClickEditProfileImageButton}
      />
      <UserNameSection
        userName={userProfile.name}
        inputError={userNameValidation.errorMessage}
        inputMessage={userNameValidation.message}
        handleNicknameChange={handleNicknameChange}
        checkValidateUserName={checkValidateUserName}
      />
    </div>
  );
};

const ProfileImageSection = ({
  profileImage,
  onClickEditProfileImageButton,
}: {
  profileImage: string;
  onClickEditProfileImageButton: () => void;
}) => (
  <div className="mt-5 flex w-full justify-center">
    <div
      className="relative h-24 w-24 rounded-full bg-gray-400"
      style={{
        backgroundImage: `url(${profileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
        onClick={onClickEditProfileImageButton}
      >
        <SvgIcon name="Photo" width={16} height={16} />
      </button>
    </div>
  </div>
);

const UserNameSection = ({
  userName,
  inputError,
  inputMessage,
  handleNicknameChange,
}: {
  userName: string;
  inputError: string;
  inputMessage: string;
  handleNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex w-full flex-col px-5">
      <label htmlFor="nickname" className="text-md font-normal text-gray-700">
        닉네임
      </label>
      <input
        id="nickname"
        type="text"
        className="mt-4 h-14 w-full rounded-lg border-none bg-gray-100 px-3 text-base text-gray-300 placeholder:text-gray-300 focus:text-gray-900 focus-visible:outline-none"
        placeholder="닉네임을 입력해주세요."
        value={userName}
        onChange={handleNicknameChange}
      />
      <span className={cn('mt-3 text-sm', inputError ? 'text-warning' : 'text-success')}>
        {inputError || inputMessage}
      </span>
    </div>
  );
};

export default withAuthGuard(EditProfilePage);

// TODO: hook 분리?
export const useEditProfile = () => {
  const navigate = useNavigate();
  const { mutate: editUserProfile } = useEditUserProfile();
  const userProfile = useUserStore((state) => state.userProfile);
  const setUserNameValidation = useUserStore((state) => state.setUserNameValidation);

  const handleEditProfile = () => {
    return editUserProfile(
      {
        name: userProfile.name as string,
        profile_image: userProfile.profile_image as string,
        uuid: userProfile.uuid as string,
      },
      {
        onSuccess: () => {
          setUserNameValidation({
            message: '굿! 멋진 닉네임이에요',
            errorMessage: '',
          });
          navigate('/my-page');
        },
        onError: (error: any) => {
          console.error(error.response?.data.status.includes('SWEAR_WORD'));
          setUserNameValidation({
            errorMessage: error.response?.data.status.includes('SWEAR_WORD')
              ? '닉네임에 사용할 수 없는 단어가 포함되어 있어요.'
              : '',
          });
        },
      },
    );
  };

  return { handleEditProfile };
};
