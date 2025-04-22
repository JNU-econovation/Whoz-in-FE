import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';
import Profile from '../components/users/Profile';  
import { customFetch } from '../api/customFetch';
import {getMemberInfo} from './auth/getMemberInfo';
import Block from '../components/users/Block';

const MyPageContainer = styled.div`
    padding-top: 4rem;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const MyPage = () => {
    const navigate = useNavigate();
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        setMyProfile(getMemberInfo())
    }, []);

    return (
        <div>
            <MyPageContainer>
                {myProfile && (
                    <>
                        <Profile profileInfo={myProfile} isEditable={true} />
                        <Block memberId={myProfile.member_id} />
                    </>
                )}
                <ListContainer>
                    <ListItem onClick={() => navigate('device-management')}>기기 관리</ListItem>
                    <ListItem onClick={() => navigate('voc')}>피드백 작성하기</ListItem> 
                </ListContainer>
            </MyPageContainer>
        </div>
    );
};

export default MyPage;
