import withAuthGuard from '@/components/WithAuthGuard';

function MyPage() {
  return <div>MyPage</div>;
}

export default withAuthGuard(MyPage);
