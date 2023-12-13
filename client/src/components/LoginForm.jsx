import React,{useState} from 'react'
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { Form, Button,Container,Row,Col,Card } from 'react-bootstrap';



const gradientStyle = {
  background: 'linear-gradient(180deg, rgba(12, 9, 58, 1) 0%, rgba(71, 136, 134, 1) 23%, rgba(40, 169, 186, 1) 44%, rgba(46, 141, 153, 1) 79%, rgba(44, 144, 157, 1) 88%, rgba(0, 212, 255, 1) 100%)',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    } );
  }
    
  const loginUser = async (e)=>{
    e.preventDefault();
    const {email,password} = data;
    try{
      const {data} = await axios.post('/login', {
       email,password
      });
    
      if(data.error){
        toast.error(data.error);
      }else{
        setData({
          email: '',
          password: '',
        });
        toast.success('Login Successful. Welcome!');
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        
        navigate('/');
        
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
     <div style={gradientStyle}>
    <Container>
    <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={4} xs={12}>
          
        <Card className="px-4" style={{
    background: 'linear-gradient(180deg, rgba(12,9,58,1) 0%, rgba(44,50,84,1) 28%)'}}>
              <Card.Body>
                    <div type="submit" className="text-center text-light" style={{ backgroundColor: '#209dad', width:'40%',marginLeft:'30%',position:'absolute', top:'-20px',padding:'10px',right:'30%'}}>
                      Login
                    </div>
            <div className="mb-3 mt-md-4">
                  
                  <div style={{ width: '80px',margin: 'auto', marginBottom: '50px'}}>
                    <img src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" alt="" style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }} />
                </div>
              <div className="mb-3">
                <Form onSubmit={loginUser}>
                

                  <Form.Group className="mb-3" controlId="formBasicEmail">
          
                    <Form.Control type="email" placeholder="Enter email" value = {data.email} name='email' onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                   
                    <Form.Control type="password" placeholder="Password" value = {data.password} name='password' onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicCheckbox"
                  ></Form.Group>
                  <div className="d-grid mt-5">
                    <Button type="submit" style={{ backgroundColor: '#209dad', width:'40%',marginLeft:'30%'}}>
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center text-light">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary fw-bold">
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</div>
  )
}

export default LoginForm
