import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  width: 90%;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #4a90e2;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: #357ac9;
  }
`;

const VOCForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    const feedback = {
      title,
      content,
    };

    console.log("사용자 피드백 제출:", feedback);
    alert("피드백이 제출되었습니다!");

    // 입력 필드 초기화
    setTitle("");
    setContent("");
  };

  return (
    <FormContainer>
      <Title>피드백 남기기</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="피드백을 작성해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default VOCForm;
