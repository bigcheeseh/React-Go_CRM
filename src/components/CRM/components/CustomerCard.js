import React, { Component } from 'react';
import { Card, Alert, Button } from 'antd';
import CustomerForm from './CustomerForm/CustomerForm.js'
import Notes from './Notes/Notes'
import Links from './Links/Links'
import Files from './Files/Files'

import uniqid from 'uniqid'

import './CustomerCard.css'

const tabList = [{
    key: 'main',
    tab: 'Основные сведения',
}, {
    key: 'files',
    tab: 'Файлы',
}, {
    key: 'notes',
    tab: 'Заметки',
}, {
    key: 'links',
    tab: 'Ссылки',
}];

class CustomerCard extends Component {
    state = {
        titleKey: 'main',
        currentContactData: null,
        contact: {},
        contactId: 0,
        photo: ''
    }
    onTabChange = (key) => {
        
        this.setState({ titleKey: key });
    }

    componentWillMount = () => {

        const { currentContactData, fetchFile, auth } = this.props;

        if (currentContactData) {

            this.setState({ contactId: currentContactData.id })
        }
        
        this.setState({currentContactData: this.props.currentContactData})
    }

    handleCurrentContactData = (data) => {
        this.setState({ currentContactData: {...this.state.currentContactData, ...data} })
    }

    saveContact = (values) => {
        const { contact, currentContactData } = this.state;
        const { auth } = this.props;

        this.setState({ contact: {...contact, ...currentContactData, ...values } }, ()=>{ 

            this.props.saveContact(this.state.contact, auth.token)
        })
    }

    updateContact = (values) => {
        const { contact, currentContactData } = this.state;
        const { auth, currentContact } = this.props;
        let { id } = currentContact;

        if(!id){
            id  = currentContactData.id
        }

        this.setState({ contact: {...contact, ...currentContactData, ...values} }, ()=>{ 
   
            this.props.updateContact(this.state.contact, auth.token, id)
            this.props.closeModal()
        })
    }
    handleDeleteContact = () => {

        const { auth, closeModal, deleteContact } = this.props

        let confirm = window.confirm("Удалить Контакт?")

        if(confirm){
            deleteContact(auth.token, this.state.contactId);
            closeModal()
        }
    }
    closeModal = () => {
        const { updateContactBoolean, currentContact, deleteContact, auth } = this.props

        if (!updateContactBoolean){
            deleteContact(auth.token, currentContact.id)
        }
        this.props.closeModal()
    }
    content = () => {
        const { files, fetchFiles, fetchFile, uploadFile, deleteFile, clearFile, updateContactBoolean, currentContact, auth, fetchContact, clearNotes, clearLinks, notes, links, addNote, addLink, deleteNote, deleteLink } = this.props
        const { currentContactData, contactId, contact } = this.state

        const cardPageProps = { id: contactId, currentContact, auth, fetchContact, clearLinks, clearNotes, notes, links, addNote, addLink, deleteNote, deleteLink, saveContact: this.saveContact, updateContact: this.updateContact, handleCurrentContactData: this.handleCurrentContactData, currentContactData, updateContactBoolean }
        return {
            main:  <CustomerForm {...cardPageProps}
                          wrappedComponentRef={(form) => this.cardPage = form}
                          uploadFile={uploadFile}
                          clearFile={clearFile}
                          fetchFile={fetchFile}
                          photo={files.photo}
                          uploaded={files.uploaded}
                          loading={files.loading}/>,
            notes: <Notes {...cardPageProps}
                          name="notes"
                          closeModal={this.props.closeModal}
                          ref={(notes) => this.cardPage = notes}/>,
            files: <Files {...cardPageProps}
                          uploadFile={uploadFile}
                          files={files.fileList}
                          file={files.file}
                          uploaded={files.uploaded}
                          fetchFiles={fetchFiles}
                          fetchFile={fetchFile}
                          deleteFile={deleteFile}
                          name="files"
                          ref={(files) => this.cardPage = files}/>,
            links: <Links {...cardPageProps}
                          name="links"
                          closeModal={this.props.closeModal}
                          ref={(links) => this.cardPage = links}/>,
        };
    }
    shouldComponentUpdate = (nextProps, nextState) =>{
        if(nextProps !== this.props){
            return true
        }


        if(nextState !== this.state){
            return true
        }

        return false
    }
    componentWillReceiveProps = (nextProps) =>{
        const {notes, links, setNotes, setLinks } = this.props

        if(nextProps.currentContact.notes && nextProps.currentContact.notes !== this.props.currentContact.notes && this.cardPage.props.name === 'notes'){
            setNotes(nextProps.currentContact.notes)
        }

        if (nextProps.currentContact.links && nextProps.currentContact.links !== this.props.currentContact.links && this.cardPage.props.name === 'links') {
            setLinks(nextProps.currentContact.links)
        }


        if (nextProps.currentContact && nextProps.currentContact !== this.props.currentContact) {
            this.setState({ contactId: nextProps.currentContact.id })
        }
    }
    
    componentWillUnmount = () => {

        this.setState({ currentContactData: null })
    }


    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%', height: '100%', position: 'relative', zIndex: '100' }}
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key); }}
                >
                    {this.content()[this.state.titleKey]}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <div>
                            {this.props.updateContactBoolean ? <Button type="danger" onClick={() => this.handleDeleteContact()}>Удалить Контакт</Button> : null}
                        </div>
                        <div>
                            <Button style={{ marginRight: '10px' }} onClick={() => this.closeModal()}>Отмена</Button>
                            <Button type="primary" onClick={() => this.cardPage.handleSubmit()}>Сохранить</Button>
                            
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default CustomerCard