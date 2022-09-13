import React from 'react'

type Props = {}

function TodoInput({ }: Props) {
  return (
    <div>
      <form>
        <input 
        type="text" 
        id="fname" 
        name="fname" 
        placeholder='Type your task' 
        style={{ width: "100%", height:"40px", marginTop:"10px" }} />
      </form>
    </div>
  )
}

export default TodoInput