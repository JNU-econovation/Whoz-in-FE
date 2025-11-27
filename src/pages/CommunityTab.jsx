// 탭 버튼들을 감싸는 컨테이너
const TabController = styled.div`
  display: flex;
  //position: sticky;
  background-color: #f0f2f5;
  border-radius: 28px;
  padding: 5px;
  margin: 1.5rem 1.5rem 1.5rem; /* 위, 좌우, 아래 여백을 설정해 위치와 간격을 조절 */
  flex-shrink: 0; /* 중요: 탭 컨트롤러의 크기가 줄어들지 않도록 설정 */
`;

// 개별 탭 버튼
const TabButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ isActive }) =>
      isActive
          ? css`
            background-color: #ffffff;
            color: #2a86ff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          `
          : css`
            background-color: transparent;
            color: #8e8e93;
          `}
`;

// 탭 콘텐츠를 감싸는 영역
const TabContent = styled.div`
  /* 탭 전환 애니메이션 등을 위한 공간 */
`;