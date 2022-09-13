import React, { useState } from 'react'

type Props = {
    data_for_todos: []
}

function TodoList({ data_for_todos }: Props) {


    const todorow = (row: any) => {
        return (
            <div style={{display:"flex", justifyContent:"flex-start", gap:"20px"}}>
                <div>
                    <input type="checkbox" />
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