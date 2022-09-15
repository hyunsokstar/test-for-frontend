import React, { useState , useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import { makeStyles } from "@material-ui/core";


type Props = {
  add_todo: any,
  inputValue: any,
  setInputValue: any
}

const useStyles = makeStyles((theme) => ({
  iconForInputEnter: {
    transition: theme.transitions.create(["border-radius", "background-color"]),
    "&:hover": {
      borderRadius: "4px",
      backgroundColor: "#F7F2F1"
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
    const e = {key: "icon"}
    const my_value = inputRef.current.value;
    inputRef.current.value=""
    console.log("my_value : ", my_value);
    add_todo(e,my_value);
    inputRef.current.focus();
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "white", display: "flex", textAlign: "center", alignItems: "center", marginLeft: "10px",padding:"5px", border:"0px solid black" }} className={classes.iconForInputEnter}>
        <AddIcon style={{ opacity: "0.6"}} onClick={add_todo2} />

      </div>
      <input
        ref={inputRef}
        type="text"
        id="fname"
        name="fname"
        placeholder=' Type your task'
        style={{ width: "100%", height: "40px", fontSize: "25px", outline: "none", border: "none" }}
        onChange={inputHandler}
        onKeyDown={(e) => key_down_handler(e)}
        value={inputValue}
      />
    </div>
  )
}

export default TodoInput