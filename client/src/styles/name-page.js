import styled from 'styled-components';

export const StyledNameInput = styled.input`
  border: 1px dashed black;
  outline: none;
  padding: 10px;
  font-size: 1.1rem;
  box-sizing: border-box;
`;

export const StyledNameButton = styled.button`
  border: 1px dashed black;
  background: #fff;
  margin-top: 10px;
  box-sizing: border-box;
  font-size: 1.1rem;
  padding: 8px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  
  :active {
    transform: scale(0.9);
  }
  
  :hover {
    color: #696969;
  }
`;

export const StyledNameForm = styled.form`
  border: 1px solid black;
  width: ${props => props.width ? props.width : undefined};
  height: ${props => props.height ? props.height : '550px'};
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;