import React, { useState } from 'react'
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { type_for_todo_row } from "../../common/type_for_todos"
import { Switch } from '@material-ui/core';
import SwitchButton from '../SwitchButton';

//
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


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
    delete_handler: () => void
    set_data_for_todos: () => void
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoList({ data_for_todos, checkHandler, checked_list, delete_handler, set_data_for_todos }: Props) {


    const todorow = (row: type_for_todo_row) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", verticalAlign: "middle", textDecoration: checked_list.includes(row.id) &&  "line-through"  }} key={row.id}>
                <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} />
                <ListItemText id={row.id} primary={row.todo} style={{ textDecoration: checked_list.includes(row.id) && 'line-through' }} />
                <div style={{ width: "200px" }}>
                    <SwitchButton task_status={row.task_status} rowId={row.id} data_for_todos={data_for_todos} set_data_for_todos={set_data_for_todos} />
                </div>

                <div style={{ width: "200px" }} > {row.started_at ? row.started_at : ""} </div>
                <div style={{ width: "200px" }} > {row.task_status ? row.elapsed_time + "분" : "미정"} </div>
                <div style={{ width: "200px" }} > {row.task_status ? row.completed_at : "uncompleted"} </div>

                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={() => delete_handler(row.id)} />
                    </IconButton>
                </Tooltip>
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