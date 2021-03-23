import { React, useEffect, useState } from 'react'
import userLogo from '../assets/img/user.jpg';
import { Link } from "react-router-dom"
function Users() {
    const [userList, setUserList] = useState([]);
    const [viewType, setVewType] = useState('1');
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(res => {
                setUserList(res);
            })
    }, []);


    const setView = (viewType) => {
        setVewType(viewType);
    }

    return (
        <div>
            <div className="row mt-30">
                <div className="col-lg-8" ></div>
                <div className="col-lg-4" >
                    <div className="form-group float-right">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => setView(1)}>Card View</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setView(2)}>Table View</button>
                    </div>
                </div>
            </div>
            {viewType == "1" ?
                <div className="row">
                    {userList.map(user => (
                        <div className="col-lg-4 col-md-4" key={user.id}>
                            <div className="card card-div">
                                <img className="card-img-top" src={userLogo} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                    <p className="card-text">{user.phone}</p>
                                    <p className="card-text">{user.website}</p>
                                    <p className="card-text">{user.company.name}</p>
                                    <Link to={'/user-details/' + user.id} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                :
                <div className="row table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Website</th>
                                <th scope="col">Company</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(user => (
                                <tr>
                                    <td scope="row">
                                        <img className="card-img-top tbl-img" src={userLogo} alt="Card image cap" />
                                    </td>
                                    <td>
                                        <Link to={'/user-details/' + user.id}>{user.name}</Link>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.website}</td>
                                    <td>{user.company.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Users
