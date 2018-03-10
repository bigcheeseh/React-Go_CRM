import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './auth.css'

const FormItem = Form.Item;


class Auth extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }

            this.props.history.push("/")
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form onSubmit={this.handleSubmit} className="login-form" style={{margin: 'auto', width: '100%'}}>
                    <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Simple CRM</h3>
                    <FormItem >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" type="email"/>
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
