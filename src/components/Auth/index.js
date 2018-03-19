import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './auth.css'

const FormItem = Form.Item;

window.React = React;

class Auth extends Component {
    state = {
        error: false
    }

    componentWillMount = () => {
        const auth = JSON.parse(localStorage.getItem("token"))

        if(auth.token){
            this.props.checkToken(auth)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                //console.log('Received values of form: ', values);
                this.props.login(values)
            }

        });
    }
    shouldComponentUpdate(nextProps, nextState){
        
        if(nextProps.auth !== this.props.auth){


            return true
        }
        
        if(nextProps !== this.props){
            return true
        }
        return false
    }
    componentWillReceiveProps = (nextProps) =>{
        const { auth, history } = nextProps;

        if (nextProps.error && nextProps.error !== this.props.error) {

            if (typeof nextProps.error === 'string') {
                message.error(nextProps.error, 4)
            }
        }

        if(auth.login){
            history.push('/')
        }

        if (auth.error) {
            
            this.setState({error: true})
        }
    }

    componentWillUnmount = () => {
        this.setState({ error: false })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form onSubmit={this.handleSubmit} className="login-form" style={{margin: 'auto', width: '100%'}}>
                    <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Simple CRM</h3>
                    <FormItem >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" type="text"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="введите пароль" />
                        )}
                    </FormItem>
                    <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Войти
                            </Button>
                    </FormItem>
                </Form>

        );
    }
}

export default Form.create()(Auth);
