import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function TodoCard({ title, description, onDelete }) {
  const handleDelete = () => {
    onDelete(); // Call the onDelete function passed as a prop
  };
  return (
    <>
      <Card
        className="todoCard"
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" color="secondary">
              Edit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

export default TodoCard;
