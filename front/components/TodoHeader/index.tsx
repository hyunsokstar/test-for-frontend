import React, { useState } from 'react'
import Button from '@mui/material/Button';


type IProps = {
    dayIndex: number
    utc_datetime: number,
    task_of_number: number,
    clearButtonHandler: () => void
    checked_list: Array<string | number>
    all_clear_for_todos: () => void
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const TodoHeader = ({ dayIndex, utc_datetime, task_of_number, clearButtonHandler, checked_list, all_clear_for_todos }: IProps) => {
    const [dayOfWeeksArray, setdayOfWeeksArray] = useState(["Sun", "Mon", "Tusday", "Wed", "Thu", "Fri", "Sat"])
    var localDate = new Date(utc_datetime);
    const dayNum = localDate.getDate();
    const MonthNum = localDate.getMonth();

    return (
        <div style={{ padding: "0px 10px" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "1px solid #f0eaeaf", "width": "100%", "fontFamily": "Trirong", "fontSize": "40px", "color": "#7190f0" }}>
                <div>
                    {dayIndex ? dayOfWeeksArray[dayIndex] : ""} {localDate ? dayNum + "th" : ""}
                </div>
                <div style={{ border: "1px solid #f0eaeaf", "fontFamily": "Trirong", fontSize: "28px", color: "#CDD4E5" }}>
                    &nbsp;&nbsp; {task_of_number} Tasks <br />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "28px" }}>
                <div style={{ "fontFamily": "Trirong", "fontSize": "40px", color: "#CDD4E5" }}>
                    {monthNames[MonthNum]}
                </div>
                <div>
                    {
                        checked_list.length > 0 ?
                            <Button
                                variant="contained"
                                onClick={clearButtonHandler}
                                style={{ backgroundColor: "#FC6E6F", color: "white", margin:"0px 10px" }}
                            >
                                Clear for check
                            </Button>
                            :
                            ""
                    }
                    <Button
                        variant="contained"
                        onClick={all_clear_for_todos}
                        style={{ backgroundColor: "lightblue", color: "black" }}
                    >
                        AllClear
                    </Button>
                </div>
            </div>
        </div >

    )
}

export default TodoHeader