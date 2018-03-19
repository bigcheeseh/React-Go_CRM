import React, { Component } from 'react';
import { Upload, message, Button, Icon, Progress, List, Col, Row } from 'antd';

import File from './FileItem'

const API = 'https://simplecrmonline.cloud/api'
const props = {
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  
};
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

class Files extends Component{
  state = {
      contact_application: [],
      applicationUploadPercent: 0,
      contact_esse: [],
      esseUploadPercent: 0,
      fileUploadPercent: 0,
      files: [],
      checked: false
  }
  componentWillMount = () => {
        const { currentContactData, auth, id, fetchFiles } = this.props;

        fetchFiles(auth.token, id);
        
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
  componentWillReceiveProps = (nextProps)=>{
    const { auth, id, fetchFiles } = this.props;

    if(nextProps.files !== this.state.files){
        this.setState({files: nextProps.files})
    }
    if(nextProps.uploaded && nextProps.uploaded !== this.props.uploaded){
        fetchFiles(auth.token, id);
    }
  }
  shouldComponentUpdate =(nextProps, nextState)=>{
     if(nextState!== this.state ){
         return true
     }

    if(nextProps.file !== this.props.file){
            return true
    }

    if(nextProps.files !== this.props.files){
            return true
    }

    if(nextProps.uploaded !== this.props.uploaded){
            return true
    }

    return false
  }

  handleSubmit = () => {
        const { updateContactBoolean, saveContact, updateContact } = this.props
        const { application, esse,  applicationUploadPercent, esseUploadPercent } = this.state;

            if(applicationUploadPercent > 0 && applicationUploadPercent < 100 || esseUploadPercent > 0 && esseUploadPercent < 100){
                message.error('Файл ещё не загружен');
            }else if (!updateContactBoolean ){

                saveContact()
            }else{
                updateContact()
            }
        
  }
  upload = (info, doc, percent) =>{
    const { auth, id, uploadFile } = this.props;

    if(info.event && info.event.percent){
        this.setState({[percent]: info.event.percent})
    }

    if (info.event && info.event.percent === 100){
        this.normFile(info, doc)       
    }
  }
  normFile = (e, doc) => {
        const { auth, id, uploadFile } = this.props;
        if (e.file.originFileObj){
            //this.setState({[doc]: [e.fileList]})
            uploadFile(e.file.originFileObj, e.file.originFileObj.name, doc, auth.token, id)
        }
    }
  uploadFile = (doc, percent, name) => {

    return (
            <div>
                <Upload name= 'file'
                        onChange={(info) => this.upload(info, doc, percent)}
                        showUploadList ={false}
                        // onRemove={()=> this.setState({[doc]: [], [percent]: 0})}
                        style={{width:'75%'}}>
                    <Button style={{width:'100%'}}>
                        <Icon type="upload" />{name}
                    </Button>
                    <Progress style={{width:'100%'}}
                            percent={Math.ceil(this.state[percent])} />
                </Upload>
            </div>
    )
  }
  uploadFiles = (info) => {
      
      this.upload(info, null, 'fileUploadPercent')
  }
  
  componentWillUnmount=()=>{
            const { handleCurrentContactData } = this.props;
            const { application, esse, files, applicationUploadPercent, esseUploadPercent } = this.state;
            if(applicationUploadPercent > 0 && applicationUploadPercent < 100 || esseUploadPercent > 0 && esseUploadPercent < 100){
                message.error('Файл не был загружен до конца.');
                this.setState({esseUploadPercent: 0, applicationUploadPercent: 0})
            }else{
                //handleCurrentContactData({application: application[0], esse: esse[0], files})
            }
  }
  render(){
    const { applicationUploadPercent, application, files } = this.state;
    const { deleteFile, auth, id, fetchFile } = this.props;
    return(
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Col md={9} sm={24} xs={24}>
                <div className="list" style={{ justifyContent: 'space-around' }}>
                    <div>
                        {this.uploadFile('contact_application', 'applicationUploadPercent', 'Форма заявки')}
                    </div>
                    <div>
                        {this.uploadFile('contact_esse', 'esseUploadPercent', 'Эссе')}
                    </div>
                </div>
            </Col>
            <Col md={14} sm={24} xs={24}>
                <p style={{marginBottom: '10px', textAlign: 'center'}}>Файлы контакта</p>
                <div className="listBox" style={{marginBottom: '10px'}}>
                    <Upload  
                            onChange={(info) => this.uploadFiles(info)}
                            style={{width:'75%'}}
                            showUploadList ={false }>
                        <Button style={{width:'100%'}}>
                            <Icon type="upload" /> Добавить файл
                        </Button>
                        <Progress style={{width:'100%'}}
                          percent={Math.ceil(this.state.fileUploadPercent)} />
                    </Upload>
                    <div className="list">
                            <List
                                itemLayout="vertical"
                                dataSource={files}
                                renderItem={file => (
                                    <List.Item>
                                        {/* <Note item={item} handleCheckChange={this.handleCheckChange}/> */}
                                        <File item={{ name: file }} file={this.props.file} deleteFile={deleteFile} fetchFile={fetchFile} auth={auth} id={id}/>
                                    </List.Item>
                                )}
                            />
                    </div>
                </div>
            </Col>
        </div>
    )
  }
}

export default Files