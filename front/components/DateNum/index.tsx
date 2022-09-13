import React from 'react'

type Props = {
  utc_datetime: any
}

function DateNum({ utc_datetime }: Props) {
  var localDate = new Date(utc_datetime);
  const dayNumber = localDate.getDate();

  return (
    <div>{dayNumber} th</div>
  )
}

export default DateNum