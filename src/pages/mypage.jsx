import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기

import styled from 'styled-components';
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';

const MyPage = () => {
    const navigate = useNavigate(); // navigate 함수 선언

    return (
        <div>
            <ListContainer>
                <ListItem onClick={() => navigate('/MyProfile')}>프로필</ListItem>
                <ListItem onClick={() => navigate('/ManageDevice')}>내 기기 관리</ListItem>
                <ListItem onClick={() => navigate('/Setting')}>앱 설정</ListItem>           
             </ListContainer>
        </div>
    );
};

export default MyPage;
