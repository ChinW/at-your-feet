import React, { PropTypes, Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content } = Layout;

export default class AYTHeader extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

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
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">今日</Menu.Item>
                <Menu.Item key="2">自定义/历史</Menu.Item>
                <Menu.Item key="3">设置</Menu.Item>
            </Menu>
        </Header>
    );
  }
}
