import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3035/user/register', {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password
              : password
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
    })
    .then((response) => response.json())
    .then((data) => {
        props.updateToken(data.sessionToken)
        })
    }

    return (
      <div>
        <h1>Sign Up</h1>
        <p>Sign up for an account here. It's free for all!!</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder='example@email.com'/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword
              (e.target.value)} name="password
            " value={password
            } />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
}

export default Signup;