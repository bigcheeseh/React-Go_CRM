import React, { Component } from 'react';
import Modal from 'react-modal';
import CustomerCard from './components/CustomerCard';
import CustomersTable from './components/CustomersTable';

import PropTypes from 'prop-types';

import { Layout, Menu, Icon, Alert, Input, Col, Row, Button, Upload, Tooltip } from 'antd';
import './index.css'

const { Header, Sider, Content } = Layout;
const { Search } = Input;


class CRM extends Component{
    static defaultProps = {
        contacts: []
    }
    static propTypes = {
            contacts: PropTypes.array.isRequired,
            notes: PropTypes.array.isRequired,
            links: PropTypes.array.isRequired,
            files: PropTypes.object.isRequired,
            currentContact: PropTypes.object.isRequired,
            auth: PropTypes.object.isRequired,
            fetchContacts: PropTypes.func.isRequired,
            fetchContact: PropTypes.func.isRequired,
            importContacts: PropTypes.func.isRequired,
            exportContacts: PropTypes.func.isRequired,
            saveContact: PropTypes.func.isRequired,
            updateContact: PropTypes.func.isRequired,
            deleteContact: PropTypes.func.isRequired,
            commonSearch: PropTypes.func.isRequired,
            sortContacts: PropTypes.func.isRequired,
            extendedSearchValue: PropTypes.object.isRequired,
            commonSearchValue: PropTypes.object.isRequired,
            uploadFile: PropTypes.func.isRequired,
            fetchFile: PropTypes.func.isRequired,
            fetchFiles: PropTypes.func.isRequired,
            deleteFile: PropTypes.func.isRequired,
            clearFile: PropTypes.func.isRequired,
            setNotes: PropTypes.func.isRequired,
            setLinks: PropTypes.func.isRequired,
            clearNotes: PropTypes.func.isRequired,
            clearLinks: PropTypes.func.isRequired,
            addNote: PropTypes.func.isRequired,
            addLink: PropTypes.func.isRequired,
            deleteNote: PropTypes.func.isRequired,
            deleteLink: PropTypes.func.isRequired,

    }
    state = {
        modalIsOpen: false,
        collapsed: false,
        updateContactBoolean : false,
        currentContactData: null,
        exportTable: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    openModal= () => {
        this.setState({ modalIsOpen: true });
    }
    openModalAndUpdate =(contact) => {

        this.setState({ currentContactData: contact, updateContactBoolean: true }, () => this.setState({ modalIsOpen: true }));

    }

    closeModal= () => {
        this.setState({ modalIsOpen: false, currentContactData: null, updateContactBoolean: false });
    }

    componentWillMount() {
        Modal.setAppElement('body');
        const { auth, history, fetchContacts } = this.props;

        if(!auth.login){
            history.push("/auth")
        }

        
    }

    shouldComponentUpdate = (nextProps, nextState) => {
  
        if (nextProps !== this.props) {
            return true
        }

        if (nextState !== this.state) {
            return true
        }

        return false
    }
    componentWillReceiveProps = (nextProps) => {
        const { auth, history, files } = nextProps;

        if (!auth.login) {
            history.push('/auth')
        }

        if(files.excel !== this.props.files.excel){

            this.downloadLink.href = files.excel
            this.downloadLink.click()
        }
    
    }

    handleExportContacts = ()=>{


        this.setState({exportTable: !this.state.exportTable})
    }

    handleImportContacts = (upload)=> {
        const { importContacts, auth } = this.props;
        if (upload.event && upload.event.percent === 100) {
            importContacts(upload.file.originFileObj, auth.token)
        }
    }
    
    render(){
        const { extendedSearchValue, commonSearchValue, commonSearch, uploadFile, fetchFile, fetchFiles, deleteFile, clearFile, files, title, saveContact, updateContact, contacts, fetchContacts, sortContacts, fetchContact, importContacts, exportContacts, auth, currentContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, notes, links, addNote, addLink, deleteNote, deleteLink } = this.props;
        const { currentContactData, updateContactBoolean, exportTable } = this.state;

        return(                  
                        <div>
                            <div className="dashboard">
                                <Row style={{ margin: '0 20px 20px 20px'}}>
                                    <Col xs={24} sm={24} md={16} >
                                        <Search
                                            placeholder="Поиск по всем полям"
                                            onSearch={ value =>  commonSearch(value)}
                                            enterButton="Найти"
                                            style={{zIndex: 0}}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ margin: '0 20px' }} type="flex" justify="space-between">
                                    <Col lg={10} md={14} sm={24} xs={24} style={{marginBottom: '20px'}}>
                                        <Alert message={`Всего найдено контактов: ${contacts.length}`} type="info" showIcon />
                                    </Col>
                                    <Col lg={4} md={8} sm={24} xs={24} style={{ marginBottom: '20px' }}>
                                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <a ref={(a)=>this.downloadLink = a} download = "data.xlsx"/>
                                            <Upload
                                                    showUploadList={false}
                                                    name = 'file'
                                                    onChange={this.handleImportContacts}>
                                                <Tooltip title="выберите файл для импорта">
                                                    <Button type="primary" shape="circle" icon="download" />
                                                </Tooltip> 
                                            </Upload>
                                            <Tooltip title="экспорт контактов по заданным критериям поиска">
                                                <Button type="primary" shape="circle" icon="tablet" onClick={this.handleExportContacts}/>
                                            </Tooltip>
                                            <Tooltip title="добавить контакт"> 
                                                <Button type="primary" shape="circle" icon="plus" onClick={this.openModal} />
                                            </Tooltip>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <CustomersTable exportTable={exportTable} 
                                            handleExportContacts={this.handleExportContacts} 
                                            exportContacts={exportContacts} 
                                            fetchFile={fetchFile} 
                                            files={files} 
                                            auth={auth} 
                                            extendedSearchValue={extendedSearchValue} 
                                            commonSearchValue={commonSearchValue} 
                                            fetchContacts={fetchContacts} 
                                            contacts={contacts} 
                                            openModalAndUpdate={this.openModalAndUpdate}/>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                contentLabel="Customer Modal"
                                className="modal"
                                overlayClassName="overlay"
                            >   
                                <Alert message="Информация о контакте" type="info" style={{borderRadius: '3px 3px 0 0'}}/>
                                <CustomerCard style={{width: '100%', height: '100%', padding: '10px' }} 
                                              closeModal={this.closeModal}
                                              auth={auth}
                                              uploadFile={uploadFile}
                                              fetchFile={fetchFile}
                                              fetchFiles={fetchFiles}
                                              deleteFile={deleteFile}
                                              clearFile={clearFile}
                                              files={files}
                                              fetchContact={fetchContact} 
                                              saveContact={saveContact}
                                              updateContact={updateContact}
                                              deleteContact={deleteContact}
                                              updateContactBoolean ={updateContactBoolean}
                                              currentContactData={currentContactData}
                                              currentContact={currentContact}
                                              setNotes={setNotes}
                                              setLinks={setLinks}
                                              clearNotes={clearNotes}
                                              clearLinks={clearLinks}
                                              notes={notes} 
                                              links={links}
                                              addNote={addNote}
                                              addLink={addLink}
                                              deleteNote={deleteNote}
                                              deleteLink={deleteLink}/>

                            </Modal>
                        </div>

        )
    }
}


export default CRM