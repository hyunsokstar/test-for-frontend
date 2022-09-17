import React, { useState } from 'react'
import Button from '@mui/material/Button';


type IProps = {
    dayIndex: number
    utc_datetime: number,
    task_of_number: number,
    clearButtonHandler: () => void
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MonthWeekDateNum = ({ dayIndex, utc_datetime, task_of_number, clearButtonHandler }: IProps) => {
    const [dayOfWeeksArray, setdayOfWeeksArray] = useState(["Sun", "Mon", "Tusday", "Wed", "Thu", "Fri", "Sat"])
    var localDate = new Date(utc_datetime);
    const dayNum = localDate.getDate();
    const MonthNum = localDate.getMonth();

    return (
        <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid #f0eaeaf", "width": "100%", "fontFamily": "Trirong", "fontSize": "40px", "color": "#7190f0", marginLeft: "10px" }}>
            <div>
                {dayIndex ? dayOfWeeksArray[dayIndex] : ""} {localDate ? dayNum + "th" : ""} <br />
                <span style={{ "color": "#d8dae1", "fontSize": "25px", marginRight: "18px" }}>
                    {monthNames[MonthNum]}
                </span>
            </div>
            <div style={{ "color": "#d8dae1", "fontSize": "25px", marginRight: "18px" }}>
                &nbsp;&nbsp; {task_of_number} Tasks <br />
                <Button
                    variant="contained"
                    onClick={clearButtonHandler}
                    style={{ backgroundColor: "#FC6E6F", color: "white", marginTop: "36px" }}
                >
                    Clear List
                </Button>
            </div>
        </div>
    )
}

export default MonthWeekDateNum