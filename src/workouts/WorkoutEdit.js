import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = props => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description)
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    console.log(props.workoutToUpdate)
    const workoutUpdate = (event, workout) =>{
        event.preventDefault();
        fetch(`http://localhost:3035/workoutlog/log/:id${props.workoutToUpdate.id}`, {
          method: "PUT",
          body: JSON.stringify({
            log: {
              description: editDesc,
              definition: editDef,
              result: editRes,
            },
          }),
          headers: new Headers({
            "Content-Type": "application/json",
             'Authorization': `Bearer ${props.token}`
          }),
        }).then((res) => {
          props.fetchWorkouts();
          props.updateOff();
        });
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader className='table'>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}className="table">
                    <FormGroup >
                    <Label htmlfor="result">Edit Result</Label>
                    <Input name="result" value={editRes} onChange={(e)=> setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlfor="description">Edit Description</Label>
                        <Input name='description' value={editDesc} onChange={(e)=> setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlfor="definition">Edit Definition</Label>
                        <select type='select' name='definition' value={editDef} onChange ={(e)=> setEditDef(e.target.value)}>
                                <option value='Time'>Time</option>
                                <option value='Weight'>Weight</option>
                                <option value="Distance">Distance</option>
                        </select>
                    </FormGroup>
                    <Button type = 'submit'>Update a Workout Log</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;