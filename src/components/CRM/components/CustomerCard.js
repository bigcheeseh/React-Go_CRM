import React, { Component } from 'react';
import { Card, Alert } from 'antd';
import CustomerFrom from './CustomerForm/CustomerForm.js'
import Notes from './Notes/Notes.js'
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

const content = ({closeModal, saveContact}) =>{ 

    //console.log(props)
    return {
            main: <CustomerFrom closeModal={closeModal} saveContact={saveContact}/>,
            files: <p>customer files</p>,
            notes: <Notes />,
            links: <p>customer links</p>
    };
}

class CustomerCard extends Component {
    state = {
        titleKey: 'main',
    }
    onTabChange = (key) => {
        
        this.setState({ titleKey: key });
    }
    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%', height: '100%', position: 'relative', zIndex: '100' }}
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key); }}
                >
                    {content(this.props)[this.state.titleKey]}
                </Card>
            </div>
        );
    }
}

export default CustomerCard