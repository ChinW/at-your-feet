import React, { Component, PropTypes } from 'react';

export default class Landing extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);
    this._logo = require('../../chrome/assets/img/logo.png')
  }

  render() {
      return (
         <div className={this.props.justASign ? "landing fade-out" : "landing"}>
            <div className="landing-wrapper">
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
            </div>
             {/*<img src={this._logo} alt=""/>*/}
         </div>
      );
  }
}
