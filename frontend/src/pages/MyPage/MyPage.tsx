import { SideBar } from '../../shared/components/SideBar/SideBar';
import { MyLayout } from '../../shared/layouts/MyLayout';
import React, {ReactElement} from 'react';

export const MyPage: React.FC<any> = (props): ReactElement => {
  return (
    <div>
      <SideBar currUser={props.currUser}>
        <MyLayout currUser={props.currUser}/>
      </SideBar>
    </div>
  );
};
