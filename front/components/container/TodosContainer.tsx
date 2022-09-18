import React, { useState, useEffect } from 'react'
import TodoHeader from '../TodoHeader'
import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import BottomContainer from '../Bottom'
// axios 작업
import axios from "axios";
import api from "../../utils/api"
import todo_type_for_list from "../TodoList"
import { type_for_todo_row } from "../../common/type_for_todos"

type Props = {}

// interface row_type_for_delete_row {
//     id: string | number;
//     todo: string;
//     createdAt: string;
// }

interface todo_type_from_server {
    _id: string | number;
    task_title: string;
    createdAt: string;
}

const sample_todos = [
    { id: 1, todo: "할일1", createdAt: "3:44 pm" },
    { id: 2, todo: "할일2", createdAt: "3:45 pm" },
    { id: 3, todo: "할일3", createdAt: "4:51 pm" },
]


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TodosContainer({ }: Props) {
    const [data_for_todos, set_data_for_todos] = useState<any>(sample_todos);
    const [checked_list, set_checked_list] = useState<Array<string | number>>([]);
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
            // const rows_data = response.data.data.rows_for_grid
            console.log("response : ", response);

            if (response.data.success) {
                const todo_data = response.data.data;

                const new_todos = todo_data.map((row: todo_type_from_server) => {
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


    const add_todo = async (e: any, todoData: string) => {
        const randomId = Math.random();
        console.log("typeof randomId : ", typeof randomId);
        // console.log("e: ", e.target.value);
        // console.log("todoData : ", todoData);

        let todo: string;
        if (todoData === "") {
            todo = e.target.value;
        } else {
            todo = todoData
        }


        const time = await new Date();
        const create_at_for_row = await time.toLocaleTimeString("en", { hour: '2-digit', minute: '2-digit' }).toLowerCase();

        if (e.key === 'Enter') {
            todo = e.target.value;
            if (todo === "") {
                alert("할일을 입력해 주세요")
            } else {
                set_data_for_todos((prev: Array<type_for_todo_row>) => [...prev, { id: String(randomId), todo: todo, createdAt: create_at_for_row }]);
                setInputValue("")
            }
        } else if (e.key === "icon") {
            if (todo !== "") {
                set_data_for_todos((prev: Array<type_for_todo_row>) => [...prev, { id: String(randomId), todo: todo, createdAt: create_at_for_row }]);
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

        // console.log("        checked_list : ", checked_list);
        // console.log("checked_id : ", checked_id);


        if (checked) {
            set_checked_list(([...checked_list, checked_id]))
        } else {
            console.log("체크 취소 => 체크 ");
            const new_checked_list = checked_list.filter((chid: string | number) => {
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
        console.log("checked_list : ", checked_list);

        const new_data_for_todos_for_delete = data_for_todos.filter((row: type_for_todo_row) => {
            if (!checked_list.includes(row.id)) {
                return row;
            }

        })

        // console.log("new_data_for_todos_for_delete : ", new_data_for_todos_for_delete);


        set_data_for_todos(new_data_for_todos_for_delete);

    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            border: "0px solid blue",
            width: "100%",
            margin: "auto",
            // border:"10px solid pink"
            // gap: '5px'
        }}>

            <div style={{ padding: "0px", marginBottom: "10px" , borderBottom:"1px solid #e4dedeff"}}>
                <TodoHeader task_of_number={data_for_todos.length} clearButtonHandler={clearButtonHandler} dayIndex={0} utc_datetime={0} />
            </div>
            <div>
                <TodoInput add_todo={add_todo} inputValue={inputValue} setInputValue={setInputValue} />
            </div>

            <div>
                <TodoList data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}>
                <BottomContainer />
            </div>

        </div>
    )
}

export default TodosContainer