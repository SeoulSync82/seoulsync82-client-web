import Image from '@/components/Image';
import {
  useAddComment,
  useCommentList,
  useDeleteComment,
  useUpdateComment,
} from '@/service/course/useCourseService';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/context/ToastContext';

const CommentPage = () => {
  const [searchParams] = useSearchParams();
  const community_post_uuid = searchParams.get('community_post_uuid');

  const [comment, setComment] = useState('');
  const { data: commentListData } = useCommentList(community_post_uuid as string);
  const { mutate: createComment, isPending } = useAddComment(community_post_uuid as string);
  const { mutate: updateComment } = useUpdateComment(community_post_uuid as string);
  const { mutate: deleteComment } = useDeleteComment();

  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment(comment, {
      onSuccess: () => setComment(''),
    });
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        showToast('댓글이 삭제되었습니다.');
      },
    });
  };

  const handleUpdate = (commentId: string) => {
    // TODO: 수정 관련 UI 요청 필요
    // updateComment(commentId, {
    //   onSuccess: () => {
    //     showToast('댓글이 수정되었습니다.');
    //   },
    // });
  };

  return (
    <div className="page flex flex-col items-center justify-between bg-white px-0 pb-7 pt-0">
      <div className="flex w-full flex-col items-center">
        <AuthorHighlight author={commentListData?.author as Author} />
        <div className="flex h-[calc(100dvh-206px)] w-full max-w-md flex-col gap-5 overflow-y-auto px-4 py-4">
          {commentListData?.comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={() => handleDelete(comment.uuid)}
              onUpdate={() => handleUpdate(comment.uuid)}
            />
          ))}
        </div>
      </div>
      <div className="w-full px-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isPending) {
              e.preventDefault();
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

const CommentItem = ({
  comment,
  onDelete,
  onUpdate,
}: {
  comment: Comment;
  onDelete: () => void;
  onUpdate: () => void;
}) => (
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
          <div className="flex items-center gap-1">
            <span>·</span>
            <button onClick={() => onDelete()}>삭제</button>
            <span>·</span>
            <button onClick={() => onUpdate()}>수정</button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CommentPage;
