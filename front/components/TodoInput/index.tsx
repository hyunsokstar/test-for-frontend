import React, { useState } from 'react'

type Props = {
  add_todo: any,
  inputValue: any
}

function TodoInput({ add_todo ,  inputValue, setInputValue}: Props) {

  // const [inputValue, setInputValue] = useState("")

  const inputHandler = (e:any) => {
    // console.log("e : ", e);    
    setInputValue(e.target.value)
  }

  const key_down_handler = (e:any) => {
    add_todo(e)
    // setInputValue("")
  }

  return (
    <div>
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder=' + Type your task'
        style={{ width: "100%", height: "40px", marginTop: "10px", border: 0, fontSize: "25px", paddingLeft: "14px" }}
        onChange = {inputHandler}
        onKeyDown={(e) => key_down_handler(e)}
        value={inputValue}
      />
    </div>
  )
}

export default TodoInput