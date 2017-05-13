import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import $ from 'jquery';
import '../../app/assets/global.scss'
import moment from 'moment'
import { getDatas, saveDatas, getCount, addCount, hasData } from '../../app/utils/storage.js'

moment.locale('zh-cn');

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, ALinks: [], data: {} };
}

  componentDidMount() {
      chrome.runtime.sendMessage({greeting: "hello"}, (response) => {
          const nxState = Object.assign({}, this.state)
          nxState.data = response.farewell
          this.setState(nxState)
      });
      document.onkeydown = (e) => {
          if (e.key === 'Z') {
              if (this.state.ALinks.length === 0) {
                  this.searchA()
              } else {
                  this.setState({
                      ALinks: []
                  })
              }
          }
      };
  }

  searchA() {
      let ALinks = [];
      let links = $("a");
      links.map((key) => {
          ALinks.push({
              obj: $(links[key]),
              href: $(links[key]).attr("href")
          });
          $(links[key]).bind("click", (evt) => {
              console.log(evt, $(links[key]).attr("href"))
              chrome.runtime.sendMessage({href: $(links[key]).attr("href")}, (response) => {
                  console.log(response)
              });
          })
      });
      this.setState({
          ALinks
      })
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const ALinks = this.state.ALinks;
    const data = this.state.data;
    return (
      <div>
        <div className="ayf-links">
          {
            ALinks.map((link, index) => {
                const position = link.obj.offset()
                const hasData = typeof link.href !== 'undefined' && data[link.href] !== 'undefined'  && typeof data[link.href] !== 'undefined'
                const target = hasData ? JSON.parse(data[link.href]) : {}
              return (
                <div
                  key={index} 
                  className={hasData ? 'ayf-link-item active' : 'ayf-link-item'}
                  style={{
                    top: position.top + 15,
                    left: position.left
                  }}
                >
                  {hasData ? `访问${target.visitCount}次: 最后访问于${moment(target.lastVisitTime).fromNow()}` : '未访问'}
                </div>
              )
            })
          }
        </div>
        <button onClick={this.buttonOnClick}>
          Open TodoApp
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});
