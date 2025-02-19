import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;

  input, textarea {
    color: white;
    font-size: 23px;
  }
`;

export const StyledH2Message = styled.h2`
  text-align: center;
  width: 100%;
  font-size: 30px;
  color: #cad623;
`
export const HintsButtonWrapper = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: space-evenly;
  width: 100%;
  margin: 10px;

  button {
    width: 30%;
  }
`;

export const Hint = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  button {
    width: 50px;
    height: 40px;
    font-size: 20px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 20px;
`
