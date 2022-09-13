import React, { useState } from 'react'

type Props = {
    data_for_todos: any
    checkHandler: any
}


function TodoList({ data_for_todos, checkHandler }: Props) {

    // const checkHandler = (e: any) => {
    //     console.log("체크 박스 클릭 : ", e.target.value);
    // }

    const todorow = (row: any) => {
        return (
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }} key={row.id}>
                <div>
                    <input type="checkbox" id={row.id} onClick={checkHandler} key={row.id} />
                </div>
                <div>{row.todo}</div>
            </div>
        )
    }

    return (
        <div>
            {data_for_todos.map((row: any) => {
                return todorow(row)
            })}
        </div>
    )
}

export default TodoList