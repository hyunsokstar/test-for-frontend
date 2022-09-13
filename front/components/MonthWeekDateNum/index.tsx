import React, { useState } from 'react'

type IProps = {
    dayIndex: number
    utc_datetime: number
}

// var utcDate = '2022-09-13T13:38:01.916104+00:00';  // ISO-8601 formatted date returned from server


const MonthWeekDateNum = ({ dayIndex, utc_datetime }: IProps) => {
    const [dayOfWeeksArray, setdayOfWeeksArray] = useState(["Sun", "Mon", "Tusday", "Wed", "Thu", "Fri", "Sat"])
    var localDate = new Date(utc_datetime);
    const dayNum = localDate.getDate();
    const MonthNum = localDate.getMonth();


    return (
        <>
            <div>
                {dayIndex ? dayOfWeeksArray[dayIndex] : ""} {localDate ? dayNum + "th" : ""}
            </div>
            <div>
                {MonthNum}
            </div>
        </>
    )
}

export default MonthWeekDateNum