import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa'; // react-icons 패키지 사용


// 스타일 선언 


const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  height: 100vh;
`;
const InnerContainer = styled.div`
  // div를 중첩하고 display: flex를 했더니 엄청 좁아지는 문제가 있었는데.. 빼니까 해결이 되는군
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  height: 100vh;
`;


const Input = styled.input`
  height: 50px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  position: absolute; 
  top: 40px; 
  left: 40px; 
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #7c7c7c;
  cursor: pointer;
  
  &:hover {
    color: #0056b3;
  }

  svg {
    margin-right: 8px;
    font-size: 30px;
  }
`;


const Join = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleJoin = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 회원가입 로직 구현&통신... 일단 콘솔로그 찍는걸로
    console.log('ID:', username);
    console.log('비밀번호:', password);
    console.log('이메일:', email);
    alert('회원가입이 완료되었습니다!');

    // 가입 완료 후 로그인 페이지로 이동
    navigate('/');
  };

  //TODO: 아이디, 비밀번호 형식 지정하고 이메일 정규식 넣기
  return (
   <OuterContainer>
    <BackButton onClick={ () => {navigate(-1)}}>
      <FaAngleLeft />      </BackButton>

   <InnerContainer>

      <Input
        type="text"
        placeholder="ID"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleJoin}>회원가입</Button>
    </InnerContainer>
    </OuterContainer>
  );
};

export default Join;
