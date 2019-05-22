import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../validation/is-empty';
import {StyledTypingArea} from "../styles/user-is-typing";

function UserIsTyping({ typing }) {
  return (
    <StyledTypingArea>
      {
        typing.map(({name}, index) => {
          return (
            index < 5 ? `${name}, ` : undefined
          )
        })
      }{isEmpty(typing) ? '' : ` ${typing.length > 5 ? `and ${typing.length - 5} more are` : 'is'} typing...`}
    </StyledTypingArea>
  );
}

UserIsTyping.propTypes = {
  typing: PropTypes.array,
};

UserIsTyping.defaultProps = {
  typing: [],
};

export default UserIsTyping;