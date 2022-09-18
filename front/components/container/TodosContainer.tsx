import React, { useState, useEffect } from 'react'
import TodoHeader from '../TodoHeader'
import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import BottomContainer from '../Bottom'

// axios 작업
import axios from "axios";
import api from "../../utils/api"


type Props = {}

interface row_type_for_delete_row {
    id: number;
    todo: string;
    createdAt: string;
}
interface todo_type_from_server {
    _id: string;
    task_title: string;
    createdAt: string;
}

const sapme_todos = [
    { id: 1, todo: "할일1", createdAt: "3:44 pm" },
    { id: 2, todo: "할일2", createdAt: "3:45 pm" },
    { id: 3, todo: "할일3", createdAt: "4:51 pm" },
]


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TodosContainer({ }: Props) {
    const [data_for_todos, set_data_for_todos] = useState<any>(sapme_todos);
    const [checked_list, set_checked_list] = useState<Array<number>>([]);
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
            border: "0px solid blue",
            width: "100%",
            margin: "auto",
            // gap: '5px'
        }}>

            <div style={{ padding: "0px" , marginBottom:"10px"}}>
                <TodoHeader task_of_number={data_for_todos.length} clearButtonHandler={clearButtonHandler} />
                <TodoInput add_todo={add_todo} inputValue={inputValue} setInputValue={setInputValue} />
            </div>

            <div>
                <TodoList data_for_todos={data_for_todos} checkHandler={checkHandler} checked_list={checked_list} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop:"90px" }}>
                <BottomContainer />
            </div>

        </div>
    )
}

export default TodosContainer