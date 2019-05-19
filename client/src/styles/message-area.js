import styled from 'styled-components';
import { pmColour } from "./colours";

export const StyledMessageArea = styled.div`
  border: 1px dashed black;
  width: 100%;
  height: 88%;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

export const StyledMessage = styled.div`
  word-wrap: break-word;
  padding: 10px;
  text-align: ${props => props.otherMessage ? 'right' : undefined};
  white-space: pre-line;
  border-top: 1px dashed ${props => props.privateMessage ? pmColour : 'black'};
  color: ${props => props.privateMessage ? pmColour : 'black'};
`;

export const StyledMessageHeader = styled.div`
  font-weight: 600;
  padding-bottom: 5px;
`;

export const StyledMessageDescription = styled.div`
  font-weight: normal;
  font-size: 0.8rem;
  display: inline;
  padding-left: 5px;
`;

export const StyledAnnouncementMessage = styled.div`
  word-wrap: break-word;
  padding: 10px;
  text-align: center;
  white-space: pre-line;
  border-top: 1px dashed black;
  font-weight: 600;
`;