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
        checked: false
    };

     componentWillMount = () => {
        const { currentContactData } = this.props;

        if(currentContactData && currentContactData.links){

            this.setState({links: currentContactData.links})
        }
     }
    handleSubmit = () => {
        const { updateContactBoolean, saveContact, updateContact } = this.props
        const { links } = this.state;
        if (!updateContactBoolean){
            saveContact({links})
        }else{
            updateContact({links})
        }
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    handleCheckChange = () => {

        this.setState({checked: true})
    }
   

    handleInputConfirm = (e) => {

        e.preventDefault()

        const state = this.state;
        const { link, linkName, prefix } = state;
        let links = state.links;
        if(!link && !linkName){
             this.setState({
                inputVisible: false,
            });
        }else if (link && linkName) {
            const item = {}
            
            item.link = prefix + link;
            item.name = linkName
            item.checked = false

            links = [...links, item];

            this.setState({
                links,
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
        const nonChekedLinks = this.state.links.filter(link => !link.checked)
        this.setState({links: [...nonChekedLinks]})
    }
    selectBefore = () => (
        <Select ref="prefix" defaultValue="https://" style={{ width: 90 }} onChange={(e)=>this.setState({prefix: e})}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
        );

    componentWillUnmount=()=>{
           const { handleCurrentContactData } = this.props;
           const { links } = this.state;

           handleCurrentContactData({links})
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