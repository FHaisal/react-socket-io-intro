import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../validation/is-empty';

import {
  StyledMessageBox,
  StyledMessageBtnContainer,
  StyledMessageButton,
  StyledMessageContainer, StyledTypingArea
} from "../styles/message-box";

function MessageBox({ placeholder, name, value, onChange, onSubmit, typing, privatemessage }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <StyledMessageContainer onSubmit={onSubmit}>
      <StyledTypingArea>
        {
          typing.map(({name}, index) => {
            return (
              index < 5 ? `${name}, ` : undefined
            )
          })
        }{isEmpty(typing) ? '' : ` ${typing.length > 5 ? `and ${typing.length - 5} more are` : 'is'} typing...`}
      </StyledTypingArea>

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
  typing: PropTypes.array,
  privatemessage: PropTypes.bool,
};

MessageBox.defaultProps = {
  name: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: undefined,
  onSubmit: undefined,
  typing: [],
  privateMessage: false,
};

export default MessageBox;