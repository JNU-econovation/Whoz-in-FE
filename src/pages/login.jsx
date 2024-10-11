import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-components로 스타일 선언
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const KakaoButton = styled(Button)`
  margin-top: 20px;
  background-color: #fee500;
  color: #3c1e1e;
  font-weight: bold;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: 로그인 로직 구현
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직 구현
    console.log('Kakao Login Pressed');
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="ID"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
      
      <KakaoButton onClick={handleKakaoLogin}>
        카카오로 로그인
      </KakaoButton>
    </Container>
  );
};

export default Login;
