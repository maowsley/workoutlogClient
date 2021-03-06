import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3035/workoutlog/log", {
          method: "POST",
          body: JSON.stringify({
            log: {
              description: description,
              definition: definition,
              result: result,
            },
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': `Bearer ${props.token}`
          }),
        })
          .then((res) => res.json())
          .then((logData) => {
            console.log(logData);
            setDescription("");
            setDefinition("");
            setResult("");
            props.fetchWorkouts();
          });
    }

    return (
      <div>
        <h3>Log a Workout</h3>
        <Form onSubmit={handleSubmit} className="table">
          <FormGroup className="Textentry">
            <Label htmlFor="description">Description</Label>
            <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="desc"/>
          </FormGroup>
          <FormGroup className='Textentry'>
            <Label htmlFor="definition">Definition:</Label>
            <select className="dropdown" type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
              <option value="Time">Time</option>
              <option value="Weight">Weight</option>
              <option value="Distance">Distance</option>
            </select>
          </FormGroup>
          <FormGroup className="Textentry">
              <Label htmlFor="result">Result</Label>
              <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}/>
          </FormGroup>
          <Button type="submit" className="buttonstyle">Click to Submit</Button>
        </Form>
      </div>
    );
}

export default WorkoutCreate;