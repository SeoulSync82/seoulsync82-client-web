import Image from '@/components/Image';
import { useAddComment, useCommentList } from '@/service/course/useCourseService';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CommentPage = () => {
  const [searchParams] = useSearchParams();
  const community_post_uuid = searchParams.get('community_post_uuid');

  const [comment, setComment] = useState('');
  const { data: commentListData } = useCommentList(community_post_uuid as string);
  const { mutate: createComment, isPending } = useAddComment(community_post_uuid as string);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment(comment, {
      onSuccess: () => setComment(''),
    });
  };

  return (
    <div className="page flex flex-col items-center bg-white px-0 pb-0 pt-0">
      <AuthorHighlight author={commentListData?.author as Author} />
      <CommentList comments={commentListData?.comments as Comment[]} />
      <div className="w-full px-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key === 'Enter' && !isPending) {
              handleSubmit();
            }
          }}
          type="text"
          placeholder="한줄평을 남겨주세요."
          className="h-[48px] w-full rounded-lg bg-gray-100 px-3 text-base text-gray-900 placeholder:text-gray-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

type Author = {
  user_name: string;
  review: string;
  user_profile_image: string;
};

const AuthorHighlight = ({ author }: { author: Author }) => (
  <div className="flex h-[70px] w-full max-w-md items-start gap-3 bg-[#F4F2FA] px-5 py-3.5">
    <div className="flex-1">
      <div className="mb-1.5 flex items-center gap-1">
        <span className="mt-0.5 text-xs font-semibold text-[#805BC8]">{author?.user_name}</span>
        <span className="flex h-[14px] items-center rounded-sm bg-[#E8E7FF] px-1 py-0.5 text-10 font-medium text-[#464646]">
          코스 작성자
        </span>
      </div>
      <div className="text-sm font-medium leading-snug text-gray-700">{author?.review}</div>
    </div>
    <Image
      src={author?.user_profile_image}
      alt="프로필"
      width={32}
      height={32}
      rounded="full"
      fallbackWidth={20}
      fallbackHeight={20}
    />
  </div>
);

type Comment = {
  id: string;
  user_name: string;
  user_profile_image: string;
  comment: string;
  created_at: string;
  isAuthor: boolean;
};

const CommentList = ({ comments }: { comments: Comment[] }) => (
  <div className="flex h-[calc(100dvh-300px)] w-full max-w-md flex-col gap-5 overflow-y-auto px-4 py-4">
    {comments?.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
  </div>
);

const CommentItem = ({ comment }: { comment: Comment }) => (
  <div className="flex items-start gap-3">
    <div className="relative">
      <Image
        src={comment.user_profile_image}
        alt="프로필"
        width={32}
        height={32}
        rounded="full"
        fallbackWidth={20}
        fallbackHeight={20}
      />
    </div>
    <div className="min-w-0 flex-1">
      <div className="mb-2 flex items-center text-12 font-semibold text-[#686868]">
        {comment.user_name}
      </div>
      <div className="break-words text-sm leading-none text-[#212529]">{comment.comment}</div>
      <div className="mt-1 flex items-center gap-1 text-xs font-normal text-gray-300">
        <span>{new Date(comment.created_at).toLocaleDateString().slice(0, -1)}</span>
        {comment.isAuthor && (
          <>
            <span>·</span>
            <button>삭제</button>
            <span>·</span>
            <button>수정</button>
          </>
        )}
      </div>
    </div>
  </div>
);

export default CommentPage;
