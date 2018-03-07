import React, { Component }from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../containers/Header';
import HeaderComponent from'../components/Header/index';

import CrmContainer from '../containers/CrmContainer';
import CrmComponent from '../components/CRM/index';

import Sider from '../containers/Sider'
import SiderSearch from '../components/SiderSearch/index'

import { Layout } from 'antd';
const {  Content } = Layout;

class Index extends Component{
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
      const { collapsed } = this.state;
      return(
        <Layout>
            <Sider Layout={SiderSearch} collapsed={collapsed}/>
            <Layout style={{ height: '100vh'}}>
                <Header Layout={HeaderComponent} toggle={this.toggle} collapsed={collapsed}/>
                <Content style={{ height: '100%', padding: '2% 0 0 0' }}>
                    <Switch>
                        <Route
                            path="/"
                            render={props => (
                            <CrmContainer {...props} Layout={CrmComponent} />
                            )}
                        />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
      )
    }
}

export default Index;