import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {GlobalArea} from "../styles/globals";
import {StyledOnlineHeader} from "../styles/online-area";

import OnlineList from './OnlineList';

import { socketOn, socketOff } from "../actions/socketActions";
import { updateOnlineList, privateMessage } from "../actions/userActions";

class OnlineArea extends Component {
  state = {
    onlineList: [],
  };

  componentDidMount() {
    const { user, socketOn, updateOnlineList } = this.props;

    if (!user.auth) {
      return;
    }

    socketOn({
      type: 'update_online',
      data: (data => {
        updateOnlineList(data);
      })
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps) {
      this.setState({
        onlineList: nextProps.onlineList,
      });
    }
  }

  render() {
    const { onlineList } = this.state;
    const { socketID } = this.props.user.userData;

    return (
      <GlobalArea width={'200px'}>
        <StyledOnlineHeader>
          Online List
        </StyledOnlineHeader>

        <OnlineList
          onlineList={onlineList}
          socketID={socketID}
          privateMessage={this.props.privateMessage}
          pmSocket={this.props.user.privateMessage}
        />

      </GlobalArea>
    )
  }
}

OnlineArea.propTypes = {
  updateOnlineList: PropTypes.func.isRequired,
  socketOn: PropTypes.func.isRequired,
  socketOff: PropTypes.func.isRequired,
  privateMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onlineList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  onlineList: state.user.onlineList,
});

export default connect(mapStateToProps, { socketOn, socketOff, updateOnlineList, privateMessage })(OnlineArea);