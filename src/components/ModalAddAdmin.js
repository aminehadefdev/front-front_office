import React,{useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import qs from 'qs'
import axios from 'axios'
function ModalAddAdmin(props){

    // value={emailSignIn}
    // onChange={event=>{setEmailSignIn(event.currentTarget.value)}}
    // type="email"
    // placeholder="Enter email"

    // {errorPW != '' ? <small style={{color: "red"}} id="emailHelp">{errorPW}</small>:null}
    

    const [firstname, setFirstname] = useState('ahmed')
    const [lastname, setLastname] = useState('hadef')
    const [email, setEmail] = useState('ahmed@gmail.com')
    const [password, setPassword] = useState('Bastoz@@@000')
    const [confirmePassword, setConfirmePassword] = useState('Bastoz@@@000')
    const [niveau, setNiveau] = useState(2)

    function addAdmin(event){
        event.preventDefault()
        var data = qs.stringify({
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
            'niveau': niveau,
            'token': localStorage.getItem('tokenAdmin'),
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8000/admin/register',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Add admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addAdmin}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicFirstname">
                                <Form.Label>firstname</Form.Label>
                                <Form.Control
                                    value={firstname}
                                    onChange={event=>{setFirstname(event.currentTarget.value)}}
                                    type="text"
                                    placeholder="Enter firstname"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicLastname">
                                <Form.Label>lastname</Form.Label>
                                <Form.Control
                                    value={lastname}
                                    onChange={event=>{setLastname(event.currentTarget.value)}}
                                    type="text"
                                    placeholder="Enter lastname"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={event=>{setEmail(event.currentTarget.value)}}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicNiveau">
                                <Form.Label>niveau</Form.Label>
                                <Form.Control onChange={event=>{setNiveau(event.currentTarget.value)}} as="select" >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    value={password}
                                    onChange={event=>{setPassword(event.currentTarget.value)}}
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicConfirmePassword">
                                <Form.Label>confirme password</Form.Label>
                                <Form.Control
                                    value={confirmePassword}
                                    onChange={event=>{setConfirmePassword(event.currentTarget.value)}}
                                    type="password"
                                    placeholder="Confirmer password"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={props.close} variant="secondary">Close</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddAdmin