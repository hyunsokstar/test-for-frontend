import React, { useState, useEffect } from 'react'
import TodoHeader from '../components/TodoHeader'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import BottomContainer from '../components/Bottom'

type Props = {}

const sapme_todos = [
  { id: 1, todo: "할일1", createdAt: "3:44 pm" },
  { id: 2, todo: "할일2", createdAt: "3:45 pm" },
  { id: 3, todo: "할일3", createdAt: "4:51 pm" },
]

function front_test({ }: Props) {
  const [data_for_todos, set_data_for_todos] = useState<any>(sapme_todos);
  const [checked_list, set_checked_list] = useState<Array<number>>([]);
  const [inputValue, setInputValue] = useState("")


  const add_todo = (e: any) => {
    // console.log("e add_todo:", e);    
    const randomId = Math.random();
    // console.log("e enter: ", e);    

    if (e.key === 'Enter') {
      // console.log("입력 확인  : ", e.target.value);

      const todo = e.target.value;

      const time = new Date();
      const create_at_for_row = time.toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).slice(1).toLowerCase();


      set_data_for_todos((prev: any) => [...prev, { id: randomId, todo: todo, createdAt: create_at_for_row }]);
      setInputValue("")
    } else {
      // console.log("안걸려");
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
    if (checked_list.length === 0) {
      alert("삭제할 row를 선택해 주세요 !!");
      return;
    }

    const new_data_for_todos_for_delete = data_for_todos.filter((row: any) => {
      // return row

      if (!checked_list.includes(row.id)) {
        return row;
      }

    })
    set_data_for_todos(new_data_for_todos_for_delete);

  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      border: "2px solid blue",
      width: "60%",
      margin: "auto",
      gap: '5px'
    }}>

      <div style={{ padding: "10px" }}>
        <TodoHeader task_of_number={data_for_todos.length} clearButtonHandler={clearButtonHandler} />
      </div>

      <div >
        <TodoInput add_todo={add_todo} inputValue={inputValue} setInputValue={setInputValue} />
      </div>

      <div style={{marginTop:"10px"}}>
        <TodoList data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <BottomContainer />
      </div>

    </div>
  )
}

export default front_test