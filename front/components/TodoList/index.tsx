import { update } from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'

type Props = {
    data_for_todos: any
    checkHandler: any
    checked_list : [{
        id:number,
        todo: string
    }]
}


function TodoList({ data_for_todos, checkHandler, checked_list }: Props) {

    console.log("checked_list : ", checked_list[0], typeof checked_list[0]);

    const todorow = (row: any) => {
        console.log("typeof row.id", typeof row.id);
        


        const rowId = row.id
        console.log("type of row.id : ", typeof(row.id));
        
       
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }} key={row.id}>
                <div>
                    <input type="checkbox" id={row.id} onClick={checkHandler} key={row.id} />
                </div>
                
                <div style={{ textDecoration: checked_list.includes(row.id) && 'line-through' }}>{row.todo}</div>
            </div>
        )
    }

    return (
        <div>
            {data_for_todos.map((row: any) => {
                return todorow(row)
            })}
        </div>
    )
}

export default TodoList