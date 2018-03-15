import React, { Component } from 'react';
import { Tag, Input, Form, Icon, Button, List, Checkbox, Select, message } from 'antd';
import Link from './LinkItem';

const { Option }= Select;





class Links extends Component {
    state = {
        links: [],
        inputVisible: false,
        link: '',
        linkName: '',
        prefix: 'https://',
        checked: false,
        contactId: 0
    };

    componentWillMount = () => {
        const { currentContact, currentContactData, fetchContact, auth } = this.props;


        fetchContact(auth.token, this.props.id)

    }
    handleSubmit = () => {
    
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    handleCheckChange = () => {

        this.setState({checked: true})
    }
   

    handleInputConfirm = (e) => {

        e.preventDefault()
        const { addLink, auth, currentContact, currentContactData, id } = this.props
        const state = this.state;
        const { link, linkName, prefix } = state;
        let links = state.links;
        if(!link && !linkName){
             this.setState({
                inputVisible: false,
            });
        }else if (link && linkName) {
            const item = {}
            
            item.name = linkName
            item.addr = prefix + link;

            addLink(item, auth.token, id)
            this.setState({
                inputVisible: false,
                link: '',
                linkName: ''
            });
        }else{
            message.error('Введите название ссылки и адрес');
        }

        
    }

    saveInputRef = input => this.input = input
    removeCheckedLinks = () => {
        const { deleteLink, auth, id } = this.props
        // const id = this.state.contactId;

        const chekedLinks = this.state.links.filter(links => links.checked)

        chekedLinks.map(link => {
            deleteLink(auth.token, id, link.id)
        })

    }
    selectBefore = () => (
        <Select ref="prefix" defaultValue="https://" style={{ width: 90 }} onChange={(e)=>this.setState({prefix: e})}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
        );
    componentWillReceiveProps = (nextProps) => {

        console.log(nextProps.links)

        if (nextProps.links && nextProps.links !== this.state.links) {
            this.setState({ links: nextProps.links })
        }
    }
    componentWillUnmount = () => {
        this.props.clearLinks()
    }
    shouldComponentUpdate = (nextProps, nextState) => {

            if (nextState !== this.state) {
                return true
            
            }
            return false
    }
    render() {
        const { inputVisible, links, link, linkName, prefix } = this.state;

        return (
            <div className="list">
                <div className="listBox">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={links}
                        renderItem={item => (
                            <List.Item>
                                <Link item={item} handleCheckChange={this.handleCheckChange}/>
                            </List.Item>
                        )}
                    />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    {inputVisible && (
                        <Form onSubmit={this.handleInputConfirm}
                              style={{margin: '10px', display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '75%'}}>
                                <Input 
                                    placeholder="Название ссылки" 
                                    type="text"
                                    value={linkName}
                                    onChange={(e) => this.setState({ linkName: e.target.value })}
                                    style={{marginBottom: '10px'}}/>
                                <Input
                                    addonBefore={this.selectBefore()}
                                    addonAfter={<Icon type="link" />}
                                    placeholder="адрес ссылки"
                                    ref={this.saveInputRef}
                                    type="text"
                                    value={link}
                                    onChange={(e) => { this.setState({ link: e.target.value }); }} 
                                    />
                            </div>
                            <Button type="primary" htmlType="submit" shape="circle" icon="plus" onClick={this.handleInputConfirm}/>
                        </Form>
                    )}
                    {!inputVisible && (
                        <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <Tag
                                onClick={this.showInput}
                                color="geekblue"
                                style={{ borderStyle: 'dashed', margin: '10px' }}
                            >
                                <Icon type="plus" /> Добавить Ссылку
                            </Tag>
                            <Button type="danger" disabled={links.filter(links => links.checked).length < 1} ghost onClick={this.removeCheckedLinks}>Удалить Ссылки</Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Links