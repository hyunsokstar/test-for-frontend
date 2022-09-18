import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import HeaderContents from '../HeaderContents'
import Button from '@mui/material/Button';


type Props = {
    task_of_number: number;
    clearButtonHandler: any
}


function TodoHeader2({ task_of_number, clearButtonHandler }: Props) {
    const [dayOfWeekIndex, setDaysOfTheWeekIndex] = useState<number>(0);
    const [utc_datetime, set_utc_datatime] = useState<number>(0);

    useEffect(() => {
        getHeaderInfoFromUrl()
    }, [])

    const getHeaderInfoFromUrl = async () => {
        const url = 'http://worldtimeapi.org/api/timezone/Asia/Seoul'

        try {
            axios.get(url).then((response) => {
                // console.log("response : ", response);
                setDaysOfTheWeekIndex(response.data.day_of_week);
                set_utc_datatime(response.data.utc_datetime);

            });


        } catch (error) {
            console.log("error : ", error);

        }
    }

    return (
        <>
            <div style={{ border: "0px solid #F0F4F8", backgroundColor: "#FBFBFF", padding: "0 10px" }}>
                {/* <MonthWeekDateNum */}
                <HeaderContents
                    dayIndex={dayOfWeekIndex}
                    utc_datetime={utc_datetime}
                    task_of_number={task_of_number}
                    clearButtonHandler={clearButtonHandler}
                />

            </div>
        </>
    )
}

export default TodoHeader2