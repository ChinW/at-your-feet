import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import '../assets/global.scss';
import TodayPage from './Today'
import HistoryPage from './History'

export default class MainSection extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
    this.switchPage = this.switchPage.bind(this)
  }

  switchPage() {
      console.log('switchPage', this.props.mode)
      switch(this.props.mode) {
          case 0:
          return <TodayPage />;
          break;
          case 1:
          return <HistoryPage />;
          break;
    }
  }

  render() {
      console.log(this.props.mode)
      return (
          <Content style={{ padding: '30px', marginTop: 64 }}>
              <div className="main-section">
                  {this.switchPage()}
              </div>
          </Content>
      );
  }
}
