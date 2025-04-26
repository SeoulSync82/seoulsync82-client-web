import SvgIcon from '@/components/SvgIcon';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useEditUserProfile } from '@/service/user/useUserService';
import { cn } from '@/utils/tailwindcss';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

export default function EditProfile() {
  const queryClient = useQueryClient();
  const cachedUserProfile = queryClient.getQueryData(['userProfile']) as {
    data: { profile_image: string; name: string };
  };

  const [userNickname, setUserNickname] = useState(cachedUserProfile.data.name);
  const [inputError, setInputError] = useState<string>('');
  const [inputMessage, setInputMessage] = useState<string>('');

  const { handleSelectImageFile } = useImageUpload();
  const { mutate: editUserProfile } = useEditUserProfile();

  const uploadProfileImage = useCallback(async () => {
    try {
      const imageCDNUrl = await handleSelectImageFile();
      console.log('imageCDNUrl:', imageCDNUrl);
      editUserProfile({
        name: userNickname,
        profile_image: imageCDNUrl,
      });
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  }, [handleSelectImageFile, editUserProfile, userNickname]);

  const onClickEditProfileImageButton = useCallback(() => {
    uploadProfileImage();
  }, [uploadProfileImage]);

  const errorValidations = [
    {
      condition: (nickname: string) => nickname.length < 2 && nickname.length > 0,
      message: '2자 이상 입력해주세요.',
    },
    {
      condition: (nickname: string) => nickname.length > 8,
      message: '닉네임은 8자 이하로 입력해주세요.',
    },
    {
      condition: (nickname: string) => /\s/.test(nickname),
      message: '닉네임은 띄어쓰기 없이 사용할 수 있어요.',
    },
    {
      condition: (nickname: string) => /[^a-zA-Z0-9가-힣_]/.test(nickname),
      message: '한글, 영문, 숫자, _(언더바)만 사용할 수 있어요.',
    },
    {
      condition: (nickname: string) => nickname.includes('시발'),
      message: '닉네임에 사용할 수 없는 단어가 포함되어 있어요.',
    },
  ];

  const checkValidateNickname = (nickname: string) => {
    const hasError = errorValidations.find((error) => error.condition(nickname));
    return hasError;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setUserNickname(targetValue);

    const hasValidateError = checkValidateNickname(targetValue);
    const isValidNickname = !hasValidateError && targetValue.length > 0;

    setInputMessage(isValidNickname ? '굿! 멋진 닉네임이에요.' : '');
    setInputError(hasValidateError ? hasValidateError.message : '');
  };

  const handleSubmit = () => {
    if (inputError) return;
    editUserProfile({
      name: userNickname,
      profile_image: '',
    });
  };

  return (
    <div className="page flex flex-col gap-5">
      {/* 프로필 이미지 섹션 */}
      <div className="mt-5 flex w-full justify-center">
        <div
          className="relative h-24 w-24 rounded-full bg-gray-400"
          style={{
            backgroundImage: `url(${cachedUserProfile.data.profile_image})`,
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
      {/* 닉네임 섹션 */}
      <div className="flex w-full flex-col px-5">
        {/* TODO: input, label 컴포넌트화 */}
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
    </div>
  );
}
