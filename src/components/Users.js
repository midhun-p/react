import { React, useEffect, useState } from 'react'
import userLogo from '../assets/img/user.jpg';
import { Link } from "react-router-dom"
function Users() {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(res => {
                setUserList(res);
            })
    }, []);
    return (
        <div>
            <div className="row">
                {userList.map(user => (
                    <div className="col-lg-4">
                        <div className="card card-div">
                            <img className="card-img-top" src={userLogo} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <p className="card-text">{user.phone}</p>
                                <p className="card-text">{user.website}</p>
                                <p className="card-text">{user.company.name}</p>
                                <Link to={'/user-details/'+user.id} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Users
