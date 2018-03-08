import React from 'react';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input, Col, Row, message, DatePicker
} from 'antd';
import moment from 'moment';
import uniqid from 'uniqid'

import { fields, groups } from './config/fields';
import './form.css'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

function beforeUpload(file) { 
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
        message.error('Фото должно быть меньше 4мб!');
    }
    return isLt2M;
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


class CustomerForm extends React.Component {
    state = {
        loading: false,
        imageUrl: null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = uniqid();
                console.log('Received values of form: ', values);
                if(this.state.imageUrl) {
                    values.photo.url = this.state.imageUrl;
                }
                this.props.saveContact(values)
                //this.props.closeModal()
            }else{
                message.error(err);
            }
        });
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (e.file.status === 'uploading') {
                 this.setState({ loading: true });
                 return 'uploading';
        }

        if (e.file.originFileObj){
            getBase64(e.file.originFileObj, imageUrl => {

                this.setState({
                    imageUrl,
                    loading: false,
                })

            });

            return e.file.originFileObj
        }
    }
    standartField = (field, wrapperSpan) => {
        const { getFieldDecorator } = this.props.form;
        const { currentContactData } = this.props;

        return (
            <Col xs={24} sm={24} md={field.smallWindowSize} lg={field.size}>
                <FormItem
                    {...{ labelCol: { sm: 6, md: 6, lg: (24 - wrapperSpan) }, wrapperCol: { sm: 18, md: 18, lg: wrapperSpan } } }
                    label={field.label}
                >
                    {getFieldDecorator(field.name, {
                        rules: [
                            { message: field.placeholder},
                        ],
                        initialValue: currentContactData ? currentContactData[field.name] : '' 
                    })(
                        <Input name={field.name} placeholder={field.placeholder} type={field.type} />
                    )}
                </FormItem>
            </Col>
        )
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps, this.props)
    //     const { currentContactData } = nextProps
    //     if(currentContactData && currentContactData.id){
    //         console.log(currentContactData.photo.url)
    //         this.setState({ imageUrl: currentContactData.photo.url})
    //     }
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { currentContactData } = this.props;
        let currentUserImageUrl = null;

        if (currentContactData && currentContactData.photo && currentContactData.photo.url){
            currentUserImageUrl = currentContactData.photo.url
        } 

        const formItemLayout = {
            labelCol: { lg: 6, md: 6, sm: 6 },
            wrapperCol: { sm: 18, md: 18, lg: 18 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Фото</div>
            </div>
        );
        const dateFormat ='DD/MM/YYYY'
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={4}>
                        <FormItem
                            {...formItemLayout}
                        >
                            {getFieldDecorator('photo', {
                                valuePropName: 'file',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}

                                    onChange={this.handleAvatarChange}
                                >
                                {this.state.imageUrl || currentUserImageUrl ? <img src={this.state.imageUrl ? this.state.imageUrl : currentUserImageUrl} style={{width: 'inherit', maxHeight: '125px'}} alt="" /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                    </Col>
                    
                    {this.standartField(fields.personName, 21)}
                    {this.standartField(fields.tel, 18)}
                    {this.standartField(fields.email, 18)}
                    
                    <Col xs={24} sm={24} md={24} lg={10}>
                        <FormItem
                            {...formItemLayout}
                            label="Группа"
                        >
                            {getFieldDecorator('group', {
                                rules: [
                                    { message: 'Выберите группу' },
                                ],
                                initialValue: currentContactData ? currentContactData.group : groups[0]
                            })(
                                <Select >
                                    {groups.map(group => (
                                            <Option key={group} value={group}>{group}</Option>
                                        )
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    
                    </Col>
                    {this.standartField(fields.industry, 16)}
                    {this.standartField(fields.company, 18)}
                    {this.standartField(fields.position, 18)}
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <FormItem
                            {...{ labelCol: { sm: 6, md: 6, lg: 8 }, wrapperCol: { sm: 18, md: 18, lg: 16 } }}
                            label="Дата Рождения"
                        >
                            {getFieldDecorator('date', {
                                rules: [{ type: 'object', message: 'Дата рождения!' }],
                                initialValue: currentContactData ? currentContactData.date : moment('27/01/1968', dateFormat)
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </FormItem>

                    </Col>
                    {this.standartField(fields.city, 20)}
                </Row>
               
                
              
                
                
                    <FormItem
                     style={{display: 'flex', justifyContent: 'flex-end'}}
                    >   
                        <Button style={{marginRight: '10px'}} onClick={()=>this.props.closeModal()}>Отмена</Button>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                    </FormItem>
            
            </Form>
        );
    }
}


export default Form.create()(CustomerForm)
