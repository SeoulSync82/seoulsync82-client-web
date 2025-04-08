import withAuthGuard from '@/hoc/withAuthGuard';
import SvgIcon from '@/components/SvgIcon';

function MyPage() {
  return (
    <div className="page w-full overflow-y-auto bg-white">
      {/* 상단 로그인 안내 박스 */}
      <section className="max-container mt-4 px-5">
        <div className="flex items-center justify-between gap-2 rounded-md bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <SvgIcon name="MyPage" width={28} height={30} color="#DEE2E6" active />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-900">로그인이 필요해요</span>
              <span className="text-sm font-bold text-primary-500">빠르게 로그인하기!</span>
            </div>
          </div>
          {/* <SvgIcon name="Chevron" width={16} height={16} /> */}
        </div>
      </section>

      {/* MY 섹션 */}
      <section className="max-container mt-8 border-none px-5">
        <h2 className="text-base font-normal text-gray-400">MY</h2>
        <ul className="mt-5 space-y-5 pb-4 text-sm font-medium text-gray-600">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SvgIcon name="Write" width={24} height={24} color="#ADB5BD" />
              <span className="text-base text-gray-600">내가 작성한 글</span>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SvgIcon name="Heart" width={24} height={24} color="#ADB5BD" />
              <span className="text-base text-gray-600">좋아요한 글</span>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SvgIcon name="Bookmark" width={24} height={24} color="#ADB5BD" />
              <span className="text-base text-gray-600">북마크</span>
            </div>
          </li>
        </ul>
      </section>
      <hr className="h-3 border-none bg-gray-100" />
      {/* 서비스 이용 섹션 */}
      <section className="max-container mt-5 border-none px-5">
        <h2 className="text-base font-normal text-gray-400">서비스 이용</h2>
        <ul className="mt-5 space-y-5 pb-4 text-sm font-medium text-gray-600">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <SvgIcon name="Notice" width={24} height={24} color="#ADB5BD" /> */}
              <span className="text-base text-gray-600">내가 작성한 글</span>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <SvgIcon name="Alarm" width={24} height={24} color="#ADB5BD" /> */}
              <span className="text-base text-gray-600">좋아요한 글</span>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <SvgIcon name="App" width={24} height={24} color="#ADB5BD" /> */}
              <span className="text-base text-gray-600">앱버전</span>
            </div>
          </li>
        </ul>
      </section>
      <hr className="h-3 border-none bg-gray-100" />
      {/* 회원정보 관리 섹션 */}
      <section className="mt-5 border-none px-5">
        <h2 className="text-base font-normal text-gray-400">회원정보 관리</h2>
        <ul className="mt-5 space-y-5 pb-4 text-sm font-medium text-gray-600">
          <li className="flex items-center justify-between">
            <span className="text-base text-gray-600">소셜로그인 정보</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-base text-gray-600">로그인</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default withAuthGuard(MyPage);
