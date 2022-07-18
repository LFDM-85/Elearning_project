import { SideBar } from '../../shared/components/SideBar/SideBar';
import { MyLayout } from '../../shared/layouts/MyLayout';
import React from 'react';

export const MyPage: React.FC< React.ReactNode> = () => {
  return (
    <div>
      <SideBar>
        <MyLayout />
      </SideBar>
    </div>
  );
};
