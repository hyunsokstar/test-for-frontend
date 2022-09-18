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

const HeaderContents = ({ dayIndex, utc_datetime, task_of_number, clearButtonHandler }: IProps) => {
    const [dayOfWeeksArray, setdayOfWeeksArray] = useState(["Sun", "Mon", "Tusday", "Wed", "Thu", "Fri", "Sat"])
    var localDate = new Date(utc_datetime);
    const dayNum = localDate.getDate();
    const MonthNum = localDate.getMonth();

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "1px solid #f0eaeaf", "width": "100%", "fontFamily": "Trirong", "fontSize": "40px", "color": "#7190f0" }}>
                {/* <div style={{ "color": "#d8dae1", "fontSize": "25px", marginRight: "18px" }}> */}
                <div>
                    {dayIndex ? dayOfWeeksArray[dayIndex] : ""} {localDate ? dayNum + "th" : ""}
                </div>
                <div style={{ border: "1px solid #f0eaeaf", "fontFamily": "Trirong", color: "#CDD4E5" }}>
                    &nbsp;&nbsp; {task_of_number} Tasks <br />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ "fontFamily": "Trirong", "fontSize": "40px", color:"#CDD4E5" }}>
                    {monthNames[MonthNum]}
                </div>
                <div>
                    <Button
                        variant="contained"
                        // onClick={clearButtonHandler}
                        style={{ backgroundColor: "blue", color: "white" }}
                    >
                        저장
                    </Button>

                    <Button
                        variant="contained"
                        onClick={clearButtonHandler}
                        style={{ backgroundColor: "#FC6E6F", color: "white" }}
                    >
                        Clear List
                    </Button>
                </div>
            </div>
            <div>

            </div>
        </div >

    )
}

export default HeaderContents