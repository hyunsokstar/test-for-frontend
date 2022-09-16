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
        const url = 'http://worldtimeapi.org/api/timezone/Asia/Seoul'

        try {
            axios.get(url).then((response)=>{
                console.log("response : ", response);
                setDaysOfTheWeekIndex(response.data.day_of_week);
                set_utc_datatime(response.data.utc_datetime);
                
            });
            // console.log("response : ", response);
            // console.log("response.data.utc_datetime : ", response.data.utc_datetime);

            // if (response.status == 200) {
            //     console.log("요청 성공 !!");
                
            // } else {
            //     console.log("hi");
                
            // }

        } catch (error) {
            console.log("error : ", error);
            
        }
    }

    return (
        <>

            <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid #F0F4F8", backgroundColor:"#FBFBFF", }}>
                <div>
                    <MonthWeekDateNum
                        dayIndex={dayOfWeekIndex}
                        utc_datetime={utc_datetime}
                    />
                </div>
                <div style={{ "color": "#d8dae1", "fontSize": "20px" }}>
                    <div style={{ "fontFamily": "Trirong", "fontSize": "20px" }}>
                        {task_of_number} Tasks
                    </div>
                    <div style={{ "marginRight": "10px", "marginTop": "5px" }}>
                        <Button
                            variant="contained"
                            onClick={clearButtonHandler}
                            color="error"
                        >Clear
                        </Button>


                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoHeader