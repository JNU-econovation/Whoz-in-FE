import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';

import ProfileCard from '../components/ProfileCard'; 

const MyPageContainer = styled.div`
    padding-top: 4rem;
`;

const MyPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <MyPageContainer>
                <ProfileCard /> 
                <ListContainer>
                    <ListItem onClick={() => navigate('profile')}>프로필</ListItem>
                    <ListItem onClick={() => navigate('device-management')}>내 기기 관리</ListItem>
                    {/* <ListItem onClick={() => navigate('setting')}>앱 설정</ListItem>
                    <ListItem onClick={() => navigate('voc')}>VOC</ListItem> */}
                </ListContainer>
            </MyPageContainer>
        </div>
    );
};

export default MyPage;