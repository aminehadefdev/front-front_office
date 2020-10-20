import React,{useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'

function ModalAddVideo(props){

    const [title, setTitle] = useState('')
    const [errTl, setTl] = useState('')

    const [path, setPath] = useState('')
    const [errPt, setErrPt] = useState('')

    const [role, setRole] = useState(0)
    const [errRl, serErrRl] = useState('')

    const [image, setImage] = useState(null)
    const [errIm, setIm] = useState('')

    const [description, setDescription] = useState('')
    const [errDs, setErrDs] = useState('')

    const [error, setError] = useState('')

    function addAdmin(event){
        event.preventDefault()
        var data = new FormData()
        data.append('image', image)
        data.append('title' , title)
        data.append('path', path)
        data.append("role", role)
        data.append('description', description)
        var config = {
            method: 'post',
            url: 'http://localhost:8000/admin/video/add',
            headers: { 
                'token': localStorage.getItem('tokenAdmin')
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            props.close()
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    function handleChangeImage(event){
        setImage(event.target.files[0])
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
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={event=>{setTitle(event.currentTarget.value)}}
                                    type="text"
                                    placeholder="Enter title"
                                />
                                {errTl !== '' ? <small className="err">{errTl}</small> :null}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicPath">
                                <Form.Label>Path</Form.Label>
                                <Form.Control
                                    value={path}
                                    onChange={event=>{setPath(event.currentTarget.value)}}
                                    type="text"
                                    placeholder="Enter path video"
                                />
                                {errPt !== '' ? <small className="err">{errPt}</small> :null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicRole">
                                <Form.Label>role</Form.Label>
                                <Form.Control onChange={event=>{setRole(event.currentTarget.value)}} as="select" >
                                    <option value="1">mentore</option>
                                    <option value="2">mentorer</option>
                                </Form.Control>
                                {errRl === 0 ? <small className="err">{errRl}</small> :null}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicImage">
                                <Form.Label>image</Form.Label>
                                 <Form.File
                                    onChange={handleChangeImage}
                                    id="file"
                                    name="image"
                                    accept="image/png, image/jpeg"
                                />
                                {errIm !== '' ? <small className="err">{errIm}</small> :null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={event=>{setDescription(event.currentTarget.value)}}
                            as="textarea"
                            placeholder="Enter description"
                            rows="3"
                        />
                    </Form.Group>
                    {errDs !== '' ? <small className="err">{errDs}</small> :null}
                    <Modal.Footer>
                        <Button onClick={props.close} variant="secondary">Close</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddVideo