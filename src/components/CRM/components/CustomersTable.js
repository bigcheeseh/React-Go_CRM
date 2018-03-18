import React, { Component } from 'react';
import { Table } from 'antd';
import ReactTable from "react-table";
import TablePhotoCell from './TablePhotoCell';

import "react-table/react-table.css";

import './Table.css';


class CustomersTable extends Component{
    
    state = {
        data:[],
        pages: -1,
        loading: false
    }

   columns = () => [{
        Header: 'Фото',
        accessor: 'photo',
        width: 85,
        Cell: ({original}) => {

            return <TablePhotoCell original={original} {...this.props}/>
            
        }
        }, {
            Header: 'ФИО',
            accessor: 'name',
            width: 300,
            Cell: ({ original }) => <div style={{ cursor: 'pointer' }} className="personName">
                <p>{original.name}</p>
            </div>
        }, {
            Header: 'Группа',
            accessor: 'group_name'
        }, {
            Header: 'Индустрия',
            accessor: 'industry'
        },
        {
            Header: 'Компания',
            accessor: 'company'
        },
        {
            Header: 'Город',
            accessor: 'city'
        },
        {
            Header: 'Телефон',
            accessor: 'phone'

        }];

    componentWillReceiveProps(nextProps){


        if (nextProps.commonSearchValue && nextProps.commonSearchValue !== this.props.commonSearchValue && nextProps.commonSearchValue.any_field ) {

            this.ReactTable.props.onFetchData(this.ReactTable.state, null, nextProps.commonSearchValue, nextProps.exportTable)
        }else if (nextProps.extendedSearchValue && nextProps.extendedSearchValue !== this.props.extendedSearchValue) {

            this.ReactTable.props.onFetchData(this.ReactTable.state, null, nextProps.extendedSearchValue, nextProps.exportTable)
        }


        if (nextProps.exportTable && nextProps.commonSearchValue.any_field){

            this.ReactTable.props.onFetchData(this.ReactTable.state, null, nextProps.commonSearchValue, nextProps.exportTable)
        }else if (nextProps.exportTable){

            this.ReactTable.props.onFetchData(this.ReactTable.state, null, nextProps.extendedSearchValue, nextProps.exportTable)
        }

        if(nextProps.contacts){
            this.setState({data: nextProps.contacts, pages: nextProps.contacts.length, loading: false})
        }

      
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.data !== this.state.data){
            return true
        }
        if (nextProps.files.photo !== this.props.files.photo) {
            return true
        }
        if (nextProps.exportTable !== this.props.exportTable) {
            return true
        }

        return true
    }

    render(){
        const { openModalAndUpdate, auth, fetchContacts, exportContacts } = this.props;

        return (
            <ReactTable

                ref={(table)=> this.ReactTable = table}
                previousText={"предыдущая"}
                nextText={"следующая"} 
                loadingText= 'Загрузка...'
                noDataText= 'Контактов не найдено'
                pageText= 'Страница'
                ofText= 'из'
                rowsText= 'строк'
                pageSizeOptions = {[50]}
                defaultPageSize = {50}
                columns={this.columns()} 
                data={this.state.data}
                pages={this.state.pages}
                loading={this.state.loading}
                manual
                onFetchData={(state, instance, searchValue, exportTable) => {

                    if (auth.login) {
                        if(!exportTable){
                            this.setState({loading: true})
                            fetchContacts(auth.token, state.pageSize, state.page * state.pageSize, state.sorted, searchValue)
                        }else{

                            exportContacts(auth.token, state.sorted, searchValue)
                            this.props.handleExportContacts()
                        }
                    }
                
                }}
                
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} 
                style={{ height: "72vh"}} // This will force the table body to overflow and scroll, since there is not enough room 
                getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        // console.log('A Td Element was clicked!')
                                        // console.log('it produced this event:', e)
                                        // console.log('It was in this column:', column)
                                        // console.log('It was in this table instance:', instance)
                                        // console.log('It was in this row:', rowInfo)

                                        if (rowInfo && rowInfo.original && rowInfo.original.id){
                                            if (column.id === 'name' || column.id === 'photo'){
                                                openModalAndUpdate(rowInfo.original);
                                            }
                                        }
                                        // IMPORTANT! React-Table uses onClick internally to trigger
                                        // events like expanding SubComponents and pivots.
                                        // By default a custom 'onClick' handler will override this functionality.
                                        // If you want to fire the original onClick handler, call the
                                        // 'handleOriginal' function.
                                        if (handleOriginal) {
                                            handleOriginal()
                                        }
                                    }
                                }
                            }}
            />
        )
    }
    
}

export default CustomersTable