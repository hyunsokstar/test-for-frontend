import React from 'react'
import Switch from '@mui/material/Switch';
import axios from "axios";
import api from "../../utils/api"

type Props = {
    task_status: boolean;
    rowId: string
}

function SwitchButton({ task_status, rowId }: Props) {
    const [checked, setChecked] = React.useState(task_status);

    console.log("rowId : ", rowId);


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
                console.log("response.data : ", response.data);
            }

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