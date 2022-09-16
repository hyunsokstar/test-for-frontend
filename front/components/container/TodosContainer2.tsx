import React, { useState, useEffect } from 'react'
import TodoHeader from '../../components/TodoHeader'
import TodoInput from '../../components/TodoInput'
import TodoList from '../../components/TodoList'
import BottomContainer from '../../components/Bottom'

type Props = {}

interface row_type_for_delete_row {
    id: number;
    todo: string;
    createdAt: string;
}

const sapme_todos = [
    { id: 1, todo: "할일1", createdAt: "3:44 pm" },
    { id: 2, todo: "할일2", createdAt: "3:45 pm" },
    { id: 3, todo: "할일3", createdAt: "4:51 pm" },
]

function TodosContainer2({ }: Props) {
    const [data_for_todos, set_data_for_todos] = useState<any>(sapme_todos);
    const [checked_list, set_checked_list] = useState<Array<number>>([]);
    const [inputValue, setInputValue] = useState("")

    const add_todo = async (e: any, todoData = "") => {
        const randomId = Math.random();
        console.log("e.key : ", e.key);


        let todo = todoData;

        const time = await new Date();
        const create_at_for_row = await time.toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase();

        if (e.key === 'Enter') {
            todo = e.target.value;
            if (todo === "") {
                alert("할일을 입력해 주세요")
            } else {
                set_data_for_todos((prev: any) => [...prev, { id: randomId, todo: todo, createdAt: create_at_for_row }]);
                setInputValue("")
            }

        } else if (e.key === "icon") {
            if (todoData !== "") {
                set_data_for_todos((prev: any) => [...prev, { id: randomId, todo: todo, createdAt: create_at_for_row }]);
                setInputValue("")
            } else {
                alert("할일을 입력해 주세요 !")
            }
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

        // set_data_for_todos([]);
        if (checked_list.length === 0) {
            alert("삭제할 row를 선택해 주세요 !!");
            return;
        } else {
            set_data_for_todos([]);
        }

        const new_data_for_todos_for_delete = data_for_todos.filter((row: row_type_for_delete_row) => {
            // console.log("row : ",row);
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
            border: "0px solid blue",
            width: "100%",
            margin: "auto",
            gap: '5px'
        }}>

            <div style={{ padding: "10px" }}>
                <TodoHeader task_of_number={data_for_todos.length} clearButtonHandler={clearButtonHandler} />
            </div>

            <div>
                <TodoInput add_todo={add_todo} inputValue={inputValue} setInputValue={setInputValue} />
            </div>

            <div>
                <TodoList data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <BottomContainer />
            </div>

        </div>
    )
}

export default TodosContainer2