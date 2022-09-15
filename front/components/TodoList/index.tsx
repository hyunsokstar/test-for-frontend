import { update } from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';


type Props = {
    data_for_todos: any
    checkHandler: any
    checked_list: [{
        id: number,
        todo: string
    }]
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TodoList({ data_for_todos, checkHandler, checked_list }: Props) {

    // console.log("checked_list : ", checked_list[0], typeof checked_list[0]);

    const todorow = (row: any) => {
        // console.log("typeof row.id", typeof row.id);



        // const rowId = row.id
        // console.log("type of row.id : ", typeof (row.id));


        return (
            <div key={row.id}>
                <ListItem style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}>


                    <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} />
                    <ListItemText id={row.id} primary={row.todo} style={{"textDecoration": checked_list.includes(row.id) && 'line-through' }}/>
                </ListItem>

                {/* <div style={{ textDecoration: checked_list.includes(row.id) && 'line-through' }}>{row.todo}</div> */}

            </div>
        )
    }

    return (
        <div>
            {data_for_todos && data_for_todos.map((row: any) => {
                return todorow(row)
            })}
        </div>
    )
}

export default TodoList