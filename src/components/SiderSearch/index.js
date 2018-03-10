import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu, Icon, Input, Select, Button } from 'antd';
import './sider.css'
import { fieldsArray, fieldsObj } from '../CRM/components/CustomerForm/config/fields';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;


class SiderComponent extends Component{
    
    static propTypes = {
        sortContacts: PropTypes.func.isRequired,
    }
    
    state = {
        fieldsState: fieldsObj,
        collapsed: false
    }

    handleSearch = () => {

        this.props.sortContacts(this.state.fieldsState)
    }
    handleClear = () => {
        this.setState( { fieldsState: { ... fieldsObj } }, () =>  this.props.sortContacts(this.state.fieldsState) )
    }
    renderFields = () => {
        const { fieldsState } = this.state
        return fieldsArray.map((field, i) =>{
            if(i === 1){
                return (
                    <Menu.Item className="sider_select" key={i}>
                                <div style={{marginLeft:'12px'}}>
                                    <label>Группа</label>
                                </div>
                                <Select defaultValue={fieldsState[field.name]}
                                        mode="multiple" 
                                        onChange={(e)=>this.setState({ fieldsState: {...this.state.fieldsState, [field.name]: e}})} 
                                        name={field.name} 
                                        style={{ width: '100%' }}>                                 
                                            {field.content.map((group, i) => (
                                                <Option ref={group} style={{display: 'block'}} key={group} value={group}>{group}</Option>
                                                
                                            )
                                        )}      
                                </Select>
                    </Menu.Item>
                )
            }
            return (
                <Menu.Item key={i}><input value={fieldsState[field.name]} 
                                          className="menu-search" 
                                          placeholder={field.label} 
                                          name={field.name}
                                          onChange={(e)=>this.setState({ fieldsState: {...this.state.fieldsState, [field.name]: e.target.value } })}/>
                </Menu.Item>
            )
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

            >
                <div className="logo" />
                <Menu defaultOpenKeys={['sub1']}
                      mode="inline"
                      theme="dark"
                      //inlineCollapsed={false}
                      selectable={false}
                      onOpenChange={(e) => { this.state.collapsed ? e[0] = "sub1" : null; console.log(e) }}
                     
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