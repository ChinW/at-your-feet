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

  constructor(props) {
    super(props)
    this.changeMode = this.changeMode.bind(this)
    this.state = {
      mode: 0 //0, 1, 2
    }
  }

  changeMode(item) {
    console.log('changeMode', item)
    this.setState({
      mode: parseInt(item.key)
    })
  }

  render() {
    return (
        <Layout>
            <AYTHeader
              changeMode={this.changeMode}
             />
            <MainSection
              mode={this.state.mode}
             />
            <ATYFooter />
        </Layout>
    );
  }
}