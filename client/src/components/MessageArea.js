import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledAnnouncementMessage,
  StyledMessage,
  StyledMessageArea,
  StyledMessageDescription,
  StyledMessageHeader
} from "../styles/message-area";

function MessageArea({ messages, verifySocketID, onlineList }) {
  const getUserIndex = (socketID) => onlineList.findIndex(user => user.socketID === socketID) + 1;

  return (
    <StyledMessageArea>
      {
        messages.map(({ name, time, content, socketID, type, privateMessage }, index) => {
          let element;
          const userIndex = getUserIndex(socketID);

          switch(type) {
            case 'announcement':
              element = (
                <StyledAnnouncementMessage key={index}>
                  <StyledMessageDescription>
                    { time }
                  </StyledMessageDescription>
                  <br/>
                  { content }
                </StyledAnnouncementMessage>
              );
              break;
            case 'private_message':
              const toIndex = getUserIndex(privateMessage.socketID);
              let nameTitle = socketID !== verifySocketID
                ? `Message from ${name} ${userIndex > 0 ? `[${userIndex}]` : ``}`
                : `Message to ${privateMessage.name} ${toIndex > 0 ? `[${toIndex}]` : ``}`;

              element = (
                <StyledMessage key={index} otherMessage={verifySocketID !== socketID} privateMessage>
                  <StyledMessageHeader privateMessage>
                    { nameTitle }
                    <StyledMessageDescription privateMessage>
                      {verifySocketID === socketID ? `(you)` : ``}
                    </StyledMessageDescription>
                    <StyledMessageDescription privateMessage>
                      { time }
                    </StyledMessageDescription>
                  </StyledMessageHeader>
                  { content }
                </StyledMessage>
              );
              break;
            default:
              element = (
                <StyledMessage key={index} otherMessage={verifySocketID !== socketID}>
                  <StyledMessageHeader>
                    { `${name} ${userIndex > 0 ? `[${userIndex}]` : ``}` }
                    <StyledMessageDescription>
                      {verifySocketID === socketID ? `(you)` : ``}
                    </StyledMessageDescription>
                    <StyledMessageDescription>
                      { time }
                    </StyledMessageDescription>
                  </StyledMessageHeader>
                  { content }
                </StyledMessage>
              );
              break;
          }

          return element;
        })
      }
    </StyledMessageArea>
  )
}

MessageArea.propTypes = {
  messages: PropTypes.array,
  onlineList: PropTypes.array,
  socketID: PropTypes.string,
};

MessageArea.defaultProps = {
  messages: [],
  onlineList: [],
  socketID: '',
};

export default MessageArea;