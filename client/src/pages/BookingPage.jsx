import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {DatePicker, TimePicker} from 'antd';
import moment from "moment";

const BookingPage = () => {

    const params = useParams()
    const [doctors, setDoctors] = useState([])
    const [date, SetDate] = useState()
    const [timings, SetTimings] = useState()
    const [isAvailable, SetIsAvailable] = useState()

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {doctorId: params.doctorId},{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
        <h1>Booking Page</h1>
        <div className="container">
            {doctors && (
                <div>
                    <h4> Dr. {doctors.firstName} {doctors.lastName}</h4>
                    <h4>Fees: {doctors.feesPerCunsaltation}</h4>
                    {doctors.timings ? (<h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4>):<></>}
                    <div className="d-flex flex-column w-50">
                        <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value) => SetDate(moment(value).format('DD-MM-YYYY'))} />
                        <TimePicker.RangePicker className='m-2' format="HH:mm" onChange={(values) => SetTimings([
                            moment(values[0]).format('HH:mm'),
                            moment(values[1]).format('HH:mm'),
                            ])} />
                        <button className='btn btn-primary mt-2'>Check Aviability</button>
                    </div>
                </div>
            )}
        </div>
    </Layout>
  )
}

export default BookingPage