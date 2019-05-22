import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledMessageBox,
  StyledMessageBtnContainer,
  StyledMessageButton,
  StyledMessageContainer,
} from "../styles/message-box";

function MessageBox({ placeholder, name, value, onChange, onSubmit, privatemessage }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <StyledMessageContainer onSubmit={onSubmit}>
      <StyledMessageBox
        rows={1}
        maxRows={8}
        tabIndex={1}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        autoFocus
        privatemessage={privatemessage.toString()}
      />

      <StyledMessageBtnContainer>
        <StyledMessageButton>
          Send
        </StyledMessageButton>
      </StyledMessageBtnContainer>
    </StyledMessageContainer>
  );
}

MessageBox.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  privatemessage: PropTypes.bool,
};

MessageBox.defaultProps = {
  name: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: undefined,
  onSubmit: undefined,
  privateMessage: false,
};

export default MessageBox;