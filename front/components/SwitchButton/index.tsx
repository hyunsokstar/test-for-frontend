import React from 'react'
import Switch from '@mui/material/Switch';
import axios from "axios";
import api from "../../utils/api"
import { type_for_todo_row } from '../../common/type_for_todos';

type Props = {
    task_status: boolean;
    rowId: string;
    set_data_for_todos: any;
}

function SwitchButton({ task_status, rowId, data_for_todos , set_data_for_todos, setIsCompletedChangedId }: Props) {
    const [checked, setChecked] = React.useState(task_status);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("스위치 버튼 클릭");
        setChecked(event.target.checked);

        try {
            const response = await axios.post(
                `${api.milestone}/update_task_status`,
                {
                    task_status: event.target.checked,
                    _id: rowId
                },
                { withCredentials: true }
            );
            if (response.data) {
                console.log("response : ", response);
                console.log("response.data : ", response.data);

                const new_rows = data_for_todos.map((row:any)=> {
                    if(row.id === response.data.data._id){
                        // console.log("row : ", row);
                        // console.log("response.data : ", response.datad);

                        return {
                            id: response.data.data._id,
                            todo: response.data.data.task_title,
                            task_status: response.data.data.task_status,
                            started_at : new Date(response.data.data.started_at).toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
                            createdAt: new Date(response.data.data.createdAt).toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
                            elapsed_time : response.data.data.elapsed_time,                      
                            completed_at  : new Date(response.data.data.completed_at).toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase()
                            // completed_color: true,
                            // switch_button_checked : !checked
                        }

                    } else {
                        return row;
                    }
                })

                set_data_for_todos(new_rows)
            }

            // set_data_for_todos()
            // alert(response.data.data);
        } catch (error: any) {
            console.log("error : ", error);
        }


    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            // label='complete'
        />
    );
}

export default SwitchButton