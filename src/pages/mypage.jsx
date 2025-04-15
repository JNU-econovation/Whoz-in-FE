import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';
import Profile from '../components/users/Profile';  
import { customFetch } from '../api/customFetch';

const MyPageContainer = styled.div`
    padding-top: 4rem;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const MyPage = () => {
    const navigate = useNavigate();
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await customFetch(BASE_URL + '/api/v1/member');
                const data = await response.json();
                if (data.data) {
                    setMyProfile({
                        name: data.data.name || '',
                        generation: data.data.generation ?? '',
                        position: data.data.position || '',
                       // statusMessage: data.data.statusMessage || '',
                        profilePic: data.data.profilePic || null,
                    });
                }
            } catch (error) {
                console.error('내 프로필 정보를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchMyProfile();
    }, []);

    return (
        <div>
            <MyPageContainer>
                {myProfile && <Profile profileInfo={myProfile} isEditable={true} />}
                
                <ListContainer>
                    <ListItem onClick={() => navigate('device-management')}>기기 관리</ListItem>
                    <ListItem onClick={() => navigate('voc')}>피드백 작성하기</ListItem> 
                </ListContainer>
            </MyPageContainer>
        </div>
    );
};

export default MyPage;
