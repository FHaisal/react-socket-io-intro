import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { pmColour } from "./colours";

export const StyledMessageBox = styled(TextareaAutosize)`
  max-height: 142px;
  min-height: 20px;
  padding: 10px;
  margin: 0;
  resize: none;
  border-left: 1px dashed black;
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
  border-right: none;
  box-shadow: none;
  outline: none;
  box-sizing: border-box;
  display: block;
  width: 100%;
  color: ${props => props.privatemessage === 'true' ? pmColour : 'black'};
  
  ::-webkit-input-placeholder { /* Chrome */
    color: ${props => props.privatemessage === 'true' ? pmColour : undefined};
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: ${props => props.privatemessage === 'true' ? pmColour : undefined};
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${props => props.privatemessage === 'true' ? pmColour : undefined};
    opacity: 1;
  }
  :-moz-placeholder { /* Firefox 4 - 18 */
    color: ${props => props.privatemessage === 'true' ? pmColour : undefined};
    opacity: 1;
  }
`;

export const StyledMessageContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledMessageButton = styled.button`
  border: none;
  text-decoration: none;
  text-align: center;
  background: #ffffff;
  outline: none;
  height: 35px;
  font-weight: 600;
  cursor: pointer;
  
  :active {
    transform: scale(0.9);
  }
  
  :hover {
    color: #696969;
  }
`;

export const StyledMessageBtnContainer = styled.div`
  display: flex;
  flex-direction column-reverse;
  border-right: 1px dashed black;
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
  box-sizing: border-box;
`;