import React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

const MyPage = () => {
    return (
        <div>
            <h1>마이페이지</h1>
            <nav>
                
            <Link to="MyProfile">프로필</Link>
            <Link to="ManageDevice">기기 관리</Link>
            <Link to="setting">설정</Link>
                
            </nav>
            {/* 하위 라우트가 표시될 위치 */}
            <Outlet />
        </div>
    );
};

export default MyPage;
