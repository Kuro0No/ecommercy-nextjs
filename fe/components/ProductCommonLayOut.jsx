import { Col, Row, Checkbox, Select, Divider, Radio } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import css from '../styles/ProductCommonLayOut.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { categorySlice, getProducts } from '../redux/reducer'


const { Option } = Select;


const ProductCommonLayOut = ({ children }) => {
    const router = useRouter()
    const dispath = useDispatch()
    let params = new URLSearchParams(router.asPath.slice(9));
    let name = params.get('category')
    let price = params.get('price')

    const category = [
        { name: 'All', id: 0 },
        { name: 'Clothing', id: 4 },
        { name: 'Computer', id: 3 },
        { name: 'Shoes', id: 1 },
        { name: 'Mobile', id: 2 },
    ]
    const idCategory = category.filter(item => item.name.toLowerCase() === name)
    

    const options = ['None', 'Decrease', 'Increase']
    const colors = [
     {name:'Mix', id:1},
     {name:'Grey', id:2},
     {name:'Green', id:3},
     {name:'Black', id:5},
    ]
    const [checked, setChecked] = useState('All')
    

    useEffect(() => {
        // chuaw load data thi query = {}
        if (router.query.category) {
            setChecked(router.query.category[0].toUpperCase() + router.query.category.slice(1))
            
        } else {
            setChecked('All')
        }
    }, [router.query.category, name])

    useEffect(() => {
        if (idCategory.length > 0) {
            
            dispath(getProducts({
                sort: price,
                category: idCategory[0].id,
                color: []
            }))
        } else {
            dispath(getProducts(
                {
                    sort: null,
                    category: 0,
                    color: []
                }))
        }
    }, [])

    const categoryHandle = (e) => {
        const item = category.find(item => item.name === e.target.value)


        if (e.target.value !== 'All') {
            dispath(getProducts({
                sort: null,
                category: item.id,
                color: []
            }))
            router.push(`/product/?category=${e.target.value.toLowerCase()}`)
        } else {
            dispath(getProducts({
                sort: null,
                category: 0,
                color: []
            }))
            router.push(`/product/`)
        }
    }
    const handlePrice = (e) => {
        if (name) {
            if (e !== 'None') {
                router.push(`?category=${name}&price=${e.toLowerCase()}`)
                dispath(getProducts({
                    sort: e,
                    category: idCategory[0].id,
                    color: []
                }))
            } else {
                router.push(`?category=${name}`)
                dispath(getProducts({
                    sort: e,
                    category: idCategory[0].id,
                    color: []
                }))
            }
        } else {
            e !== 'None' ? router.push(`?price=${e.toLowerCase()}`) : router.push(`/product`)
            dispath(getProducts({
                sort: e,
                category: 0,
                color: []
            }))
        }
    }
    const handleColors = (e) => {
        // console.log(e.length>0 ? `${`${router.asPath}&color=${e.join('&color=')}`}` : router.asPath)
        dispath(getProducts({
            sort: price,
            category: idCategory.length>0 ? idCategory[0].id : 0,
            color: e 
        }))
        // router.push(e.length>0 ? `${`${router.asPath}&color=${e.join('&color=')}`}` : router.asPath)
        console.log(params)
    }


    return (
        <Row gutter={[16, 24]} >
            <Col span={4}>
                <div className={css.options_group}>
                    <h1>Category</h1>
                    <Divider className={css.divider} />
                    <ul>
                        <Radio.Group onChange={(e) => categoryHandle(e)} value={checked ? checked : 'All'}>
                            {category.map((item, i) => {

                                return <li key={item.name}>
                                    <Radio value={item.name} id={item.id} name={item.name}>{item.name}</Radio >
                                </li>
                            })}
                        </Radio.Group>
                    </ul>
                </div>
                <div className={css.options_group}>
                    <h1>Price</h1>
                    <Divider className={css.divider} />

                    <Select onChange={(e) => handlePrice(e)} defaultValue="None" style={{ width: 120 }} >
                        {options.map(item => {
                            return <Option key={item} value={item}>{item}</Option>

                        })}
                    </Select>

                </div>
                <div className={css.options_group}>
                    <h1>Color</h1>
                    <Divider className={css.divider} />
                    <Checkbox.Group onChange={(e) => handleColors(e)} >
                        <ul>
                            {colors.map((item) => {

                                return <li key={item.name} >
                                    <Checkbox value={item.id}>{item.name}</Checkbox>
                                </li>
                            })}
                        </ul>
                    </Checkbox.Group>
                </div>
            </Col>
            <Col span={20}>
                {children}

            </Col>
        </Row >
    )
}

export default ProductCommonLayOut