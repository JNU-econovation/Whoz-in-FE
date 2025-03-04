import React, { useState } from "react";
import styled from "styled-components";
import { UpperMessage, UpperContainer, ContentWrapper} from "../../components/StyledComponents/LayoutStyles";


const FormContainer = styled.div`
  max-width: 20rem;
  width: 90%;
  padding: 2rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 90%;
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
  background: linear-gradient(80deg, #b5d8f6 0%, #dab5f6 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 3rem;
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
    <ContentWrapper>

       <UpperMessage>피드백 남기기</UpperMessage>
      
  
    <FormContainer>
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
    </ContentWrapper>
  );
};

export default VOCForm;
