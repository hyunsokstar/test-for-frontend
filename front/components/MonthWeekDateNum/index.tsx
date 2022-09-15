import React, { useState } from 'react'

type IProps = {
    dayIndex: number
    utc_datetime: number
}

// var utcDate = '2022-09-13T13:38:01.916104+00:00';  // ISO-8601 formatted date returned from server

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MonthWeekDateNum = ({ dayIndex, utc_datetime }: IProps) => {
    const [dayOfWeeksArray, setdayOfWeeksArray] = useState(["Sun", "Mon", "Tusday", "Wed", "Thu", "Fri", "Sat"])
    var localDate = new Date(utc_datetime);

    // console.log("localdate : ", localDate);


    const dayNum = localDate.getDate();
    const MonthNum = localDate.getMonth();


    return (
        <div
            style={{ "fontFamily": "Trirong", "fontSize": "40px", "color": "#7190f0" }}
        >
            <div>
                {dayIndex ? dayOfWeeksArray[dayIndex] : ""} {localDate ? dayNum + "th" : ""}
            </div>
            <div style={{ "color": "#d8dae1", "fontSize": "25px" }}>
                {monthNames[MonthNum]}
            </div>
        </div>
    )
}

export default MonthWeekDateNum