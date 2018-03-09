import React, { Component } from 'react';
import { Upload, message, Button, Icon, Progress } from 'antd';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  
};

class Files extends Component{
  state = {
      application: [],
      applicationUploadPercent: 0,
      esse: [],
      esseUploadPercent: 0,
      files: []
  }
  componentWillMount = () => {
        const { currentContactData } = this.props;

        if(currentContactData){
            if(currentContactData.application){
                this.setState({application: [currentContactData.application],applicationUploadPercent: 100})
            }
            if(currentContactData.esse){
                this.setState({esse: [currentContactData.esse], esseUploadPercent: 100})
            }
            if(currentContactData.files){
                this.setState({files: currentContactData.files})
            }
        }
  }

  handleSubmit = () => {
        const { updateContactBoolean, saveContact, updateContact } = this.props
        const { application, esse,  applicationUploadPercent, esseUploadPercent } = this.state;

            if(applicationUploadPercent > 0 && applicationUploadPercent < 100 || esseUploadPercent > 0 && esseUploadPercent < 100){
                message.error('Файл ещё не загружен');
            }else if (!updateContactBoolean ){

                saveContact({application: application[0], esse: esse[0]})
            }else{
                updateContact({application: application[0], esse: esse[0]})
            }
        
  }
  upload = (info, doc, percent) =>{
    console.log(info)

    if (info.file.status !== 'uploading') {

      this.setState({[percent]: info.file.percent})
    }
    if (info.file.originFileObj) {

      this.setState({[doc]: [info.file.originFileObj]})
    }
  }

  uploadFile = (doc, percent, name) => (
    <div>
            <Upload {...props} 
                    onChange={(info) => this.upload(info, doc, percent)} 
                    fileList={this.state[doc]}
                    onRemove={()=> this.setState({[doc]: [], [percent]: 0})}
                    style={{width:'75%'}}>
                <Button style={{width:'100%'}}>
                    <Icon type="upload" />{name}
                </Button>
                <Progress style={{width:'100%'}}
                          percent={Math.ceil(this.state[percent])} />
            </Upload>
     </div>
  )
  uploadFiles = (info) => {
      if (info.file.status !== 'uploading') {
        //console.log(info.file, info.fileList);

      }
      if (info.file.originFileObj) {
           this.setState({files: info.fileList })
      }
  }
  componentWillUnmount=()=>{
            const { handleCurrentContactData } = this.props;
            const { application, esse, files, applicationUploadPercent, esseUploadPercent } = this.state;
            if(applicationUploadPercent > 0 && applicationUploadPercent < 100 || esseUploadPercent > 0 && esseUploadPercent < 100){
                message.error('Файл не был загружен до конца.');
                this.setState({esseUploadPercent: 0, applicationUploadPercent: 0})
            }else{
                handleCurrentContactData({application: application[0], esse: esse[0], files})
            }
    }
  render(){
    const { applicationUploadPercent, application } = this.state;
    return(
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <div className="list" style={{width: '250px', justifyContent: 'space-around'}}>
                <div>
                    {this.uploadFile('application', 'applicationUploadPercent', 'Форма заявки')}
                </div>
                <div>
                    {this.uploadFile('esse', 'esseUploadPercent', 'Эссе')}
                </div>
            </div>
            <div style={{width: '380px'}}>
                <p style={{marginBottom: '10px', textAlign: 'center'}}>Файлы контакта</p>
                <div className="listBox" style={{marginBottom: '10px'}}>
                    <Upload {...props} 
                            onChange={(info) => this.uploadFiles(info)}
                            fileList={this.state.files}
                            style={{width:'75%'}}>
                        <Button style={{width:'100%'}}>
                            <Icon type="upload" /> Добавить файл
                        </Button>
                        
                    </Upload>
                </div>
            </div>
        </div>
    )
  }
}

export default Files