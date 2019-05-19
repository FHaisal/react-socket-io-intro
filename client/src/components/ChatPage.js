import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {GlobalContainer} from "../styles/globals";
import ChatArea from '../components/ChatArea';
import OnlineArea from '../components/OnlineArea';

class ChatPage extends Component {
  componentDidMount() {
    const { history, user } = this.props;

    if (!user.auth) {
      history.push('/');
    }
  }

  render() {
    return (
      <GlobalContainer>
        <ChatArea />
        <OnlineArea />
      </GlobalContainer>
    );
  }
}

ChatPage.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ChatPage);
