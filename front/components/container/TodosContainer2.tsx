import React, { useState, useEffect } from 'react'
import TodoHeader2 from '../TodoHeader2'
import TodoInput2 from '../TodoInput2'
import TodoList2 from '../TodoList2'
import BottomContainer2 from '../Bottom2'
// axios 작업
import axios from "axios";
import api from "../../utils/api"
import { type_for_todo_row } from "../../common/type_for_todos"


type Props = {}

interface row_type_for_delete_row {
    id: string;
    todo: string;
    createdAt: string;
}

interface todo_type_from_server {
    _id: string;
    task_title: string;
    createdAt: string;
}

const sample_todos: Array<type_for_todo_row> = [
    { id: 1, todo: "할일1", createdAt: "3:44 pm" },
    { id: 2, todo: "할일2", createdAt: "3:45 pm" },
    { id: 3, todo: "할일3", createdAt: "4:51 pm" },
]


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TodosContainer({ }: Props) {
    const [data_for_todos, set_data_for_todos] = useState<any>(sample_todos);
    const [checked_list, set_checked_list] = useState<Array<string>>([]);
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        get_data_for_todos();
    }, [])

    const get_data_for_todos = async () => {
        // console.log("hi");
        try {
            const response = await axios.get(
                `${api.milestone}/`,
                { withCredentials: true }
            );
            // console.log("response : ", response);

            if (response.data.success) {
                const todo_data = response.data.data;

                const new_todos = todo_data.map((row: type_for_todo_row) => {
                    return {
                        id: row._id,
                        todo: row.task_title,
                        createdAt: new Date(row.createdAt).toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase()
                    }
                })
                set_data_for_todos(new_todos);
            } else {
                set_data_for_todos(sample_todos)
            }


            // setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })   
        } catch (error) {
            console.log("error : ", error);
        }
    }


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
        const checked_id = target.id;

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
        if (checked_list.length === 0) {
            alert("삭제할 row를 선택해 주세요 !!");
            return;
        } else {
            set_data_for_todos([]);
        }

        const new_data_for_todos_for_delete = data_for_todos.filter((row: row_type_for_delete_row) => {
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
            borderBottom: "1px solid #eee9e9f",
            width: "100%",
            margin: "auto",
            marginTop: "5px"
            // gap: '5px'
        }}>

            <div>
                <TodoHeader2 task_of_number={data_for_todos.length} clearButtonHandler={clearButtonHandler} />
            </div>
            <div style={{ border: "0px solid green", padding: "20px 10px", margin: "0px 0px" }}>
                <TodoInput2 add_todo={add_todo} inputValue={inputValue} setInputValue={setInputValue} />
            </div>
            <div>
                <TodoList2 data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}>
                <BottomContainer2 />
            </div>

        </div>
    )
}

export default TodosContainer