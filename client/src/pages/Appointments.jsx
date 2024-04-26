import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {

  const [doctors,setDoctors] = useState([])

  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/user/user-appointments',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      })

      const resDoctors = await axios.get('/api/v1/admin/getAllDoctors', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if(res.data.success) {
        setAppointments(res.data.data)
        if(resDoctors.data.success) {
          setDoctors(resDoctors.data.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const columns = [
    {
      title:'ID',
      dataIndex:'_id'
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      render: (text, record) => {
        const doctor = doctors.find(doctor => doctor._id === record.doctorId)
        return (
          <span>
            {doctor.firstName} {doctor.lastName}
          </span>
        )
      }
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => {
        const doctor = doctors.find(doctor => doctor._id === record.doctorId)
        return (
          <span>
          {doctor.phone}
        </span>
        )
      }
    },
    {
      title: "Dane & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')} &nbsp;
          {moment(record.time).format('HH:mm')}
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",      
    },
  ]

  return (
    <Layout>
        <h1>Appoinmtents Lists</h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments