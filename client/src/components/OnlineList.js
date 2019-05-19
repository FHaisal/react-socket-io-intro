import React from 'react';
import PropTypes from 'prop-types';
import {StyledOnlineDescription, StyledOnlineList, StyledOnlineListItem} from "../styles/online-list";

function OnlineList({ onlineList, socketID, privateMessage, pmSocket }) {
  const onClick = (user) => {
    if ((pmSocket.socketID === user.socketID) || (user.socketID === socketID)) return privateMessage({});

    if (user.socketID !== socketID) return privateMessage({ name: user.name, socketID: user.socketID });
  };

  return (
    <StyledOnlineList>
      {
        onlineList.map((user, index) => {
          return (
            <StyledOnlineListItem key={index} onClick={onClick.bind(this, user)}>
              {`${user.name}${socketID === user.socketID ? ` [${index + 1}] (you)` : ` [${index + 1}]`}`}
              <StyledOnlineDescription>{user.socketID === pmSocket.socketID ? `(Private Messaging)` : ''}</StyledOnlineDescription>
            </StyledOnlineListItem>
          )
        })
      }
    </StyledOnlineList>
  )
}

OnlineList.propTypes = {
  onlineList: PropTypes.array,
  socketID: PropTypes.string,
  pmSocket: PropTypes.object,
  privateMessage: PropTypes.func.isRequired,
};

OnlineList.defaultProps = {
  onlineList: [],
  socketID: '',
  pmSocket: {},
};

export default OnlineList;