import css from '../styles/LoginForm.module.scss'
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import axiosConfig from '../axiosConfig'
import { useRouter } from 'next/router'
import { userLogin } from '../redux/userReducer';
import { useDispatch } from 'react-redux';


const Login = () => {

    const [loading, setLoading] = useState(false)
    const dispath = useDispatch()
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            dispath(userLogin({
                email: form.email,
                password: form.password
            }))
            
            // router.push('/product')
        } catch(er) {
            alert(er)
        }
        setLoading(false)

    }
    return (
        <>

            <div className={css.loginDiv} >
                <form onSubmit={(e)=> onSubmit(e)} className={css.loginForm} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({
                            ...form, email: e.target.value
                        })} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({
                            ...form, password: e.target.value
                        })} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <Button loading={loading} type="primary" htmlType='submit' shape="round" >
                        Login
                    </Button>
                </form>
                <div className={css.div2login}>
                    Need an account? <Link href='/register'><a >Register!</a></Link>
                </div>
            </div>

        </>
    )
};

export default Login;