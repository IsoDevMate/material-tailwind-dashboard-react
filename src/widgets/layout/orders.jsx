import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPeopleFill, BsFillHouseAddFill, BsFillCupHotFill, BsFillBellFill } from 'react-icons/bs';
import './MainContext.css'; 
import { useNavigate } from 'react-router-dom';



export const MainContent = () => {
    const [homeOrdersCount, setHomeOrdersCount] = useState(0);
    const [munchOrdersCount, setMunchOrdersCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [alertsCount, setAlertsCount] = useState(0);
    const [ordersData, setOrdersData] = useState([]);
    const [homeOrdersData, setHomeOrdersData] = useState([]);
    const [showHomeOrdersTable, setShowHomeOrdersTable] = useState(false);
    const [showMunchOrdersTable, setShowMunchOrdersTable] = useState(false);
    const [showUsersTable, setShowUsersTable] = useState(false); // State for users table visibility
    const [users, setUsers] = useState([]); // State for users data

    useEffect(() => {
        
        axios.get('http://localhost:8081/order1')
            .then(response => {
                setHomeOrdersCount(response.data.length || 0);
                setHomeOrdersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching home orders:', error);
            });

        // Fetch orders count for munch
        axios.get('http://localhost:8081/order2')
            .then(response => {
                setMunchOrdersCount(response.data.length || 0);
                setOrdersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching Munch orders:', error);
            });

        
        axios.get('http://localhost:8081/login')
            .then(response => {
                setUsers(response.data); 
                setUserCount(response.data.length || 0); 
            })
            .catch(error => {
                console.error('Error fetching login:', error);
            });
        

    }, []);

    const toggleHomeOrdersTable = () => {
        setShowHomeOrdersTable(!showHomeOrdersTable);
        setShowMunchOrdersTable(false);
        setShowUsersTable(false); 
    }

    const toggleMunchOrdersTable = () => {
        setShowHomeOrdersTable(false);
        setShowMunchOrdersTable(!showMunchOrdersTable);
        setShowUsersTable(false); 
    }

    const toggleUsersTable = () => {
        setShowUsersTable(!showUsersTable);
        setShowHomeOrdersTable(false); 
        setShowMunchOrdersTable(false);
    }
    
    const navigate = useNavigate();
    const sendNotificationEmail = () => {
        navigate('/orderupdate');
      };
    

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>
            <div className="main-cards">
                <div className="care" onClick={toggleUsersTable}>
                    <div className="care-inner">
                        <h3>USERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h3>{userCount}</h3>
                </div>
                <div className="care" onClick={toggleHomeOrdersTable}>
                    <div className="care-inner">
                        <h3>Orders From Home</h3>
                        <BsFillHouseAddFill className='card_icon' />
                    </div>
                    <h3>{homeOrdersCount}</h3>
                </div>
                <div className="care" onClick={toggleMunchOrdersTable}>
                    <div className="care-inner">
                        <h3>Orders Within Munch</h3>
                        <BsFillCupHotFill className='card_icon' />
                    </div>
                    <h3>{munchOrdersCount}</h3>
                </div>
                <div className="care" onClick={sendNotificationEmail}>
                    <div className="care-inner">
                        <h3>Send Order Update</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h3>{alertsCount}</h3>
                </div>
            </div>
            {showHomeOrdersTable && (
                <div className="home-orders-table-container">
                    <h3><strong>Orders From Home</strong></h3>
                    <table className="home-orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homeOrdersData.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.address}</td>
                                    <td>{order.origin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showMunchOrdersTable && (
                <div className="orders-table-container">
                    <h3><strong>Orders Within Munch</strong></h3>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Table Number</th>
                                <th>Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.tableNumber}</td>
                                    <td>{order.origin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {showUsersTable && (
                <div className="users-table-container">
                    <h3><strong>User Data</strong></h3>
                    <table className='users-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default MainContent;