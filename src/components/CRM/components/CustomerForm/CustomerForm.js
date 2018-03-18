import React from 'react';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input, Col, Row, message, DatePicker
} from 'antd';
import moment from 'moment';
import uniqid from 'uniqid'

import config from './config/fields';
import './form.css'


const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

function beforeUpload(file) { 
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
        message.error('Фото должно быть меньше 1мб!');
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
        imageName:'',
        currentContactData: null,
        fields:{},
        groups:[],
        groupsName:{},
        groupsId:{}

    }
    handleSubmit = (e) => {
        const { groups, groupsName } = this.state
        e ? e.preventDefault() : null;
        const { currentContactData } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                values.group_id = groupsName[values.group_name]
                values.birth_date = moment(values.birth_date).format(dateFormat);                  
                //values.photo.url = this.state.imageUrl;
                this.props.updateContact(values)


            }else{
                message.error(err);
            }
        });
    }
    normFile = (e) => {

        if (e.file.originFileObj){
            getBase64(e.file.originFileObj, imageUrl => {

                this.setState({
                    imageName: e.file.name,
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
        const { id, auth, fetchFile, currentContactData } = this.props;

        if(nextProps.photo){
 
            this.setState({ imageUrl: nextProps.photo[id] })    
        }

         if(nextProps.uploaded){
            fetchFile(this.state.imageName, 'PHOTO', auth.token, id);
         }

         if(nextProps.loading!==this.state.loading){
            this.setState({loading: nextProps.loading})
         }
    }

    // handleCurrentUserImage = () => {
    //     const { currentContactData } = this.state;

    //     this.setState({ imageUrl: currentContactData.photo.url})
        
    //     return currentContactData.photo.url
    // }
    componentWillMount = () => {
        const { currentContactData, auth, id, fetchFile } = this.props;

        config(auth.token)
            .then(res => {
                this.setState({fields: res.fields, groups: res.groups, groupsName: res.groupsName, groupsId: res.groupsId })
            })

        this.setState({currentContactData: currentContactData})

        if (currentContactData && currentContactData.photo){

            fetchFile(currentContactData.photo, 'PHOTO', auth.token, id)
            this.setState({loading: true})
        }
    }
    componentDidMount = () => {
        const { groups } = this.state
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
        const { handleCurrentContactData, currentContact, clearFile } = this.props;
        const { currentContactData, fields } = this.state;

        //clearFile('PHOTO')

        const values = this.props.form.getFieldsValue();

        values.birth_date = moment(values.birth_date).format(dateFormat);
        
        if (this.state.imageName) {
             values.photo = this.state.imageName;
        }

        handleCurrentContactData(values)
        
    }

    handleAvatarChange = (avatar)=>{
        const { uploadFile, auth, id } = this.props;
        if (avatar.event && avatar.event.percent === 100){
            this.normFile(avatar)
      
            uploadFile(avatar.file.originFileObj, avatar.file.originFileObj.name, 'contact_photo', auth.token, id)
        }
    }
   
    render() {
        const { getFieldDecorator, onValuesChange } = this.props.form;
        const { currentContactData, fields, groups, groupsId } = this.state;
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
        
        if(groups.length > 0 ){
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={4}>
                            <FormItem
                                {...formItemLayout}
                            >
                                
                                    <Upload
                                        name="contact-photo"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}

                                        onChange={this.handleAvatarChange}
                                    >
                                    {this.state.imageUrl && !this.state.loading ? <img src={this.state.imageUrl} style={{width: 'inherit', maxHeight: '125px'}} alt="" /> : uploadButton}
                                    </Upload>

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
                                    initialValue: currentContactData ? groupsId[currentContactData.group_id] : groups[0].name
                                })(
                                    <Select >
                                        {groups.map((group, i) => (
                                                <Option key={i} type="number" value={group.name}>{group.name}</Option>
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
        }else{
            return(
                <p>Загрузка...</p>
            )
        }
    }
}


export default Form.create()(CustomerForm)
