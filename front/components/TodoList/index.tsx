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
import axios from "axios";
import api from "../../utils/api"


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
    delete_handler : () => void
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoList({ data_for_todos, checkHandler, checked_list , delete_handler}: Props) {
    // console.log("checked_list : ", checked_list);
    // const delete_handler = async (id: string | number) => {
    //     console.log("delete button id : ", id);

    //     const response = await axios.post(
    //         `${api.milestone}/delete_row_for_task_management_table`,
    //         { id_for_delete: id },
    //         { withCredentials: true }
    //     );
    //     console.log("response : ", response);
    //     console.log("response.data.data : ", response.data.data);

    // }

    const todorow = (row: type_for_todo_row) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }} key={row.id}>
                <ListItemText>
                    <Checkbox {...label} id={row.id} onClick={checkHandler} key={row.id} style={{ color: "#FC6E6F" }} />
                </ListItemText>
                <ListItemText id={row.id} primary={row.todo} style={{ textDecoration: checked_list.includes(row.id) && 'line-through', flex: 3 }} />
                <ListItemText style={{ flex: 1, textAlign: "middle" }}>
                    <SwitchButton task_status={row.task_status} rowId={row.id} />
                </ListItemText>
                <ListItemText>
                    <div edge="end" style={{ flex: "4", float: "right", marginRight: "10px" }}> {row.createdAt} </div>
                </ListItemText>
                <ListItemText style={{ flex: 0.5, }}>
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon onClick={() => delete_handler(row.id)} />
                        </IconButton>
                    </Tooltip>
                </ListItemText>
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