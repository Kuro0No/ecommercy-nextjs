import { Col, Row, Checkbox, Select, Divider, Radio } from 'antd'
import React from 'react'
import css from '../styles/ProductCommonLayOut.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import {categorySlice} from '../redux/reducer'



const { Option } = Select;


const ProductCommonLayOut = ({ children }) => {
    const router = useRouter()
    const dispath = useDispatch()
    // console.log(categorySlice.actions.categoryFilterChange())

    const category = ['Mobile', 'Clothing', 'Computer', 'Shoes']
    const options = ['Decrease', 'Increase']
    const colors = ['Grey', 'Black', 'Mix']

    const categoryHandle = (e) => {
        // dispath()
        router.push(`/product/${e.target.value.toLowerCase()}`)
    }

    return (
        <Row gutter={[16, 24]} >
            <Col span={4}>
                <div className={css.options_group}>
                    <h1>Category</h1>
                    <Divider className={css.divider} />
                    <ul>
                        <Radio.Group >

                            {category.map((item, i) => {

                                return <li key={item}>
                                    <Radio onChange={(e) => categoryHandle(e)} value={item}>{item}</Radio >
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