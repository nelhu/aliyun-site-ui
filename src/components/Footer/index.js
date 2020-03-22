import React from 'react';
import './style.less';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="right">
          <div className="container">
            <span>项目由作者nelson-hu所有</span>
            <br />
            <a className="police-record" href="https://github.com/nelhu/aliyun-site-ui" target="_blank">
              <span>Github</span>
              <i className="icon-police-record" />
            </a>
            <span>有问题请联系：xuezierhu@gmailcom</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
