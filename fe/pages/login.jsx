import css from '../styles/LoginForm.module.scss'
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import Link from 'next/link';



const Login = () => {

    const [loading, setLoading] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    return (
        <>

            <div className={css.loginDiv} >
                <form className={css.loginForm} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
                        <input type="email" className="form-control" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <Button type="primary" htmlType='submit' disabled={loading} loading={loading} shape="round" >
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