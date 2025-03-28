import React from "react";
import { Input, Button, Container } from "../../components/StyledComponents/AuthStyles";
import GenerationsDropdown, { StyledSelect } from "../../components/GenerationSelect";

const MemberInfo = ({ name, setName, generation, setGeneration, position, setPosition, onJoin }) => {
    return (
        <Container>
            <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {/* <GenerationsDropdown name={name} setName={setName} /> */}
            <GenerationsDropdown generation={generation} setGeneration={setGeneration} />
            <StyledSelect
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            >
                <option value="">분야</option>
                <option value="BE">BE</option>
                <option value="FE">FE</option>
                <option value="APP">APP</option>
                <option value="AI">AI</option>
                <option value="GAME">GAME</option>
                <option value="PM">PM</option>
                <option value="DE">DESIGNER</option>
                

            </StyledSelect>
            <Button onClick={onJoin}>회원가입</Button>
        </Container>
    );
};

export default MemberInfo;
