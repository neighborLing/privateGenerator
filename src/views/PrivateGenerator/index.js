import React from 'react';
import DocxUpload from './components/DocxUpload';
import JoditEditor from "jodit-react";
import { Button, message } from 'antd';
import { generate } from '../../api/PrivateGenerator';
import _ from 'lodash';
import config from '../../config/index.js';
const { baseUrl } = config;

export default class privateGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      fileName: ''
    }
  }

  fileChange = (content, fileName) => {
    this.setState({
      content,
      fileName: fileName.replace(/\..+$/, ''),
    })
  }

  download = async (type) => {
    const { content, fileName } = this.state;

    if (!content) {
      return message.warning('content is empty');
    }

    const r = await generate({
      content, type, fileName
    });
    const filePath = _.get(r, 'data.filePath', '');
    window.open(`${baseUrl}/${filePath}/download`);
  }

  contentChanged = (content) => {

  }

  render() {
    const config = {
      readonly: false,
      height: 600
    };
    const {
      content
    } = this.state;
    const handleUpdate = (content) => {
      this.setState({
        content
      })
    };
    return (
      <div>
        <DocxUpload fileChange={this.fileChange} />
        <div className="editor-wrap">
          <JoditEditor
            value={content}
            config={config}
            onBlur={handleUpdate}
            onChange={this.contentChanged}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button onClick={() => this.download('js')} style={{ marginRight: '10px' }}>Download JS</Button>
          <Button onClick={() => this.download('html')}>Download HTML</Button>
        </div>
      </div>
    )
  }
}