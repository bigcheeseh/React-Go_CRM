import React, { Component } from 'react';
import { Checkbox, Icon, Tooltip } from 'antd';


class File extends Component{
    state={
        download: false
    }
    removeFile = ()=>{
        const { deleteFile, auth, id, item } = this.props;

        deleteFile(item.name, auth.token, id)
    }

    downloadFile = () => {
         const { auth, id, fetchFile, item} = this.props;

         fetchFile(item.name, 'FILE', auth.token, id)
         this.setState({download: true})
    }

    shouldComponentUpdate = (nextProps, nextState) =>{
        if(nextState !== this.state){
            return true
        }
        if(nextProps.file !== this.props.file){
            return true
        }

         if(nextProps.item !== this.props.item){
            return true
        }


        return false
    }
    componentWillReceiveProps = (nextProps) => {
        const { auth, id, file, item } = nextProps;
        const { download } = this.state

        if(file && file.name === item.name && download){
             
            this.downloadLink.href = file.url
            this.downloadLink.click()

            this.setState({download: false})
        }
    
    }

    render(){
        const { item } = this.props
        return (
            <div>
                <a ref={(a)=>this.downloadLink = a} download={item.name}/>
                <div style={{ width: "100%", padding: '0 0 10px 10px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ width: "90%", boxSizing: 'border-box', overflowWrap: 'break-word' }}>{item.name}</div>
                    <Tooltip title="скачать файл">
                        <Icon type="download" onClick={this.downloadFile} className="download_item sign"/>
                    </Tooltip>
                    <Tooltip title="удалить файл">
                        <Icon type="delete" onClick={this.removeFile} className="delete_item sign"/>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default File