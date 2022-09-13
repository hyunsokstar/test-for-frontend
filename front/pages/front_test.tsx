import React, { useState, useEffect } from 'react'
import TodoHeader from '../components/TodoHeader'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'

type Props = {}

const sapme_todos = [
  { todo: "할일1" },
  { todo: "할일2" },
  { todo: "할일3" },
]

function front_test({ }: Props) {

  const [task_of_number, set_task_of_number] = useState(4)
  const [data_for_todos, set_data_for_todos] = useState(sapme_todos);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      border: "2px solid blue",
      width: "60%",
      margin: "auto",
      gap: '20px'
    }}>
      <div>
        <TodoHeader task_of_number={task_of_number} />
      </div>
      <div>
        <TodoInput />
      </div>
      <div>
        <TodoList data_for_todos={data_for_todos} />
      </div>
    </div>
  )
}

export default front_test