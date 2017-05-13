import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import 'antd/dist/antd.css'
import '../assets/global.scss';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
