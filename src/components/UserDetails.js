import { React, useEffect, useState } from 'react'
import userLogo from '../assets/img/user.jpg';
import { Link, useParams } from "react-router-dom"

function UserDetails() {
    const params = useParams();
    const userDetails = {
        name: '',
        email: '',
        phone: '',
        website: '',
        company: {
            name: ''
        },
        address: {
            street: '',
            city: "",
            zipcode: ''
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
        <>
            <div className="row mt-30">
                <div className="col-lg-4">
                    <div className="card card-div">
                        <img className="card-img-top" src={userLogo} alt="Card image cap" />

                    </div>
                </div>
                <div className="col-lg-8 mt-15">
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Name</label>
                                <h6 class="displayvalue">{user.name}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Email</label>
                                <h6 class="displayvalue">{user.email}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Phone</label>
                                <h6 class="displayvalue">{user.phone}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Website</label>
                                <h6 class="displayvalue">{user.website}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Company</label>
                                <h6 class="displayvalue">{user.company.name}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">Website</label>
                                <h6 class="displayvalue">{user.website}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">street</label>
                                <h6 class="displayvalue">{user.address.street}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">city</label>
                                <h6 class="displayvalue">{user.address.city}</h6>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div class="form-group">
                                <label class="blocklabel">zipcode</label>
                                <h6 class="displayvalue">{user.address.zipcode}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div class="form-group">
                            <Link to={'/users/'} className="btn btn-primary">Go back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails
