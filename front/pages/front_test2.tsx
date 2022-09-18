import React, { useState, useEffect } from 'react'
import TodosContainer2 from '../components/container/TodosContainer2'

type Props = {}

function front_test({ }: Props) {

  return (
    <>
      <div style={{ width: "100%", border: "0px solid blue", display: "flex", justifyContent: "center", backgroundColor: "#5d5fea", gap: "10px" }}>
        <div style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          height: "100%",
          width: "800px",
        }}>
          <TodosContainer2 />
        </div>
      </div>
    </>
  )
}

export default front_test