import withAuthGuard from '@/hoc/withAuthGuard';

function MyPage() {
  return <div>MyPage</div>;
}

export default withAuthGuard(MyPage);