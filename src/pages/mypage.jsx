import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';
import { useMemberInfo } from '../hooks/useMemberInfo';
import Profile from '../components/users/Profile';
import Block from '../components/users/Block';

const MyPageContainer = styled.div`
    padding-top: 4rem;
    padding-bottom: 6rem; 
`;


const MyPage = () => {
    const navigate = useNavigate();
    const memberId = localStorage.getItem('member_id');
    const { memberInfo } = useMemberInfo(memberId);

    return (
        <div>
            <MyPageContainer>
                {memberInfo && (
                    <>
                        <Profile profileInfo={memberInfo} isEditable={true} />
                        <Block memberId={memberInfo.id} />
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
