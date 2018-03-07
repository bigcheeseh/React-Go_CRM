import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon, Button } from 'antd';

const { TextArea } = Input;


class Notes extends React.Component {
    state = {
        tags: ['Unremovable', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: '',
    };

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div style={{minHeight: '300px'}}>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 350;
                    const tagElem = (
                        <Tag style={{width: '100%', margin: '5px'}} key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 350)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
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
                        <Button type="primary" onClick={this.handleInputConfirm}>Добавить</Button>
                    </div>
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        color="geekblue"
                        style={{ borderStyle: 'dashed', margin: '10px' }}
                    >
                        <Icon type="plus" /> Добавить Заметку
          </Tag>
                )}
            </div>
        );
    }
}

export default Notes