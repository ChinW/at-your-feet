import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import '../assets/global.scss';
import TodayPage from './Today'
import HistoryPage from './History'
import Setting from './Setting'

export default class MainSection extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
    this.switchPage = this.switchPage.bind(this)
  }

  switchPage() {
      switch(this.props.mode) {
          case 0:
                return <TodayPage />;
          break;
          case 1:
                return <HistoryPage />;
                break;
          case 2:
              return <Setting />;
          break;
    }
  }

  render() {
      return (
          <Content style={{ padding: '30px', marginTop: 64 }}>
              <div className="main-section">
                  {this.switchPage()}
              </div>
          </Content>
      );
  }
}
