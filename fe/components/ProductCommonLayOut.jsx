import { Col, Row, Checkbox, Select, Divider, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import css from '../styles/ProductCommonLayOut.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { categorySlice, getProducts } from '../redux/reducer'


const { Option } = Select;


const ProductCommonLayOut = ({ children }) => {
    const router = useRouter()
    // const {params } =  router.query
    const dispath = useDispatch()


    const category = ['All', 'Mobile', 'Clothing', 'Computer', 'Shoes',]
    const options = ['Decrease', 'Increase']
    const colors = ['Grey', 'Black', 'Mix']
    const [checked, setChecked] = useState('All')
    useEffect(() => {

        router.query.category ?
            setChecked(router.query.category[0].toUpperCase() + router.query.category.slice(1))
            :
            setChecked('All')


    }, [router.query.category])
    
    


    const categoryHandle = (e) => {

        dispath(getProducts(e.target.value.toLowerCase()))
        if (e.target.value !== 'All') {
            router.push(`/product/?category=${e.target.value.toLowerCase()}`)
        } else {
            dispath(getProducts(undefined))
            router.push(`/product`)

        }

    }


    return (
        <Row gutter={[16, 24]} >
            <Col span={4}>
                <div className={css.options_group}>
                    <h1>Category</h1>
                    <Divider className={css.divider} />
                    <ul>
                        <Radio.Group onChange={(e) => categoryHandle(e)} defaultValue='All' value={checked ? checked : 'All'}>
                            {category.map((item, i) => {
                                return <li key={item}>
                                    <Radio value={item}>{item}</Radio >
                                </li>
                            })}
                        </Radio.Group>
                    </ul>
                </div>
                <div className={css.options_group}>
                    <h1>Price</h1>
                    <Divider className={css.divider} />

                    <Select style={{ width: 120 }} >
                        {options.map(item => {
                            return <Option key={item} value={item}>{item}</Option>
                        })}
                    </Select>

                </div>
                <div className={css.options_group}>
                    <h1>Color</h1>
                    <Divider className={css.divider} />

                    <ul>
                        {colors.map((item, i) => {

                            return <li key={item} >
                                <Checkbox >{item}</Checkbox>
                            </li>
                        })}
                    </ul>
                </div>
            </Col>
            <Col span={20}>
                {children}

            </Col>
        </Row>
    )
}

export default ProductCommonLayOut