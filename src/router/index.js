import React, { Component }from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../containers/Header';
import HeaderComponent from'../components/Header/index';

import AuthContainer from '../containers/Auth';
import AuthComponent from '../components/Auth/index';

import CrmContainer from '../containers/CrmContainer';
import CrmComponent from '../components/CRM/index';

import Sider from '../containers/Sider'
import SiderSearch from '../components/SiderSearch/index'

import { isMobile } from 'react-device-detect';
import { Layout } from 'antd';
const { Content } = Layout;

class Index extends Component{
    state = {
        collapsed: isMobile,
    };
    toggle = () => {
        this.setState({
            collapsed: isMobile ? isMobile : !this.state.collapsed,
        });
    }

    render(){
      const { collapsed } = this.state;
      return(
        <Layout>
            
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => {
                                
                                return(
                                        <Layout>
                                        <Sider Layout={SiderSearch} collapsed={collapsed} />
                                            <Layout style={{ height: '100vh' }}>
                                                <Header Layout={HeaderComponent} toggle={this.toggle} collapsed={collapsed} />
                                                <Content style={{ height: '100%', padding: '2vh 0 0 0' }}>
                                                    <CrmContainer {...props} Layout={CrmComponent} />
                                                </Content>
                                            </Layout>
                                        </Layout>)
                            }}
                        />
                        <Route
                            path="/auth"
                            render={props => {
                                    return (
                                        <Layout style={{ height: '100vh', width: '100%', background: '#55555522'}}>
                                            <AuthContainer {...props} Layout={AuthComponent} />
                                        </Layout>
                                    )
                                }
                            }
                        />
                    </Switch>
                
        </Layout>
      )
    }
}

export default Index;