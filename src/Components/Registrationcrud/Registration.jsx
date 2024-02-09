import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import React, { useState } from 'react'

function Registration() {
    const [show, setShow] = useState(false);
    const [allData,setAllData] =useState([{}]);
    const handleClose=()=>setShow(false);
    const handleShow=()=>setShow(true);
    const [index,setIndex] = useState(0);
    const [buttonState, setButtonState] = useState(true);
    const [input,setInput] = useState({
        name:"",
        email:"",
        pass:"",
        mbno:""
    })

    function getInputData(e) {
        let target=e.target;
        // console.log(target);
        let value=target.value;
        // console.log(value);
        // console.log(key, "=", value);
        let key=target.name;
        return(
            setInput((old)=>{
                return {
                    ...old,
                    [key]:value
                }
            })
        )
        
    }

    let temp={}
    
    const formData = (e) => {
        e.preventDefault();
        let formd=e.target;
        // console.log(formd);
        let formData = new FormData(formd);
        // console.log(formData);
        // console.log(formData.get("name"));
        // console.log(formData.get("email"));
        // console.log(formData.get("mbno"));
        // console.log(formData.get("pic"));
        // console.log(formData.get("pass"));

        
        for (let data of formData.entries()) {
            // console.log(data);
            let key=data[0];
            let value= data[1];
            // console.log(value);
            // console.log(typeof(value));

            if (typeof(value)==='object') {
                value = URL.createObjectURL(value)
            }

            temp[key]=value;
            // console.log(temp);
            // console.log(value);
        }
        
    }

    function deleteUser(index){
        // console.log(ite);
        let tempdata=[...allData];
        // console.log(tempdata);
        tempdata.splice(index,1);
        // console.log(tempdata);
        return (
            setAllData(tempdata)
        )
    }

    function editData(item) {
        // console.log(item);
        // alert(item.index);
        return (
            setShow(true),
            setInput(item),
            setButtonState(false),
            setIndex(item.index)
        )
    }

    function addButton(){
        return(
            setShow(true),
            setInput({
                name:"",
                email:"",
                pass:"",
                mbno:""
            }),
            setButtonState(true)
        )
    }

    function insertData(e) {
        e.preventDefault();
        // alert("inset data");
        formData(e);
        return (
            setAllData((old)=>{
                return [
                    ...old,
                    temp
                ]
            }),
            setShow(false),
            setInput ({
                name:"",
                email:"",
                pass:"",
                mbno:""
            })

        )
    }

    function updateData(e) {
        e.preventDefault();
        // alert("update data");
        formData(e);
        // console.log(temp)
        // alert(index)
        const tempData=[...allData];
        console.log(tempData)
        tempData[index]=temp;
        // console.log(tempData);
        return(
            setShow(false),
            setAllData(tempData)
        )
    }

    function Tr({item}) {
        return(
            <>
                <tr className='text-center'>
                    <td>{item.index+1}</td>
                    <td><img src={item.pic} alt='' width={50} height={50} className='rounded-circle'  /></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.pass}</td>
                    <td>{item.mbno}</td>
                    <td>
                        <Button className='me-2' onClick={()=>{editData(item)}}>
                            <i className="fa fa-edit"></i>
                        </Button>
                        <Button variant='danger' onClick={()=>{deleteUser(item.index)}}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </td>
                </tr>
            </>
        ) 
    }
  return (
    <>
        <Button className='position-absolute end-0 bottom-0 m-4' onClick={addButton}>
            <i className="fa fa-plus"></i>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registration CRUD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={buttonState ? insertData : updateData}>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                        type='text' 
                        name='name' 
                        placeholder='Enter Full Name'
                        onChange={getInputData}
                        value={input.name}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='email' 
                        name='email' 
                        placeholder='Enter Email id'
                        onChange={getInputData}
                        value={input.email}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        name='pass' 
                        placeholder='Enter Password'
                        onChange={getInputData}
                        value={input.pass}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mobile no.</Form.Label>
                        <Form.Control 
                        type='tel' 
                        name='mbno' 
                        placeholder='Enter Mobile No.'
                        onChange={getInputData}
                        value={input.mbno}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Upload Picture</Form.Label>
                        <Form.Control type='file' name='pic' placeholder='upload picture'/>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        {
                            buttonState ? <Button type='submit' variant='success' className='me-3'>Submit</Button> :
                            <Button type='submit' variant='info' className='me-3'>Update</Button>
                        }
                        <Button type='reset' variant='danger'>Cancel</Button>
                    </Form.Group>
                </Form>
                {/* <p>{JSON.stringify(input)}</p> */}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
        <Container>
        <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>SR. No.</th>
          <th>Picture</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Mobile No</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            allData.map((item,index)=>{
                item['index']=index;
                return <Tr item={item} key={index} />
            })
        }
      </tbody>
    </Table>
        </Container>
    </>
  )
}

export default Registration