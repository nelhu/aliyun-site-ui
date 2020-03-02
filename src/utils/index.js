import {message} from 'antd';

export const copy = text => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('Copy');
  textArea.remove();
  message.success('复制成功', 1.5);
};
