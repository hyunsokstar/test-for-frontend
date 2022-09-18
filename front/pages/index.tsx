import React, { useState, useEffect } from 'react'

import TodosContainer from '../components/container/TodosContainer'

type Props = {}

function front_test({ }: Props) {

  return (
    <>
      <div style={{ width: "100%", height: "100%", border: "0px solid blue" , backgroundColor:"#5D61EA"}}>
        <div style={{
          backgroundColor: "white",
          // justifyContent: "center",
          // alignItems:"center",
          // display: "flex",
          // height: "100%",
          width: "800px",
          margin: "0 auto",
          border:"1px solid black"
        }}>
          <TodosContainer />
        </div>
      </div>
    </>
  )
}

export default front_test