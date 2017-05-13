import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AYTHeader from '../components/Header';
import ATYFooter from '../components/Footer';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import { Layout} from 'antd';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)

export default class App extends Component {

  static propTypes = {

  };

  render() {
    return (
        <Layout>
            <AYTHeader />
            <MainSection />
            <ATYFooter />
        </Layout>
    );
  }
}