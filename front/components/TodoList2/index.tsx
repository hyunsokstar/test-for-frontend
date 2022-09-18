import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {type_for_todo_row} from "../../common/type_for_todos"

export interface todo_type_for_list {
    id: string | number;
    todo: string;
    createdAt: string
}


type Props = {
    data_for_todos: [{
        id: string | number,
        todo: string,
        createdAt: string
    }]
    checkHandler: any
    checked_list: [{
        id: string | number,
    }]
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TodoList({ data_for_todos, checkHandler, checked_list }: Props) {

    const todorow = (row: type_for_todo_row) => {
        console.log("typeof row.id : ",typeof row.id);
        

        return (
            <div key={row.id}>
                <ListItem style={{ display: "flex", justifyContent: "flex-start" , color: checked_list.includes(row.id) && "lightgray"}}>
                    <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} style={{color:"#FC6E6F"}}/>
                    <ListItemText id={row.id} primary={row.todo} style={{ textDecoration: checked_list.includes(row.id) && 'line-through' }} />
                    <div edge="end"> {row.createdAt} </div>
                </ListItem>
            </div>
        )
    }

    return (
        <div>
            {data_for_todos && data_for_todos.map((row: todo_type_for_list) => {
                return todorow(row)
            })}
        </div>
    )
}

export default TodoList