import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import { makeStyles } from "@material-ui/core";


type Props = {
  add_todo: () => void,
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


  const key_down_handler = (e: any) => {
    add_todo(e)
  }

  const add_todo2 = () => {
    // console.log("hi");
    const e = { key: "icon" }
    const my_value = inputRef.current.value;
    inputRef.current.value = ""
    console.log("my_value : ", my_value);
    add_todo(e, my_value);
    inputRef.current.focus();
  }

  return (
    <div style={{ display: "flex", margin:"0px 10px" }}>
      <div style={{ backgroundColor: "white", display: "flex", textAlign: "center", alignItems: "center" }} >
        <AddIcon style={{ opacity: "0.6" }} onClick={add_todo2} className={classes.iconForInputEnter}/>

        <input
          ref={inputRef}
          type="text"
          id="fname"
          name="fname"
          placeholder=' Type your task'
          style={{ width: "100%", fontSize: "25px", outline: "none", border:"none" }}
          onChange={inputHandler}
          onKeyDown={(e) => key_down_handler(e)}
          value={inputValue}
        />

      </div>
    </div>
  )
}

export default TodoInput