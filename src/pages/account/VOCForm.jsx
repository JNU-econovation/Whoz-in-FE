import React, { useState } from "react";
import styled from "styled-components";
import { UpperMessage, ContentWrapper } from "../../components/StyledComponents/LayoutStyles";
import { customFetch } from "../../api/customFetch"; // 이 부분 추가

const FormContainer = styled.div`
  max-width: 20rem;
  width: 90%;
  padding: 2rem;
`;

const TitleArea= styled.input`
  width: 90%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ContentArea = styled.textarea`
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
  background: #e4e4e4;
  color: #535353;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
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
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 제출 방지

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await customFetch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title, content
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("서버 응답:", result);
        alert("피드백이 제출되었습니다!");
        setTitle("");
        setContent("");
      } else {
        console.error("에러 발생:", response.status);
        alert("피드백 제출에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentWrapper style={{ display: "flex", justifyContent: "center"}}>
      <div>
        <UpperMessage>피드백 남기기</UpperMessage>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <TitleArea
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ContentArea
              placeholder="피드백을 작성해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "제출 중..." : "제출하기"}
            </SubmitButton>
          </form>
        </FormContainer>
      </div>
    </ContentWrapper>
  );
};

export default VOCForm;
