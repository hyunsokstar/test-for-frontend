import React, { useState, useEffect } from 'react'

import TodosContainer from '../components/container/TodosContainer'

type Props = {}

function front_test({ }: Props) {
``
  return (
    <>
      <div style={{ width: "100%", border: "0px solid blue", display: "flex", justifyContent: "center", backgroundColor: "#5d5fea", gap: "10px" }}>
        <div style={{
          backgroundColor: "white",
          justifyContent:"center",
          alignItems:"center",
          display: "flex",
          height: "100%",
          width: "800px",
        }}>
          <TodosContainer />
        </div>
      </div>
    </>
  )
}

export default front_test