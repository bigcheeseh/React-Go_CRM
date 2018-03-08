import React from 'react';
import { Table } from 'antd';

import ReactTable from "react-table";
import "react-table/react-table.css";



const columns = [{
    Header: 'Фото',
    accessor: 'photo',
    width: 85,
    Cell: ({ original }) => <div style={{cursor: 'pointer'}}>
                              <img 
                                width="100%" 
                                height="55px"
                                style={{objectFit: 'cover'}} 
                                src={original.photo && original.photo.url ? original.photo.url : 'data:image/png;base64,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'} />
                            </div>
},{
    Header: 'ФИО',
    accessor: 'personName',
    width: 300,
        Cell: ({ original }) => <div style={{ cursor: 'pointer'}} className="personName">
                                    <p>{original.personName}</p>
                                </div>
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


const CustomersTable = ({contacts, openModalAndUpdate})=>{
    
        return (
            <ReactTable 
                columns={columns} 
                data={contacts} 
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} 
                style={{ height: "72vh"}} // This will force the table body to overflow and scroll, since there is not enough room 
                getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        console.log('A Td Element was clicked!')
                                        console.log('it produced this event:', e)
                                        console.log('It was in this column:', column)
                                        console.log('It was in this table instance:', instance)
                                        console.log('It was in this row:', rowInfo)

                                        if (rowInfo && rowInfo.original && rowInfo.original.id){
                                            if (column.id === 'personName' || column.id === 'photo'){
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

export default CustomersTable