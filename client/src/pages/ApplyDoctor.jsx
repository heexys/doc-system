import React from 'react';
import Layout from './../components/Layout';

import { Form, Row, Input, Col, TimePicker } from 'antd';

const ApplyDoctor = () => {
    //handle form
    const handleFinish = (values) => {
        console.log(values)
    }
  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3' >
            <h4 className=''>Personal Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='First Name' name="firstName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your first name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Last Name' name="lastName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your last name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Phone Number' name="phone" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your contact number' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Email' name="email" required rules={[{required:true}]}>
                        <Input type='email' placeholder='your email address' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Website' name="website">
                        <Input type='text' placeholder='your website' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Address' name="address" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your clinic address' />
                    </Form.Item>
                </Col>
            </Row>
            <h4 className=''>Professional Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Specialization' name="specialization" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your specialization' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Experience' name="experience" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your experience' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Fees Per Cunsaltion' name="feesPerCunsaltation" required rules={[{required:true}]}>
                        <Input type='text' placeholder='your name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Timings' name="timings" required>
                        <TimePicker.RangePicker format="HH:mm"/>
                    </Form.Item>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor