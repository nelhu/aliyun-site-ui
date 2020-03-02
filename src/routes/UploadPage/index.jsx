/* eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
import API from '@/services';
import {Input, Icon, message, List} from 'antd';
import {copy} from '@utils';
import('./style.postcss');

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.chooser = React.createRef();
  }
  state = {
    fileNames: '',
    urls: []
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
    const formData = new FormData();
    formData.append('timestamp', Date.now());
    fileList.forEach(file => {
      formData.append(file.name, file);
    });
    API.upload(formData).then(res => {
      console.log(res);
      this.setState({
        fileNames: '',
        urls: res.urls
      });
      message.success('上传成功', 1.5);
    });
    // .on('progress', e => {
    //   console.log(event.percent);
    // });
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
        </div>
      </div>
    );
  }
}

export default connect(state => state, {})(UploadPage);
