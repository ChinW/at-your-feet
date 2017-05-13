import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import $ from 'jquery';
import '../../app/assets/global.scss'

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, ALinks: [] };
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      console.log(e)
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
    var ALinks = [];
    $("a").each(function() {
      ALinks.push({
        obj: $(this),
        href: $(this).attr("href")
      });
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
    return (
      <div>
        <div className="ayf-links">
          {
            ALinks.map((link, index) => {
              const position = link.obj.offset()
              return (
                <div
                  key={index} 
                  className="ayf-link-item" 
                  style={{
                    top: position.top + 15,
                    left: position.left
                  }}
                >
                  {link.href}
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
