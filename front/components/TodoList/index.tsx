import React, { useState } from 'react'
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { type_for_todo_row } from "../../common/type_for_todos"
import { Switch } from '@material-ui/core';
import SwitchButton from '../SwitchButton';

export interface todo_type_for_list {
    id: string | number;
    todo: string;
    createdAt: string
    task_status: string
}


type Props = {
    data_for_todos: [type_for_todo_row]
    checkHandler: any
    checked_list: [{
        id: string | number,
    }]
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoList({ data_for_todos, checkHandler, checked_list }: Props) {
    // console.log("checked_list : ", checked_list);

    const todorow = (row: type_for_todo_row) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-around" }} key={row.id}>
                <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} style={{ color: "#FC6E6F" }} />
                <ListItemText id={row.id} primary={row.todo} style={{ textDecoration: checked_list.includes(row.id) && 'line-through', flex: 3 }} />
                <ListItemText style={{ flex: 1, textAlign: "middle" }}>
                    <SwitchButton task_status={row.task_status} rowId = {row.id} />
                </ListItemText>
                <div edge="end" style={{ float: "right", marginRight: "10px" }}> {row.createdAt} </div>
            </div>
        )
    }

    return (
        <div>
            {data_for_todos && data_for_todos.map((row: todo_type_for_list) => {
                return (
                    <List>
                        {todorow(row)}
                    </List>
                )
            })}
        </div>
    )
}

export default TodoList