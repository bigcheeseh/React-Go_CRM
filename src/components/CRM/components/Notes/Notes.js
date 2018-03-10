import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon, Button, List, Checkbox } from 'antd';
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
        const { currentContactData } = this.props;

        if(currentContactData && currentContactData.notes){

            this.setState({notes: currentContactData.notes})
        }
     }
    handleSubmit = () => {
        const { updateContactBoolean, saveContact, updateContact } = this.props
        const { notes } = this.state;

        if (!updateContactBoolean ){

            saveContact({notes})
        }else{
            updateContact({notes})
        }
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
        const state = this.state;
        const inputValue = state.inputValue;
        let notes = state.notes;
        if (inputValue) {
            const note = {}
            
            note.content = inputValue;
            note.date = moment().format('DD.MM.YYYY HH:mm');
            note.checked = false

            notes = [...notes, note];
        }

        this.setState({
            notes,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input
    removeCheckedNotes = () => {

        const nonChekedNotes = this.state.notes.filter(note => !note.checked)


        this.setState({notes: [...nonChekedNotes]})
    }

    componentWillUnmount=()=>{
           const { handleCurrentContactData } = this.props;
           const { notes } = this.state;

           handleCurrentContactData({notes})
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
                        <div style={{margin: '10px', display: 'flex', justifyContent: 'space-between'}}>
                            <TextArea
                                ref={this.saveInputRef}
                                type="text"
                                style={{ width: '75%' }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}

                            />
                            <Button type="primary" shape="circle" icon="plus" onClick={this.handleInputConfirm}/>
                        </div>
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