import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
import Wrapper from "../components/Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef.current.value);
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "invalid Input",
        message: "please enter a valid name and age (non empty values)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "invalid Age",
        message: "please enter a valid  age ",
      });
      return;
    }
    props.onAddUser(enteredName, enteredAge);
    console.log(enteredAge, enteredName);

    setEnteredAge("");
    setEnteredName("");
  };

  const userNameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const userAgeChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            value={enteredName}
            onChange={userNameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (in years)</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={userAgeChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add Users</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
