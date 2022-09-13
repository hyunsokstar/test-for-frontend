import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import DayOfWeeks from '../DayOfWeeks'
import MonthWeekDateNum from '../MonthWeekDateNum'
import DateNum from '../DateNum'
import MonthNum from '../MonthNum'


type Props = {
    task_of_number: number;
}


function TodoHeader({ task_of_number }: Props) {
    const [dayOfWeekIndex, setDaysOfTheWeekIndex] = useState<number>(0);
    const [utc_datetime, set_utc_datatime] = useState<number>(0);
    const [date, setDate] = useState("");
    const [countOfTask, setCountOfTask] = useState("");
    const [month, setMonth] = useState("");

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
        <div style={{display:"flex", justifyContent:"space-between", border:"1px solid red"}}>
            <div>
                <MonthWeekDateNum
                    dayIndex={dayOfWeekIndex}
                    utc_datetime={utc_datetime} />
            </div>
            <div>
                {task_of_number}
            </div>
        </div>
    )
}

export default TodoHeader