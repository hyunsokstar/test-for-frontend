import React from 'react'
import { type_for_todo_row } from "../../common/type_for_todos"
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


type Props = {
    data_for_todos: [type_for_todo_row]
    checkHandler: any
    checked_list: [{
        id: string | number,
    }]
    delete_handler: () => void
    set_data_for_todos: () => void
}

function ToDoColumns({ data_for_todos, checkHandler, checked_list, delete_handler, set_data_for_todos }: Props) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                verticalAlign: "middle",
                backgroundColor:"#0372CD",
                color:"white"
                // textDecoration: checked_list.includes(row.id) && "line-through"
            }}
        // key={row.id}

        >
            <div style={{ width: "200px" }}>
                <Checkbox  onClick={checkHandler}  />
            </div>

            <div style={{ width: "200px" }} >todo</div>
            <div style={{ width: "200px" }}>
                완료 여부
            </div>

            <div style={{ width: "200px" }} > 시작 </div>
            <div style={{ width: "200px" }} > 경과 </div>
            <div style={{ width: "200px" }} > 완료 </div>

            <div style={{ width: "50px" }}>
                삭제
            </div>
        </div>
    )
}

export default ToDoColumns