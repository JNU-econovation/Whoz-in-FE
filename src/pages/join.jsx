import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일 선언 
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
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
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
    <Container>
    <Button onClick={ () => {
      navigate(-1);
       } }>뒤로가기</Button>
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
    </Container>
  );
};

export default Join;
