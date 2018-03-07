import React from 'react';
import { Table } from 'antd';

import ReactTable from "react-table";
import "react-table/react-table.css";

const columns = [{
    Header: 'ФИО',
    accessor: 'personName'
}, {
    Header: 'Группа',
    accessor: 'group'
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
    accessor: 'tel'
    
}];


const CustomersTable = ({contacts})=>{
    
        return (
            <ReactTable columns={columns} data={contacts} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} style={{
                height: "72vh" // This will force the table body to overflow and scroll, since there is not enough room
            }}/>
        )
    
}

export default CustomersTable