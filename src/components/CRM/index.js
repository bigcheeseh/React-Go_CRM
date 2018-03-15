import React, { Component } from 'react';
import Modal from 'react-modal';
import CustomerCard from './components/CustomerCard';
import CustomersTable from './components/CustomersTable';

import PropTypes from 'prop-types';

import { Layout, Menu, Icon, Alert, Input, Col, Row, Button, Upload, Tooltip } from 'antd';
import './index.css'

const { Header, Sider, Content } = Layout;
const { Search } = Input;


// function beforeUpload(file) {
//     const isLt2M = file.size / 1024 / 1024 < 4;
//     if (!isLt2M) {
//         message.error('Фото должно быть меньше 4мб!');
//     }
//     return isLt2M;
// }

// function getBase64(file, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

class CRM extends Component{
    static defaultProps = {
        contacts: []
    }
    static propTypes = {
            contacts: PropTypes.array.isRequired,
            notes: PropTypes.array.isRequired,
            links: PropTypes.array.isRequired,
            currentContact: PropTypes.object.isRequired,
            auth: PropTypes.object.isRequired,
            fetchContacts: PropTypes.func.isRequired,
            fetchContact: PropTypes.func.isRequired,
            saveContact: PropTypes.func.isRequired,
            updateContact: PropTypes.func.isRequired,
            deleteContact: PropTypes.func.isRequired,
            commonSearch: PropTypes.func.isRequired,
            uploadFile: PropTypes.func.isRequired,
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
        commonSearchValue: ''
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

        // if(!auth.login){
        //     history.push("/auth")
        // }

        
    }
    componentWillReceiveProps = (nextProps) => {
        const { auth, history } = nextProps;

        // if (!auth.login) {
        //     history.push('/auth')
        // }

    
    }
    render(){
        const { uploadFile, title, saveContact, updateContact, contacts, fetchContacts, fetchContact, auth, currentContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, notes, links, addNote, addLink, deleteNote, deleteLink } = this.props;
        const { currentContactData, updateContactBoolean, commonSearchValue } = this.state;

        return(                  
                        <div>
                            <Row style={{ margin: '0 20px 20px 20px'}}>
                                <Col xs={24} sm={24} md={16} >
                                    <Search
                                        placeholder="Поиск по всем полям"
                                        onSearch={ value => this.setState({ commonSearchValue: value }) }
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
                                        <Upload
                                                showUploadList={false}
                                                name = 'file'
                                                onChange={(file)=> console.log(file)}>
                                            <Tooltip title="выберите файл для импорта">
                                                <Button type="primary" shape="circle" icon="download" />
                                            </Tooltip> 
                                        </Upload>
                                        <Button type="primary" shape="circle" icon="tablet" />
                                        <Tooltip title="добавить контакт"> 
                                            <Button type="primary" shape="circle" icon="plus" onClick={this.openModal} />
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                            <CustomersTable auth={auth} commonSearchValue={commonSearchValue} fetchContacts={fetchContacts} contacts={contacts} openModalAndUpdate={this.openModalAndUpdate}/>
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