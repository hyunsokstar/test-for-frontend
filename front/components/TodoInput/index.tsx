import React from 'react'

type Props = {
  add_todo: any
}

function TodoInput({ add_todo }: Props) {
  return (
    <div>
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder=' + Type your task'
        style={{ width: "100%", height: "40px", marginTop: "10px" }}
        onKeyDown={add_todo}
      />
    </div>
  )
}

export default TodoInput