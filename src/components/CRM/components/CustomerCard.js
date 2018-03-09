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
        contact: {}
    }
    onTabChange = (key) => {
        
        this.setState({ titleKey: key });
    }

    componentWillMount = () => {

        this.setState({currentContactData: this.props.currentContactData})
    }

    handleCurrentContactData = (data) => {
        this.setState({ currentContactData: {...this.state.currentContactData, ...data} })
    }

    saveContact = (values) => {
        const { contact, currentContactData } = this.state;
        values.id = uniqid()
        this.setState({ contact: {...contact, ...currentContactData, ...values } }, ()=>{ 
            console.log(this.state.contact)    
            this.props.saveContact(this.state.contact)
            this.props.closeModal()
        })
    }

    updateContact = (values) => {
        const { contact, currentContactData } = this.state; 
        this.setState({ contact: {...contact, ...currentContactData, ...values} }, ()=>{ 
            console.log(this.state.contact)    
            this.props.updateContact(this.state.contact)
            this.props.closeModal()
        })
    }
    content = () => {
        const { updateContactBoolean } = this.props
        const { currentContactData } = this.state

        const cardPageProps = { saveContact: this.saveContact, updateContact: this.updateContact, handleCurrentContactData: this.handleCurrentContactData, currentContactData, updateContactBoolean }
        return {
            main: <CustomerForm {...cardPageProps}
                                wrappedComponentRef={(form) => this.cardPage = form}/>,
            notes: <Notes {...cardPageProps}
                          ref={(notes) => this.cardPage = notes}/>,
            files: <Files {...cardPageProps} 
                          ref={(files) => this.cardPage = files}/>,
            links: <Links {...cardPageProps}
                          ref={(links) => this.cardPage = links}/>,
        };
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
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button style={{ marginRight: '10px' }} onClick={() => this.props.closeModal()}>Отмена</Button>
                        <Button type="primary" onClick={() => this.cardPage.handleSubmit()}>Сохранить</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default CustomerCard