import { SideBar } from '../../shared/components/SideBar/SideBar';
import { MyLayout } from '../../shared/layouts/MyLayout';
import React, {ReactElement} from 'react';

export const MyPage: React.FC<any> = (): ReactElement => {
  return (
    <div>
      <SideBar>
        <MyLayout />
      </SideBar>
    </div>
  );
};
