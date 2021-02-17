import React, {useState} from 'react'
import axios from 'axios'
import qs from 'qs'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Redirect } from 'react-router-dom';


function SignIn(){
    const [email, setEmail] = useState('amine@gmail.com')
    const [errorEmail, setErrorEmail] = useState('')
  
    const [password, setPassword] = useState('Amine1234@')
    const [errorPassword, setErrorPasswor] = useState('')
  
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)
  
    function handleSubmit(event){
      event.preventDefault()
      var data = qs.stringify({
        'email': email,
        'password': password 
      });
      var config = {
        method: 'post',
        url: 'http://localhost:8000/admin/login',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
  
      axios(config)
      .then(function (response) {
        localStorage.setItem('tokenAdmin',  response.data.token)
        setRedirect(true)
      }).catch(function (error) {
        console.log(error)
        if(error.response.data.errors.includes('le champ email est obligatoir!')){
          setErrorEmail('le champ email est obligatoir!')
        }
        if(error.response.data.errors.includes('le champ password est obligatoir!')){
          setErrorPasswor('le champ password est obligatoir!')
        }
  
        if(error.response.data.errors.includes("le champ email doit etre valide exemple: toto@gmail.com!")){
          setErrorEmail('le champ email doit etre valide exemple: toto@gmail.com!')
        }
        if(error.response.data.errors.includes("le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!")){
          setErrorPasswor('le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!')
        }
  
        if(error.response.data.errors.includes("email non enregistrer!")){
          setErrorEmail('email non enregistrer!')
        }
  
        if(error.response.data.errors.includes('Informations incorectes')){
          setError('Informations incorectes')
        }
      });
    }
    return(
        <div className="App" style={{marginTop: "20vh"}}>
        <h1>login</h1>
        <div className="container-fluid" style={{width: "60%"}}>
          {error !== ''? <p style={{color: "red"}}>{error}</p>:null}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={(event)=>{setEmail(event.currentTarget.value)}}
                type="email"
                placeholder="email"
                value={email}
              />
              {errorEmail !== "" ? <small style={{color: "red"}}>{errorEmail}</small>:null}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(event=>{setPassword(event.currentTarget.value)})}
                value={password}
              />
              {errorPassword !== "" ? <small style={{color: "red"}}>{errorPassword}</small>:null}
            </Form.Group>
  
            <Button type="submit" >submit</Button>
          </Form>
        </div>
        {redirect === true? <Redirect exact to="/profile" />:null}
      </div>
    )
}

export default SignIn