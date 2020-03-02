import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    animate: PropTypes.bool,
    showReloadBtn: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    const {animate, message, showReloadBtn, children} = this.props;

    return (
      <div className="com-loading flex center middle">
        <div className={`com-loading-content${animate ? ' com-loading-animate' : ''}`}>
          <span>{message || '努力加载中...'}</span>
          <div className="child">
            {showReloadBtn && (
              <a href="javascript: window.location.reload()" className="btn btn-blue btn-sm">
                重新加载
              </a>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
