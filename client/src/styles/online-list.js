import styled from 'styled-components';
import { pmColour } from "./colours";

export const StyledOnlineList = styled.div`
  border: 1px dashed black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 10px;
`;

export const StyledOnlineListItem = styled.div`
  word-wrap: break-word;
  padding: 5px;
  border-bottom: 1px dashed black;
  text-align: center;
  cursor: pointer;
`;

export const StyledOnlineDescription = styled.div`
  font-size: 0.8rem;
  color: ${pmColour}
`;