import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu, Icon, Input, Select, Button, message } from 'antd';
import './sider.css'
import config from '../CRM/components/CustomerForm/config/fields';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;


class SiderComponent extends Component{
    
    static propTypes = {
        sortContacts: PropTypes.func.isRequired,
    }
    
    state = {
        fieldsState: {},
        fieldsArray: [],
        collapsed: false,
        defaultGroups: [],
        selected: [],
        config:{}
    }
    componentWillMount(){
        
        const { auth } = this.props;
        
        config(auth.token).then(res => {
            this.setState({fieldsState: res.fieldsObj, fieldsArray: res.fieldsArray, config: res, defaultGroups: res.defaultGroups })
        })
    }
    handleSearch = () => {

        this.props.sortContacts(this.state.fieldsState)

    }
    handleClear = () => {

        this.setState( { fieldsState: { ...this.state.config.fieldsObj }, selected:[] })
        
    }
    componentWillReceiveProps = (nextProps) => {
    
        if (nextProps.error && nextProps.error !== this.props.error) {

            if (typeof nextProps.error === 'string') {
                message.error(nextProps.error, 4)
            }
        }
    }
    handleSelect = (e, field) => {

        this.setState({ fieldsState: { ...this.state.fieldsState, [field.name]: e }, selected: e })
    }
    renderFields = () => {
        const { fieldsState, fieldsArray,groupsDefaultNumbers, config } = this.state

        return fieldsArray.map((field, i) =>{
            if (field.name === 'group_id'){
                    return (
                            <Menu.Item className="sider_select" key={i}>
                                        <div style={{marginLeft:'12px'}}>
                                            <label>Группа</label>
                                        </div>
                                        <Select mode="multiple"
                                                ref={(s)=>this.Select = s}
                                                value={this.state.selected}
                                                onChange={(e)=>this.handleSelect(e, field)} 
                                                name={field.name} >                                 
                                                    {field.content.map((group, i) =>{
                                                        return(
                                                            <Option active={false} ref={group.id} style={{display: 'block'}} key={i} value={group.id}>{group.name}</Option>
                                                            
                                                        )
                                                    }
                                                )} 
        
                                        </Select>
                            </Menu.Item>
                        )
            } else if (field.name !== 'phone' && field.name !== 'email'){
                return (
                    <Menu.Item key={i}><input value={fieldsState[field.name]} 
                                            className="menu-search" 
                                            placeholder={field.label} 
                                            name={field.name}
                                            onChange={(e)=>this.setState({ fieldsState: {...this.state.fieldsState, [field.name]: e.target.value } })}/>
                    </Menu.Item>
                )
            }
           
        }) 
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ collapsed: nextProps.collapsed })
    }
    componentDidMount = () => {
        this.setState({collapsed: this.props.collapsed})
    }

    render(){
        
        return(
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                width={275}
                style={{height:'100vh'}}
            >
                <div className="logo" />
                <Menu defaultOpenKeys={['sub1']}
                      className="menu"
                      style={{height: '92vh', overflowY: 'auto', margin: 'auto'}}
                      mode="inline"
                      theme="dark"
                      selectable={false}
                      onOpenChange={(e) => { this.state.collapsed ? e[0] = "sub1" : null } }
                     
                      >
                    <SubMenu key="sub1" 
                             title={<span><Icon type="search"/>
                             <span>Расширенный Поиск</span></span>}>
                            
                            {this.renderFields()}

                            <Menu.Item key="12" className="search_buttons">
                                <Button className='btn' onClick={()=> this.handleClear()}>Очистить</Button>
                                <Button className='btn' type="primary" onClick={()=>this.handleSearch()}>Найти</Button>
                            </Menu.Item>

                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderComponent