import { Col, Row, Checkbox, Select, Divider, Radio } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import css from '../styles/ProductCommonLayOut.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { categorySlice, getProducts, getSearchProducts } from '../redux/reducer'


const { Option } = Select;


const ProductCommonLayOut = ({ children }) => {
    const router = useRouter()
    const dispath = useDispatch()
    let params = new URLSearchParams(router.asPath.slice(9));
    let name = params.get('category')
    let q = params.get('search')
    let price = params.get('sort')
    let colorsQuery = params.getAll('color')

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
        { name: 'Mix', id: 1 },
        { name: 'Grey', id: 2 },
        { name: 'Green', id: 3 },
        { name: 'Black', id: 5 },
    ]
    const [checked, setChecked] = useState('All')
    const [sort, setSort] = useState('None')
    const [color, setColor] = useState([])

    useEffect(() => {
        // chuaw load data thi query = {}
        const checkColor = colors.filter(item => colorsQuery.includes(item.name.toLowerCase())).map(item => item.id)

        router.query.category ? setChecked(router.query.category[0].toUpperCase() + router.query.category.slice(1)) : setChecked('All')
        router.query.sort ? setSort(router.query.sort[0].toUpperCase() + router.query.sort.slice(1)) : setSort('None')
        colorsQuery.length == 0 ? setColor([]) : setColor(checkColor) //setColor([]) : setColor(colorsQuery)



    }, [name]) //Object.keys(router.query)


    useEffect(() => {
        q ?
            dispath(getSearchProducts(q))
            :
            dispath(getProducts({
                sort: price && price !== 'none' ? price[0].toUpperCase() + price.slice(1) : null,
                category: idCategory.length > 0 ? idCategory[0].id : 0,
                color: colorsQuery.length > 0 ? colors.filter(element => colorsQuery.includes(element.name.toLowerCase())).map(item => item.id) : []
            }))

    }, [])


    const categoryHandle = (e) => {
        const item = category.find(item => item.name === e.target.value)

        dispath(getProducts({
            sort: null,
            category: e.target.value !== 'All' ? item.id : 0,
            color: []
        }))
        setSort('None')
        setColor([])

        router.push({
            pathname: '/product',
            query: {
                ...(e.target.value !== 'All') && { category: e.target.value.toLowerCase() },

            }
        })
    }
    const handlePrice = (e) => {
        setSort(e)
        if (name) {
            dispath(getProducts({
                sort: e,
                category: idCategory[0].id,
                color: []
            }))
        } else {
            dispath(getProducts({
                sort: e,
                category: 0,
                color: []
            }))
        }
        router.push({
            query: {
                ...(name) && { category: name },
                ...(e !== "None") && { sort: e.toLowerCase() },
                ...(colorsQuery) && { color: colorsQuery }
            }
        })

    }
    const handleColors = (e) => {
        setColor(e)
        dispath(getProducts({
            sort: price,
            category: idCategory.length > 0 ? idCategory[0].id : 0,
            color: e
        }))


        router.push({

            query: {
                ...(name) && { category: name },
                ...(price) && { sort: price },
                color: colors.filter(element => e.includes(element.id)).map(item => item.name.toLowerCase())
            }
        })
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

                    <Select value={sort} onChange={(e) => handlePrice(e)} defaultValue="None" style={{ width: 120 }} >
                        {options.map(item => {
                            return <Option key={item} value={item}>{item}</Option>

                        })}
                    </Select>

                </div>
                <div className={css.options_group}>
                    <h1>Color</h1>
                    <Divider className={css.divider} />
                    <Checkbox.Group value={color} onChange={(e) => handleColors(e)} >
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