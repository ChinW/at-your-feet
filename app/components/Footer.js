import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

export default class ATYFooter extends Component {

  static propTypes = {

  };

  constructor(props, context) {
      super(props, context);

  }

  render() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Built by Passenger Team in HackNanjing, 2017
        </Footer>
    );
  }
}
