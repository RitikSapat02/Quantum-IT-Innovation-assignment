import React, { useEffect } from 'react';
import {Container,Row,Col, Table,Button} from "react-bootstrap";
import DummyData from '../Data/dummy_data';
import {toast} from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';




const ProtectedData = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  useEffect(() => {
    if (!user) {
      toast.error("You are not Logged in");
      navigate('/login')
    }
  },[user,navigate])
  
  if (user) {
    return (
      <div>
        <Button onClick={() => {

          localStorage.removeItem('user');
          navigate('/login');
        }
        }>logout</Button>
        <Container>
          <Row>
            <Col>
              <p className="fst-italic">{user && `Hi ${user.name}`}</p>
              <h3 className="text-primary">Dummy Table</h3>
            </Col>
          
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover className="shadow-lg text-center">
                <thead>
                  <tr>
                    <th>SNO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Comapny</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    DummyData.length > 0 &&
                    DummyData.map(user => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.website}</td>
                          <td>{user.company.name}</td>
                          <td>{user.address.city}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Col>
          
          </Row>
        </Container>
      </div>
    )
  }
}

export default ProtectedData;

