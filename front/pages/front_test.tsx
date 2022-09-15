import React, { useState, useEffect } from 'react'
import TodoHeader from '../components/TodoHeader'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'


type Props = {}

const sapme_todos = [
  { id: 1, todo: "할일1" },
  { id: 2, todo: "할일2" },
  { id: 3, todo: "할일3" },
]

function front_test({ }: Props) {
  const [task_of_number, set_task_of_number] = useState(4)
  const [data_for_todos, set_data_for_todos] = useState<any>(sapme_todos);
  const [checked_list, set_checked_list] = useState<Array<number>>([]);

  const add_todo = (e: any) => {
    const randomId = Math.random();

    if (e.key === 'Enter') {
      const todo = e.target.value;
      set_data_for_todos((prev: any) => [...prev, { id: randomId, todo: todo }]);
    }

  }

  const checkHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const checked = target.checked;
    const checked_id = Number(target.id);

    if (checked) {
      set_checked_list(([...checked_list, checked_id]))
    } else {
      console.log("체크 취소 => 체크 ");
      const new_checked_list = checked_list.filter((chid: any) => {
        if (chid !== checked_id) {
          return checked_id;
        }
      })
      set_checked_list(new_checked_list);
    }

  }

  const clearButtonHandler = () => {
    console.log("clearButtonHandler : ", clearButtonHandler);
    set_data_for_todos([]);
  }

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
        <TodoHeader task_of_number={task_of_number} clearButtonHandler={clearButtonHandler} />
      </div>

      <div>
        <TodoInput add_todo={add_todo} />
      </div>

      <div>
        <TodoList data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
      </div>

    </div>
  )
}

export default front_test