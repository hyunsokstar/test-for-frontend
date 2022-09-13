import React from 'react'

type Props = {
    utc_datetime: any
}

function MonthNum({ utc_datetime }: Props) {
    var localDate = new Date(utc_datetime);
    const MonthNum = localDate.getMonth();
    const dayNumber = localDate.getDate();



    return (
        <div>{MonthNum} </div>

    )
}

export default MonthNum