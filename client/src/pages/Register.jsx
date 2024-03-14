import {Link} from 'react-router-dom';

import { Button, Checkbox, Form, Input } from 'antd';
import '../styles/RegisterStyles.css';


const Register = () => {

  //form handler
  const onFinishHandler = (values) => {
    console.log(values)
  }

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' className='register-form' onFinish={onFinishHandler}>
          <h3 className='text-center'>Register Form </h3>

          <Form.Item label="Name" name='name'>
            <Input type='text' required />
          </Form.Item>

          <Form.Item label="Email" name='email'>
            <Input type='email' required />
          </Form.Item>

          <Form.Item label="Password" name='password'>
            <Input type='password' required />
          </Form.Item>

          <Link to='/login' className='m-2'>Already have account?</Link>

          <button className='btn btn-primary items-center' type='submit'>Register</button>

        </Form>
      </div>
    </>
  )
}

export default Register