import React, { PropTypes, Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content } = Layout;

const logo = require('../../chrome/assets/img/icon-128.png')
export default class AYTHeader extends Component {

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
        <Header style={{ position: 'fixed', width: '100%' }}>
            <div className="logo" />
            <Menu
              onClick={this.props.changeMode}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['0']}
                style={{ lineHeight: '64px' }}
            >
                <div key="logo" className="logo-menu">
                    <img src={logo} alt=""/>
                </div>
                <Menu.Item key="0" >今日</Menu.Item>
                <Menu.Item key="1" >自定义/历史</Menu.Item>
                <Menu.Item key="2" >设置</Menu.Item>
            </Menu>
        </Header>
    );
  }
}
