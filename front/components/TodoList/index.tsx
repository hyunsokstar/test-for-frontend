import { update } from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';


type Props = {
    data_for_todos: [{
        id:number,
        todo: string,
        createdAt: string
    }]
    checkHandler: any
    checked_list: [{
        id: number,
    }]
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TodoList({ data_for_todos, checkHandler, checked_list }: Props) {


    const todorow = (row: any) => {

        return (
            <div key={row.id}>
                <ListItem style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}>
                    <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} />
                    <ListItemText id={row.id} primary={row.todo} style={{textDecoration: checked_list.includes(row.id) && 'line-through' }}/>
                    <div edge="end"> {row.createdAt} </div>
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