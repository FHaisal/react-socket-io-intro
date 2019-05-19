import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from '../validation/is-empty';
import { updateUser } from "../actions/userActions";

import {GlobalContainer} from "../styles/globals";
import {StyledNameInput, StyledNameButton, StyledNameForm} from "../styles/name-page";

class NamePage extends Component {
  state = {
    name: '',
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { updateUser, history } = this.props;
    const { name } = this.state;

    if (!isEmpty(name)) {
      updateUser(this.state);
      history.push('/chat');
    }
  };

  render() {
    const { name } = this.state;

    return (
      <GlobalContainer>
        <StyledNameForm onSubmit={this.onSubmit} width={'300px'} height={'undefined'}>
          <StyledNameInput
            placeholder={'Enter a name...'}
            name={'name'}
            value={name}
            onChange={this.onChange}
          />

          <StyledNameButton>
            Enter Chat!
          </StyledNameButton>
        </StyledNameForm>
      </GlobalContainer>
    );
  }
}

NamePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateUser })(NamePage);
