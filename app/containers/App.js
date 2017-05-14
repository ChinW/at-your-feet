import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AYTHeader from '../components/Header';
import ATYFooter from '../components/Footer';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import { Layout} from 'antd';
import { getHistory, getTodayHistory } from '../utils/history'
import { getDatas, saveDatas, clearStorage } from '../utils/storage'
import Landing from '../components/Landing'

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
        mode: 0, //0, 1, 2,
        justASign: false
    }
  }

  componentDidMount() {
    const storageList = getDatas()
    if (storageList.length === 0) {
        getTodayHistory().then(history => {
            saveDatas(history)
        })
    }
    setTimeout(() => {
        this.setState({
            justASign: true
        })
    }, 1500);
    console.log('storageList', storageList.length)
  }

  changeMode(item) {
    this.setState({
      mode: parseInt(item.key)
    })
  }

  render() {
      const justASign = this.state.justASign
    return (
        <Layout>
            <Landing justASign={justASign} />
            <div className={justASign ? `wrapper fade-in` : `wrapper`}>
                <AYTHeader
                    changeMode={this.changeMode}
                />
                <MainSection
                    mode={this.state.mode}
                />
                <ATYFooter />
            </div>
        </Layout>
    );
  }
}