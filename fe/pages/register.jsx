
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import css from '../styles/Register.module.scss'
import { InputNumber } from 'antd';
import { useForm } from "react-hook-form";
import axiosConfig from '../axiosConfig'



const Register = () => {
    
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // axiosConfig.post(`user/register/`)
        console.log(data)
    }

    return (
        <>


            <div className={css.registerDiv}>

                <form onSubmit={handleSubmit(onSubmit)} className="registerForm " >
                    <div className="mb-3">
                        <label htmlFor="displayname" className="form-label" >Display Name</label>
                        <input {...register("displayname")} type="text" className="form-control" id="displayname" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input {...register("email")} type="email" className="form-control"  id="email" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label" >Phone</label>
                        <InputNumber ref={{...register("phone")}} name="phone" className={`mb-3 ${css.phone}`} controls={false} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" >Password</label>
                        <input {...register("password")}  type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control"  id="confirmPassword" />
                    </div>


                    <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="text-center">
                    Already have an account? <Link href='/login'><a >Log In</a></Link>
                </div>
            </div>
        </>
    )
};

export default Register;
