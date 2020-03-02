/* eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
// import API from '@/services';
import superagent from 'superagent';
import {Input, Icon, message, List, Progress} from 'antd';
import {copy} from '@utils';
import('./style.postcss');

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.chooser = React.createRef();
  }
  state = {
    fileNames: '',
    urls: [],
    percent: 0
  };
  trigger = () => {
    if (this.chooser) {
      this.chooser.current.click();
    }
  };
  reset = () => {
    this.setState({fileNames: ''});
  };
  handleOnChange = e => {
    const fileList = Array.prototype.slice.call(e.target.files, 0);
    console.log(fileList);
    e.target.value = '';
    const fileNames = fileList.reduce((acc, file) => (acc += `${file.name}; `), '');
    this.setState({fileNames});
    this.upload(fileList);
  };
  upload = fileList => {
    const request = superagent.post('/api/upload').field('time', Date.now());
    fileList.forEach(file => {
      request.attach(file.name, file);
    });
    request
      .on('progress', e => {
        this.setState({percent: event.percent});
      })
      .then(res => {
        const urls = res.body.data.urls;
        console.log(urls);
        this.setState({
          fileNames: '',
          urls,
          percent: 0
        });
        message.success('上传成功', 1.5);
      });
  };
  render() {
    return (
      <div className="page page-upload">
        <br />
        <Input
          addonAfter={
            <span onClick={this.trigger}>
              <Icon type="folder-open" />
            </span>
          }
          placeholder="暂未选择任何文件"
          value={this.state.fileNames}
          disabled
        />
        <input id="file_chooser" multiple type="file" ref={this.chooser} onChange={this.handleOnChange} />
        <div className="urls">
          {this.state.urls.length > 0 && (
            <List
              bordered
              dataSource={this.state.urls}
              renderItem={item => <List.Item onClick={() => copy(item)}>{item}</List.Item>}
            />
          )}
          {this.state.percent > 0 && (
            <Progress
              percent={this.state.percent}
              strokeColor={{
                from: '#108ee9',
                to: '#87d068'
              }}
              percent={99.9}
              status="active"
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => state, {})(UploadPage);
