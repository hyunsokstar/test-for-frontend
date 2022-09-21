import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import { makeStyles } from "@material-ui/core";
import { type_for_todo_row } from "../../common/type_for_todos"

type Props = {
  add_todo: (e:type_for_todo_row) => void,
  inputValue: any,
  setInputValue: any
}

const useStyles = makeStyles((theme) => ({
  iconForInputEnter: {
    // padding: "10px",
    transition: theme.transitions.create(["border-radius", "background-color"]),
    "&:hover": {
      borderRadius: "4px",
      backgroundColor: "#e3dbd9"
    }
  }
}));

function TodoInput({ add_todo, inputValue, setInputValue }: Props) {
  const inputRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
      inputRef.current.focus();
  }, [])

  const inputHandler = (e: any) => {
    setInputValue(e.target.value)
  }


  const key_down_handler = (e: type_for_todo_row) => {
    add_todo(e)
  }

  const add_todo2 = async () => {
    const e = { key: "icon" }
    const my_value = inputRef.current.value;
    inputRef.current.value = ""
    await add_todo(e, my_value);
    inputRef.current.focus();
  }

  return (
    <div style={{ display: "flex",padding:"5px", borderBottom: "1px solid #F7F8FE" , margin:"0px", borderBottom:"1px solid #e4dedeff"}}>
      <div style={{ backgroundColor: "white", display: "flex", textAlign: "center", alignItems: "center",padding:"2px 10px 5px 2px" }} >
        <AddIcon style={{ opacity: "0.6" }} onClick={add_todo2} className={classes.iconForInputEnter}/>
        <input
          ref={inputRef}
          size = {64}
          type="text"
          id="fname"
          name="fname"
          placeholder=' Type your task'
          style={{ height: "40px", fontSize: "22px", outline: "none" , border:"none" }}
          onChange={inputHandler}
          onKeyUpCapture={(e:type_for_todo_row) => key_down_handler(e)}
          value={inputValue}
        />

      </div>
    </div>
  )
}

export default TodoInput