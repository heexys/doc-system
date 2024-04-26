import React, {useEffect,useState} from 'react';
import Layout from '../../components/Layout';

import axios from 'axios';
import { Table, message } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([])

//getUsers
const getUsers = async () => {
  try {
    const res = await axios.get('/api/v1/admin/getAllUsers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if(res.data.success) {
      setUsers(res.data.data)
    }
  } catch (error) {
    console.log(error)
  }
};

  useEffect(() => {
    getUsers();
  }, []);

  //handle admin account
  const handleAdmin = async (record) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAdminStatus',
    {id: record},
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if(res.data.success) {
      message.success(res.data.message)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } 
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message, 4.7);
    } else {
        message.error('Something Went Wrong');
    }
    }
  } 

  // antD table col
  const columns = [
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title:'Email',
      dataIndex:'email',
    },
    {
      title:'Admin',
      dataIndex:'isAdmin',
      render: (text,record) => (
        <span>
          {record.isAdmin ?
            <button className='btn btn-success' onClick={() => {handleAdmin(record._id)}}>Admin</button> :
            <button className='btn btn-primary' onClick={() => {handleAdmin(record._id)}}>setAdmin</button>
          }
        </span>
      )
    },
    {
      title:'Doctor',
      dataIndex:'isDoctor',
      render: (text,record) => (
        <span>{record.isDoctor ? 'Yes' : "No"}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (text,record) => (
        <div className='d-flex'>
          <button className='btn btn-danger' onClick={() => {message.error('func not done')}}>Block</button>
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-2'>Users List</h1>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users