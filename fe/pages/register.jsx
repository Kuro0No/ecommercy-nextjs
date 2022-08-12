
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import css from '../styles/Register.module.scss'
import { InputNumber } from 'antd';
import { useForm } from "react-hook-form";
import axiosConfig from '../axiosConfig'
import { Select } from 'antd';

const { Option } = Select;


const Register = () => {

    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        city: [],
        district: [],
        ward: []
    })
    const [idAddress, setIdAddress] = useState({
        idCity: '',
        idDistrict: ''
    })
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const res = await axiosConfig.post(`user/register/`, {
            email: data.email,
            name: data.name,
            password: data.password,
        })
    }
    const handleAddressCity = async address => {

        const res = await axiosConfig.get(`/address/cities`)
        setAddress({ ...address, city: res.data,district:[], ward:[] })

    }
    const handleDistrictOrWard = async (arg) => {
        if (arg.type === 'district') {
            const res = await axiosConfig.get(`/address/city/${arg.city_id}`)
            setAddress({ ...address, district: res.data.districts })

        } else {
            const res = await axiosConfig.get(`/address/district/${arg.district_id} `)
            setAddress({ ...address, ward: res.data.wards })
        }

    }

    return (
        <>


            <div className={css.registerDiv}>

                <form onSubmit={handleSubmit(onSubmit)} className="registerForm " >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" >Display Name</label>
                        <input {...register("name")} type="text" className="form-control" id="name" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input {...register("email")} type="email" className="form-control" id="email" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label" >Phone</label>
                        {/* <InputNumber  ref={{...register("phone")}} name="phone" className={`mb-3 ${css.phone}`} controls={false} /> */}
                        <input {...register("phone")} type="phone" className="form-control" id="phone" />
                    </div>
                    <div className="mb-3 d-flex">
                        <div>
                            <label className="me-2">City</label>
                            <Select onSelect={(id) => handleDistrictOrWard({ type: 'district', city_id: id })} onFocus={() => handleAddressCity()} defaultValue="Select city" style={{ width: 120 }} >
                                {address.city.map(item => (
                                    <>
                                        <Option key={item.id} value={item.id}>{item.name}</Option>

                                    </>
                                ))}


                            </Select>
                        </div>
                        <div>
                            <label className="me-2">District</label>

                            <Select onSelect={(id) => handleDistrictOrWard({ type: 'ward', district_id: id })} defaultValue="Select district" style={{ width: 120 }} >
                                {address.district?.map(item => (
                                    <>

                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    </>
                                ))}

                            </Select>
                        </div>
                        <div>
                            <label className="me-2">Ward</label>
                            <Select defaultValue="lucy" style={{ width: 120 }} >
                                {address.ward?.map(item => (
                                    <>

                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    </>
                                ))}


                            </Select>
                        </div>
                        {/* <label htmlFor="phone" className="form-label" >Phone</label> */}
                        {/* <input {...register("phone")} type="phone" className="form-control" id="phone" /> */}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" >Password</label>
                        <input {...register("password")} type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" />
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
