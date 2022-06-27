import { SideBar } from '../../shared/components/SideBar/SideBar';
import { MyLayout } from '../../shared/layouts/MyLayout';

export const MyPage: React.FC = () => {
  return (
    <div>
      <SideBar>
        <MyLayout />
      </SideBar>
    </div>
  );
};
