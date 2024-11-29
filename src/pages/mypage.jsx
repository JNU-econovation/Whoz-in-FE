import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    padding: 3rem;
`;

const ProfileCard = () => {
    return (
        <ProfileContainer>

        </ProfileContainer>
    );
};

const MyPage = () => {
    const navigate = useNavigate(); 

    return (
        <div>
    
            <ListContainer>
                <ListItem onClick={() => navigate('profile')}>프로필</ListItem>
                <ListItem onClick={() => navigate('device-management')}>내 기기 관리</ListItem>
                <ListItem onClick={() => navigate('setting')}>앱 설정</ListItem>
            </ListContainer>
    
        </div>
    );
};

export default MyPage;
