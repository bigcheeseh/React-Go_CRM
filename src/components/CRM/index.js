import React, { Component } from 'react';
import Modal from 'react-modal';
import CustomerCard from './components/CustomerCard';
import CustomersTable from './components/CustomersTable';

import PropTypes from 'prop-types';

import { Layout, Menu, Icon, Alert, Input, Col, Row, Button, Upload, notification } from 'antd';
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
        saveContact: PropTypes.func.isRequired,
    }
    state = {
        modalIsOpen: false,
        collapsed: false,
    };
    toggle = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    }
    openModal= () => {
        this.setState({ modalIsOpen: true });
    }


    closeModal= () => {
        this.setState({ modalIsOpen: false });
    }

    
    render(){
        const { title, saveContact, contacts } = this.props;
       
        return(                  
                        <div>
                            <Row style={{ margin: '0 20px 20px 20px'}}>
                                <Col xs={24} sm={24} md={16} >
                                    <Search
                                        placeholder="Поиск по всем полям"
                                        onSearch={value => this.props.commonSearch(value)}
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
                                            <Button type="primary" shape="circle" icon="download" />
                                        </Upload> 
                                        <Button type="primary" shape="circle" icon="tablet" title="выберите файл для импорта"/> 
                                        <Button type="primary" shape="circle" icon="plus" onClick={this.openModal} />
                                    </div>
                                </Col>
                            </Row>
                            <CustomersTable contacts={contacts}/>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                contentLabel="Customer Modal"
                                style={{
                                    overlay: {
                                        width: '100%',
                                    },
                                    content: {
                                        width: '60vw',
                                        height: '85vh',
                                        margin: 'auto',
                                        padding: 0,
                                        overflow: 'auto',
                                        background: 'rgba(255,255,255,0)',
                                        border: 'none'
                                    }
                                }}
                            >   
                                <Alert message="Информация о контакте" type="info" style={{borderRadius: 0}}/>
                                <CustomerCard style={{
                                    width: '100%', height: '100%' }} closeModal={this.closeModal} saveContact={saveContact} />
                            
                            </Modal>
                        </div>

        )
    }
}


export default CRM