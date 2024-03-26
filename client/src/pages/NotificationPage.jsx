import { Tabs, message, notification } from 'antd';
import Layout from '../components/Layout';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('0');
  
  
  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
    localStorage.setItem('activeTab', key);
  };

  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

// handle read notification
  const handleMarkAllRead = async () => {
    if(user.notifcation.length === 0) {
      message.info('all message already read')
      localStorage.setItem('activeTab', '1')
      setTimeout(() => {
        window.location.reload();
      }, 1550);
    } else {
      try {
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/get-all-notification', {
          userId:user._id
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        localStorage.setItem('activeTab', '1')
        window.location.reload()
        dispatch(hideLoading())
        if(res.data.message) {
          message.success(res.data.message)
        } else {
          message.error(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("something went wrong")
      }
    }
  }

// delete notifications
  const handleDeleteAllRead = async (req,res) => {
    if(user.seennotification.length === 0) {
      message.info('all message already deleted')
      localStorage.setItem('activeTab', '0')
      setTimeout(() => {
        window.location.reload();
      }, 1700);
    } else {
      try {
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/delete-all-notification', {userId:user._id}, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        window.location.reload()
        dispatch(hideLoading())
        if(res.data.message){
          message.success(res.data.message)
        } else {
          message.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        message.error('Something Went Wrong In Notifications')
      }
    }
  }

  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification Page</h4>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {user?.notifcation.map((notificationMgs) => (
              <div
                className="card"
                style={{cursor:'pointer'}}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h4 className='p-2 text-primary'style={{cursor: 'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
            {user?.seennotification.map((notificationMgs) => (
              <div
                className="card"
                style={{cursor:'pointer'}}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
    </Layout>
    )
}

export default NotificationPage