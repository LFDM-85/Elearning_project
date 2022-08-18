import { Suspense } from 'react';
import { MyPage } from '../../../pages/MyPage/MyPage';
import { Loading } from '../Loading/Loading';

export const MyPageRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPage currUser={'User'} />
    </Suspense>
  );
};
