import { Col, Row, Checkbox, Select, Divider, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import css from '../styles/ProductCommonLayOut.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { categorySlice, getProducts, getSortPriceProducts } from '../redux/reducer'


const { Option } = Select;


const ProductCommonLayOut = ({ children }) => {
    const router = useRouter()
    // const {params } =  router.query
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

    const options = ['Decrease', 'Increase']
    const colors = ['Grey', 'Black', 'Mix']
    const [checked, setChecked] = useState('All')
    console.log(idCategory)


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
                sort: '',
                category: idCategory[0].id,
                color: ''
            }))

        } else {
            dispath(getProducts(
                {
                    sort: '',
                    category: 0,
                    color: ''
                }))
        }
    }, [idCategory])



    const categoryHandle = (e) => {

        if (e.target.value !== 'All') {
            router.push(`/product/?category=${e.target.value.toLowerCase()}`)
        } else {
            router.push(`/product/`)

        }
        dispath(getProducts(
            {
                sort: '',
                category: idCategory[0].id,
                color: ''
            }
        ))

    }
    const handlePrice = (e) => {
        dispath(getProducts({
            sort: e,
            category: idCategory[0].id,
            color: ''
        }))
        // if (name) {
        //     router.push(`?category=${name}&price=${e.toLowerCase()}`)

        // } else {
        //     router.push(`?price=${e.toLowerCase()}`)

        // }

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

                    <Select onChange={(e) => handlePrice(e)} style={{ width: 120 }} >
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