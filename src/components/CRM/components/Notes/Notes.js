import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon, Button, List, Checkbox, Form } from 'antd';
import Note from './NoteItem';

import moment from 'moment';

const { TextArea } = Input;
const IconText = Icon.Text;

class Notes extends Component {
    state = {
        notes: [],
        inputVisible: false,
        inputValue: '',
        checked: false
    };

    componentWillMount = () => {
        const { currentContact, currentContactData, fetchContact, auth } = this.props;
        

        fetchContact(auth.token, this.props.id)
       
    }
    handleSubmit = () => {
        this.props.closeModal()
    }

    showInput = () => {

        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    handleCheckChange = () => {
        this.setState({checked: true})
    }
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {

        const {addNote, auth, currentContact, currentContactData, id} = this.props
        const state = this.state;
        const inputValue = state.inputValue;
        // const id = state.contactId;

        if (inputValue) {
            const note = {}
            
            note.text = inputValue;

            addNote(note, auth.token, id)
            
        }

        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input
    removeCheckedNotes = () => {
        const { deleteNote, auth, currentContact, currentContactData, id } = this.props
        // const id = this.state.contactId;

        const chekedNotes = this.state.notes.filter(note => note.checked)

        chekedNotes.map(note=>{
            deleteNote(auth.token, id, note.id)
        })

    }

    componentWillReceiveProps=(nextProps)=>{

        if(nextProps.notes && nextProps.notes !== this.state.notes){
            this.setState({notes: nextProps.notes})
        }
    }

    shouldComponentUpdate = (nextProps, nextState)=>{

        if(nextState !== this.state){
            return true
        }
       
        return false
    }

    componentWillUnmount=()=>{
        this.props.clearNotes()
    }

    render() {
        const { notes, inputVisible, inputValue } = this.state;

        return (
            <div className="list">
                <div className="listBox">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={notes}
                        renderItem={item => (
                            <List.Item>
                                <Note item={item} handleCheckChange={this.handleCheckChange}/>
                            </List.Item>
                        )}
                    />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    {inputVisible && (
                        <Form onSubmit={this.handleInputConfirm}>
                            <div style={{margin: '10px', display: 'flex', justifyContent: 'space-between'}}>
                                <TextArea
                                    ref={this.saveInputRef}
                                    type="text"
                                    style={{ width: '75%' }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}

                                />
                                <Button type="primary" shape="circle" icon="plus" onClick={this.handleInputConfirm}/>
                            </div>
                        </Form>
                    )}
                    {!inputVisible && (
                        <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <Tag
                                onClick={this.showInput}
                                color="geekblue"
                                style={{ borderStyle: 'dashed', margin: '10px' }}
                            >
                                <Icon type="plus" /> Добавить Заметку
                            </Tag>
                            <Button type="danger" disabled={notes.filter(note => note.checked).length < 1} ghost onClick={this.removeCheckedNotes}>Удалить Заметки</Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Notes