import React from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom"
import '../App.css';

const validateLogin = empData => {
    const errors = {};
    if (!empData.UserName) {
        errors.UserName = 'Please Enter Email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.UserName)) {
        errors.UserName = 'Invalid Email address';
    }
    if (!empData.Password) {
        errors.Password = 'Please Enter Password';
    }

    return errors;
};



const Login = (props) => {

    const [loginErrorMessage, setloginError] = React.useState();
    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validate: validateLogin,
        onSubmit: (values, {resetForm}) => {
            fetch('http://localhost:64377/api/user/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            }).then(res => {
                resetForm({})
                if(res.ok){
                    let path = `/home`;
                    props.history.push(path);
                }
                else{
                    setloginError('Username or password is incorrect.');
                }
            }, err => {
                setloginError('Username or password is incorrect.');
            });
        }
    });

    return (

        <div className="container login-div">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email address</label>
                    <input type="text" name="UserName" className="form-control" id="UserName" value={formik.values.UserName}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.UserName && formik.errors.UserName ? <span style={{ color: 'red' }}>{formik.errors.UserName}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="passWord">Password</label>
                    <input type="text" name="Password" type="password" className="form-control" id="Password" value={formik.values.Password}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.Password && formik.errors.Password ? <span style={{ color: 'red' }}>{formik.errors.Password}</span> : null}
                </div>

                <button type="submit" className="btn btn-primary">Log In</button>
                <button type="button" className="btn btn-link"><Link to='/register'>Register</Link></button>
            </form>
            <br />
            {loginErrorMessage ? <div className="alert alert-danger" role="alert">
                Username or password is incorrect.
            </div> : null}

        </div>
    )
}
export default Login

