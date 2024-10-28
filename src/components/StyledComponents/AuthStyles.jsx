import styled from "styled-components"

// 스타일 선언 (Styled-Components)

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    // 이거 추가했더니 버튼 넓이가 글자수 넓이 만큼 줄었다. 왜지?
    padding: 2rem;
    background-color: #fff;
    height: 100vh;
    box-sizing: border-box;
`

export const Input = styled.input`
    height: 4rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    width: 100%;
    max-width: 25rem;
    box-sizing: border-box;
`

export const Button = styled.button`
    background-color: white;
    color: gray;
    padding: 15px;
    border: solid 1px lightgray;
    border-radius: 1.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    width: 100%;    // 대신 여기서 넓이를 지정해주는구나
    max-width: 25rem;
    margin-bottom: 1rem;

    &:hover {
        background-color: lightgray;
        color: white
    }
`

export const KakaoButton = styled(Button)`
    margin-top: 0px;
    background-color: #fee500;
    color: #3c1e1e;
    font-weight: bold;
    border: none;

    &:hover {
        background-color: #3c1e1e;
        color: #fee500;
    }
`
export const JoinButton = styled(Button)`
    margin-top: 1rem;
    background-color: transparent;
    color: #616161;
    font-weight: bold;
    
    border: none;
    &:hover {
        background-color: transparent;
        color: #515151;
    }
`

export const BackButton = styled.button`
position: absolute;
top: 3rem;
left: 1rem;
display: flex;
align-items: center;
background-color: transparent;
border: none;
color: #7c7c7c;
cursor: pointer;

&:hover {
    color: #0056b3;
}

svg {
    margin-right: 8px;
    font-size: 30px;
}
`
;
