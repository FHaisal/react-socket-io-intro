import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from '../validation/is-empty';

import {GlobalArea} from "../styles/globals";
import MessageArea from './MessageArea';
import MessageBox from './MessageBox';

import { socketEmit, socketOn, socketOff } from "../actions/socketActions";

class ChatArea extends Component {
  state = {
    messagebox: '',
    messages: [],
    peopleTyping: [],
    privateMessage: {},
    placeholder: '',
  };

  componentDidMount() {
    const { socketOn, user } = this.props;

    if (!user.auth) {
      return;
    }

    socketOn({
      type: 'message',
      data: (data) => {
        this.setState({
          messages: [data, ...this.state.messages],
        });
      },
    });

    socketOn({
      type: 'typing',
      data: (data) => {
        const { peopleTyping } = this.state;
        if (peopleTyping.some(e => e.socketID === data.socketID)) {
          return;
        }
        this.setState({
          peopleTyping: [...this.state.peopleTyping, data],
        });
      },
    });

    socketOn({
      type: 'stop typing',
      data: (data) => {
        const { peopleTyping } = this.state;

        this.setState({
          peopleTyping: peopleTyping.filter(user => user.socketID !== data.socketID),
        });
      },
    });
  }

  componentWillUnmount() {
    const { socketOff, user } = this.props;

    if (!user.auth) {
      return;
    }
    socketOff({
      type: 'message',
    });
    socketOff({
      type: 'typing',
    });
    socketOff({
      type: 'stop typing',
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps) {
      this.setState({
        privateMessage: nextProps.privateMessage,
        placeholder: isEmpty(nextProps.privateMessage) ? `Typing to everybody...` : `Typing to ${nextProps.privateMessage.name}...`,
      });
    }
  }

  onChange = e => {
    const { socketEmit, user } = this.props;
    const userData = {
      name: user.userData.name,
      socketID: user.userData.socketID,
    };

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (isEmpty(e.target.value)) {
      socketEmit({
        type: 'stop typing',
        data: userData,
      });
      return;
    }

    socketEmit({
      type: 'typing',
      data: userData,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { socketEmit } = this.props;
    const { name, socketID } = this.props.user.userData;
    const { messagebox, privateMessage } = this.state;

    if(isEmpty(messagebox)) {
      return;
    }

    const messageData = {
      time: `${new Date().toLocaleTimeString().substring(0, 5)} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`,
      name,
      content: messagebox.trim(),
      socketID,
    };

    if (isEmpty(privateMessage)) {
      socketEmit({
        type: 'message',
        data: messageData,
      });
    } else {
      messageData.type = 'private_message';
      messageData.privateMessage = privateMessage;

      socketEmit({
        type: 'private message',
        data: {
          privateMessage: privateMessage,
          content: messageData,
        },
      });
    }

    this.setState({
      messagebox: '',
      messages: [messageData, ...this.state.messages],
    });

    socketEmit({
      type: 'stop typing',
      data: { name, socketID },
    });
  };

  render() {
    const { user } = this.props;
    const { messagebox, messages, peopleTyping, privateMessage, placeholder } = this.state;

    return (
      <GlobalArea width={'600px'}>
        <MessageArea
          messages={messages}
          verifySocketID={user.userData.socketID}
          onlineList={user.onlineList}
        />

        <MessageBox
          name={'messagebox'}
          placeholder={placeholder}
          value={messagebox}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          typing={peopleTyping}
          privatemessage={!isEmpty(privateMessage)}
        />
      </GlobalArea>
    )
  }
}

ChatArea.propTypes = {
  user: PropTypes.object.isRequired,
  socketEmit: PropTypes.func.isRequired,
  socketOn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  privateMessage: state.user.privateMessage,
});

export default connect(mapStateToProps, { socketEmit, socketOn, socketOff })(ChatArea);