import { CarOutlined, CustomerServiceOutlined, InboxOutlined, UnlockOutlined } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import React, { useRef } from 'react'
import style from '../styles/Policy.module.scss'

const { Title } = Typography;


const Policy = () => {
    const policy = [
        { id: 1, icon: <CustomerServiceOutlined />, content: 'Exceptional customer care & 24-hour live chat.' },
        { id: 2, icon: <CarOutlined />, content: 'Free shipping & returns. Every single order.' },
        { id: 3, icon: <InboxOutlined />, content: 'Become an Alysum Friend & enjoy lots of benefits.' },
        { id: 4, icon: <UnlockOutlined />, content: 'Secure payment. Visa, Mastercard & PayPal.' },
    ]
    const itemRef = useRef()
    return (
        <div className={style.container}>
            <Row>
                {policy.map(item => {
                    return <Col className={style.col} key={item.id} span={6}>
                        <Card >
                            <Row>
                                <Col span={4} className={style.icon}>
                                    {item.icon}
                                </Col>
                                <Col  className={style.title} span={20}>
                                    <Title level={5}>{item.content}</Title>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                })}
            </Row>
        </div>
    )
}

export default Policy