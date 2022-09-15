import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import MonthWeekDateNum from '../MonthWeekDateNum'
import Button from '@mui/material/Button';


type Props = {
    task_of_number: number;
    clearButtonHandler: any
}


function TodoHeader({ task_of_number, clearButtonHandler }: Props) {
    const [dayOfWeekIndex, setDaysOfTheWeekIndex] = useState<number>(0);
    const [utc_datetime, set_utc_datatime] = useState<number>(0);

    useEffect(() => {
        getHeaderInfoFromUrl()
    }, [])

    const getHeaderInfoFromUrl = async () => {
        const url = `http://worldtimeapi.org/api/timezone/Asia/Seoul`

        try {
            const response = await axios.get(url);
            console.log("response : ", response);
            console.log("day_of_week : ", response.data.day_of_week);
            console.log("response.data.utc_datetime : ", response.data.utc_datetime);

            if (response.data) {
                setDaysOfTheWeekIndex(response.data.day_of_week);
                set_utc_datatime(response.data.utc_datetime);
            }

        } catch (error) {

        }
    }

    return (
        <>
            {/* <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />
            </head> */}

            <div style={{ display: "flex", justifyContent: "space-between", border: "0px solid blue", "marginLeft": "10px", "marginTop": "10px" }}>
                <div>
                    <MonthWeekDateNum
                        dayIndex={dayOfWeekIndex}
                        utc_datetime={utc_datetime}
                    />
                </div>
                <div style={{ "color": "#d8dae1", "fontSize": "20px" }}>
                    <div style={{ "fontFamily": "Trirong", "fontSize": "20px", "marginTop": "10px", "marginRight": "10px" }}>
                        {task_of_number} tasks
                    </div>
                    <div style={{ "marginRight": "10px", "marginTop": "5px" }}>
                        {/* <button>clear list</button> */}
                        {/* <button onClick={clearButtonHandler}>Contained</button> */}
                        <Button
                            variant="contained"
                            onClick={clearButtonHandler}
                            color="error"
                        >Contained</Button>


                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoHeader