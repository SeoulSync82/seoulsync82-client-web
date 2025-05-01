import SvgIcon from '@/components/SvgIcon';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useUserStore } from '@/stores/userSlice';
import { cn } from '@/utils/tailwindcss';

export default function EditProfile() {
  const { userProfile, userNameValidation, setUserProfile } = useUserStore();
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
      <NicknameSection
        userNickname={userProfile.name}
        inputError={userNameValidation.errorMessage}
        inputMessage={userNameValidation.message}
        handleInputChange={(e) => setUserProfile({ name: e.target.value })}
      />
    </div>
  );
}

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

const NicknameSection = ({
  userNickname,
  inputError,
  inputMessage,
  handleInputChange,
}: {
  userNickname: string;
  inputError: string;
  inputMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex w-full flex-col px-5">
    <label htmlFor="nickname" className="text-md font-normal text-gray-700">
      닉네임
    </label>
    <input
      id="nickname"
      type="text"
      className="mt-4 h-14 w-full rounded-lg border-none bg-gray-100 px-3 text-base text-gray-300 placeholder:text-gray-300 focus:text-gray-900 focus-visible:outline-none"
      placeholder="닉네임을 입력해주세요."
      value={userNickname}
      onChange={handleInputChange}
    />
    <span className={cn('mt-3 text-sm', inputError ? 'text-warning' : 'text-success')}>
      {inputError || inputMessage}
    </span>
  </div>
);
