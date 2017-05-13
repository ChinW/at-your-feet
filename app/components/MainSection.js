import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import '../assets/global.scss';
import TodayPage from './Today'

export default class MainSection extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
      return (
          <Content style={{ padding: '30px', marginTop: 64 }}>
              <div className="main-section">
                  <TodayPage />
              </div>
          </Content>
      );
  }
}
