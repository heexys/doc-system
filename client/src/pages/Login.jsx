import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    //form handler
    const onFinishHandler = (values) => {
      console.log(values)
    }

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' className='register-form' onFinish={onFinishHandler}>
          <h3 className='text-center'>Login Form </h3>

          <Form.Item label="Email" name='email'>
            <Input type='email' required />
          </Form.Item>

          <Form.Item label="Password" name='password'>
            <Input type='password' required />
          </Form.Item>

          <Link to='/register' className='m-2'>Not a user Register here?</Link>

          <button className='btn btn-primary items-center' type='submit'>Login</button>

        </Form>
      </div>
    </>
  )
}

export default Login