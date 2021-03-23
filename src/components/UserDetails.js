import { React, useEffect, useState } from 'react'
import userLogo from '../assets/img/user.jpg';
import { Link, useParams } from "react-router-dom"

function UserDetails() {
    const params = useParams();
    const userDetails = {
        name: '',
        email:'',
        phone:'',
        website:'',
        company:{
            name:''
        }
    }
    const [user, setuserDetails] = useState(userDetails);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/' + params["id"])
            .then(response => response.json())
            .then(res => {
                setuserDetails(res);
            })
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card card-div">
                        <img className="card-img-top" src={userLogo} alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <p className="card-text">{user.phone}</p>
                            <p className="card-text">{user.website}</p>
                            <p className="card-text">{user.company.name}</p>
                            <Link to={'/users/'} className="btn btn-primary">Go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
