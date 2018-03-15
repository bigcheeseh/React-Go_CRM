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

const dateFormat = 'MM-DD-YY'

class CustomerForm extends React.Component {
    state = {
        loading: false,
        imageUrl: null,
        currentContactData: null,

    }
    handleSubmit = (e) => {
        
        e ? e.preventDefault() : null;
        const { currentContactData } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                    
                values.notes = this.props.currentContact.notes;
                values.links = this.props.currentContact.links;
                values.group_id = groups.indexOf(values.group_name) + 1;
                values.birth_date = moment(values.birth_date).format(dateFormat);                  
                //values.photo.url = this.state.imageUrl;
                this.props.updateContact(values)


            }else{
                message.error(err);
            }
        });
    }
    normFile = (e) => {
        //console.log('Upload event:', e);
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
        const { currentContactData } = this.state;

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

    componentWillReceiveProps=(nextProps)=>{
        console.log(nextProps, 'current user')
    }

    handleCurrentUserImage = () => {
        const { currentContactData } = this.state;

        this.setState({ imageUrl: currentContactData.photo.url})
        
        return currentContactData.photo.url
    }
    componentWillMount = () => {
        const { currentContactData } = this.props;

        this.setState({currentContactData: currentContactData})

        if (currentContactData && currentContactData.photo && currentContactData.photo.url) {
            this.setState({ imageUrl: currentContactData.photo.url })
        }
    }
    componentDidMount = () => {
        if(!this.props.updateContactBoolean){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);

                        // if (this.state.imageUrl) {
                        //     if (!values.photo) {
                        //         values.photo = currentContactData.photo;
                        //     }
                        //     values.photo.url = this.state.imageUrl;
                        // }

                        values.group_id = groups.indexOf(values.group_name) + 1;
                        values.birth_date = moment(values.birth_date).format(dateFormat);

                        this.props.saveContact(values)
                }

            })
        }
    }
    componentWillUnmount = () =>{
        const { handleCurrentContactData, currentContact } = this.props;
        const { currentContactData } = this.state;

        const values = this.props.form.getFieldsValue();

        values.birth_date = moment(values.birth_date).format(dateFormat);
        
        // if (this.state.imageUrl && values.photo) {
        //     values.photo.url = this.state.imageUrl;
        // }else if(currentContactData){
        //     values.photo = currentContactData.photo
        // }

        handleCurrentContactData(values)
        
    }

    handleAvatarChange = (avatar)=>{
        const { uploadFile, auth, id } = this.props;
        console.log(avatar)

        if (avatar.event && avatar.event.percent === 100){
            uploadFile(avatar.file.originFileObj, 'photo', 'contact_photo', auth.token, id)
        }
    }
   
    render() {
        const { getFieldDecorator, onValuesChange } = this.props.form;
        const { currentContactData } = this.state;
        const { auth, id } = this.props;
       

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
                                    name="contact-photo"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}

                                    onChange={this.handleAvatarChange}
                                >
                                {this.state.imageUrl  ? <img src={this.state.imageUrl} style={{width: 'inherit', maxHeight: '125px'}} alt="" /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                    </Col>
                    
                    {this.standartField(fields.name, 21)}
                    {this.standartField(fields.phone, 18)}
                    {this.standartField(fields.email, 18)}
                    
                    <Col xs={24} sm={24} md={24} lg={10}>
                        <FormItem
                            {...formItemLayout}
                            label="Группа"
                        >
                            {getFieldDecorator('group_name', {
                                rules: [
                                    { message: 'Выберите группу' },
                                ],
                                initialValue: currentContactData ? currentContactData.group_name : groups[0]
                            })(
                                <Select >
                                    {groups.map((group, i) => (
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
                            {getFieldDecorator('birth_date', {
                                rules: [{ type: 'object', message: 'Дата рождения!' }],
                                initialValue: currentContactData ? moment(currentContactData.birth_date, dateFormat) : moment('01-27-68', dateFormat)
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </FormItem>

                    </Col>
                    {this.standartField(fields.city, 20)}
                </Row>
                
                    {/* <FormItem
                     style={{display: 'flex', justifyContent: 'flex-end'}}
                    >   
                        <Button style={{marginRight: '10px'}} onClick={()=>this.props.closeModal()}>Отмена</Button>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                    </FormItem> */}
            
            </Form>
        );
    }
}


export default Form.create()(CustomerForm)
