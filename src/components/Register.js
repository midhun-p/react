import { React, useState, useEffect } from 'react'
import { Formik } from 'formik';
import { Link } from "react-router-dom"

const validateLogin = empData => {
    const errors = {};
    if (!empData.FirstName) {
        errors.FirstName = 'First Name is required';
    }
    if (!empData.LastName) {
        errors.LastName = 'Last Name is required';
    }

    if (empData.Country === "0") {
        errors.Country = 'Country is required';
    }
    if (empData.State === "0") {
        errors.State = 'State is required';
    }
    if (!empData.UserName) {
        errors.UserName = 'Please Enter Email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.UserName)) {
        errors.UserName = 'Invalid Email address';
    }
    if (!empData.Password) {
        errors.Password = 'Please Enter Password';
    }

    if (!empData.TCAgree) {
        errors.TCAgree = 'Please agree Terms and Conditions';
    }

    return errors;
};

function Register(props) {
    const [loginErrorMessage, setloginError] = useState();
    const [CountryList, setCountryList] = useState([]);
    const [StateList, setStateList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:64377/api/common/countries')
            .then(response => response.json())
            .then(res => {
                 setCountryList(res);
            })
    },[]);

    const getStates = country => {
        fetch('http://localhost:64377/api/common/states/'+ country)
            .then(response => response.json())
            .then(res => {
                setStateList(res);
            })
    };

    return (
        <div className="container login-div">
        <Formik 
        initialValues = {{
            FirstName: '',
            LastName: '',
            Address: '',
            Country: '0',
            State: '0',
            Zip: '',
            UserName: '',
            Password: '',
            TCAgree: false
        }}
        validate = {validateLogin}
        onSubmit ={async (values) => {
            console.log((values));
            fetch('http://localhost:64377/api/user/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(res => {
                if (res.isSuccess) {
                    let path = `/home`;
                    props.history.push(path);
                }
                else {
                    setloginError(res.errorMessage);
                }
            }, err => {
                setloginError('Error');
            });
        }}>

        {props => {
          const {
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit} autoComplete="false" >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" className="form-control" id="FirstName" name="FirstName" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} />
                        {touched.FirstName && errors.FirstName ? <span style={{ color: 'red' }}>{errors.FirstName}</span> : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" className="form-control" id="LastName" name="LastName" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} />
                        {touched.LastName && errors.LastName ? <span style={{ color: 'red' }}>{errors.LastName}</span> : null}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" name="Address" placeholder="1234 Main St" onChange={handleChange} onBlur={handleBlur} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="form-control" 
                           onChange={handleChange}
                            onChange={
                                async e => {
                                const { value } = e.target;
                                await getStates(value);
                                setFieldValue('Country', value)
                            }} 
                            onBlur={handleBlur}>
                            <option key="0" value="0">Choose...</option>
                            {CountryList.map(cnt => (
                                <option key={cnt.id} value={cnt.id}>{cnt.name}</option>
                            ))}
                        </select>
                        {touched.Country && errors.Country ? <span style={{ color: 'red' }}>{errors.Country}</span> : null}
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control" name="State" onChange={handleChange} onBlur={handleBlur}>
                            <option value="0">Choose...</option>
                            {StateList.map(cnt => (
                                <option value={cnt.id}>{cnt.name}</option>
                            ))}
                        </select>
                        {touched.State && errors.State ? <span style={{ color: 'red' }}>{errors.State}</span> : null}
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip" name="Zip" onChange={handleChange} onBlur={handleBlur} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="UserName">Email Address</label>
                        <input type="email" className="form-control" name="UserName" id="UserName" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
                        {touched.UserName && errors.UserName ? <span style={{ color: 'red' }}>{errors.UserName}</span> : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" name="Password" id="Password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} />
                        {touched.Password && errors.Password ? <span style={{ color: 'red' }}>{errors.Password}</span> : null}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" name="TCAgree" onChange={handleChange} onBlur={handleBlur} />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Agree Terms and Conditions
                      </label>
                    </div>
                    {touched.TCAgree && errors.TCAgree ? <span style={{ color: 'red' }}>{errors.TCAgree}</span> : null}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              <Link to='/login'><button type="button" className="btn btn-link">Log In</button></Link>
            </form>
          );
          }}
        </Formik>
        <br/>
        {loginErrorMessage ? <div className="alert alert-danger" role="alert">
         {loginErrorMessage}
        </div> : null}

        </div>
    )
}

export default Register
