import React,{useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import qs from 'qs'
import axios from 'axios'
function ModalAddAdmin(props){

    const [firstname, setFirstname] = useState('')
    const [errFN, setErrFN] = useState('')

    const [lastname, setLastname] = useState('')
    const [errLN, setErrLN] = useState('')

    const [email, setEmail] = useState('')
    const [errEm, setErrEm] = useState('')

    const [password, setPassword] = useState('')
    const [errPw, setErrPw] = useState('')

    const [confirmePassword, setConfirmePassword] = useState('')
    const [errCP, setErrCP] = useState('')

    const [niveau, setNiveau] = useState(0)
    const [errNv, serErrNv] = useState('')

    const [error, setError] = useState('')

    function addAdmin(event){
        event.preventDefault()
        if(password !== confirmePassword){
            setErrCP('le mot de passe dois etre le meme que le confirme password!')
            return false
        }
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
        .then(function (response){
            var cpAdms = props.arAdmin
            cpAdms.push({
                'firstname': firstname,
                'lastname': lastname,
                'email': email,
                'password': password,
                'niveau': niveau,
                "id": response.data.id
            })
            props.setAdmins(cpAdms)
            props.close()
        })
        .catch(function (error) {
            if(error.response.data.errors.includes("le champ firstname est obligatoir!")){setErrFN("le champ firstname est obligatoir!")}
            if(error.response.data.errors.includes("le firstname doit contenire que des lettre!")){setErrFN("le firstname doit contenire que des lettre!")}

            if(error.response.data.errors.includes("le champ lastname est obligatoir!")){setErrLN("le champ lastname est obligatoir!")}
            if(error.response.data.errors.includes("le lastname doit contenire que des lettre!")){setErrLN("le lastname doit contenire que des lettre!")}

            if(error.response.data.errors.includes("le champ email est obligatoir!")){setErrEm("le champ email est obligatoir!")}
            if(error.response.data.errors.includes( "le champ email doit etre valide exemple: toto@gmail.com!")){setErrEm( "le champ email doit etre valide exemple: toto@gmail.com!")}

            if(error.response.data.errors.includes("le champ password est obligatoir!")){setErrPw("le champ password est obligatoir!")}
            if(error.response.data.errors.includes("le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!")){setErrPw("le champ password doit contenire au minimum 8 caractaires dont au mois une majuscule une miniscule et un caractaiter special!")}

            if(error.response.data.errors.includes("le champ niveau d'administration est obligatoir!")){setErrLN("le champ niveau d'administration est obligatoir!")}

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
                                {errFN !== '' ? <small className="err">{errFN}</small> :null}
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
                                {errLN !== '' ? <small className="err">{errLN}</small> :null}
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
                                {errEm !== '' ? <small className="err">{errEm}</small> :null}
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
                                {errNv === 0 ? <small className="err">{errNv}</small> :null}
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
                            {errPw !== '' ? <small className="err">{errPw}</small> :null}
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
                                {errCP !== '' ? <small className="err">{errCP}</small> :null}
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