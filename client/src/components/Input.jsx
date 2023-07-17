import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import "../index.css";
import { useState } from "react";

function Input({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOnchangeTitle = (e) => {
    setTitle(e.target.value);
    //console.log("this is the title ", e.target.value);
  };
  const handleOnchangeDescription = (e) => {
    setDescription(e.target.value);
    //console.log("this is the Description ", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        title: title,
        description: description,
      });
      console.log("Data submitted successfully:", response.data);
      // Clear the input fields after successful submission
      const newTodo = {
        title: title,
        description: description,
      };
      onAddTodo(newTodo);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Error occurred!", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center" justify="center">
          <Card className="inputCard">
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Todo Title"
                variant="outlined"
                value={title}
                onChange={handleOnchangeTitle}
              />
              <br></br>
              <br />
              <TextField
                id="outlined-basic"
                label="Todo Description"
                variant="outlined"
                value={description}
                onChange={handleOnchangeDescription}
              />
              <br />
              <br />

              <Button
                className="submitButton"
                type="submit"
                variant="contained"
              >
                Submit Todo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </form>
    </>
  );
}

export default Input;
