import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button, Carousel } from 'antd'
import style from '../styles/Baner.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {baseUrlImage } from '../variable.js'
import { useRouter } from 'next/router'


const Banner = ({ banner }) => {

    const router = useRouter()
    const [tabSlider, setTabSlider] = useState(0)
    const changeSlideLeft = () => {
        tabSlider === 0 ? setTabSlider(2) : setTabSlider(tabSlider - 1)

    }
    const changeSlideRight = () => {
        tabSlider === 2 ? setTabSlider(0) : setTabSlider(tabSlider + 1)
    }
    const tabDot = [0, 1, 2]
    useEffect(() => {
        const slider = setInterval(() => {
            tabSlider === 2 ? setTabSlider(0) : setTabSlider(tabSlider + 1)
        },3000)

        return () => {
            clearInterval(slider)
        }
    },[tabSlider])
    return (
        <div className={style.container}>
            <Row className={style.row}>
                <ArrowLeftOutlined onClick={changeSlideLeft} className={style.ic_left} />
                <ArrowRightOutlined onClick={changeSlideRight} className={style.ic_right} />
                <div className={style.dot}>
                    {tabDot.map(item => {
                        return <div key={item} className={`${item === tabSlider ? style.active : ''}`} onClick={() => setTabSlider(item)}>
                        </div>
                    })}

                </div>

                <Col span={24} className={style.col_container} style={{ transform: `translateX(${-tabSlider * 100}vw)` }}>

                    {banner.map((item,index) => {

                        return <Col key={index} span={24} style={{display: 'flex'}}>
                            <Col  className={style.left} span={10}>
                                <h2>{item.product.name}</h2>
                                <h1>Your choice <br /> My Money</h1>
                                <Button onClick={() => router.push(`/product/${item.product.uuid}`)} type="primary" icon={<ShoppingCartOutlined />} size='large'  >
                                    Buy now!
                                </Button>
                            </Col>
                            <Col span={14}>
                                <Image
                                    alt='banner'
                                    width={'75%'}
                                    className={style.image_container}
                                    src= {baseUrlImage+item.product.image}
                                />
                            </Col>
                        </Col >
                    })}
                    {/* <Col className={style.left} span={10}>
                        <h2>Jordan</h2>
                        <h1>Your choice <br /> My Money</h1>
                        <Button type="primary" icon={<ShoppingCartOutlined />} size='large'  >
                            Buy now!
                        </Button>
                    </Col>
                    <Col span={14}>
                        <Image

                            width={'75%'}
                            className={style.image_container}
                            src="https://i.pinimg.com/originals/c9/12/fa/c912faee902e5f825b1d93bf7ce4b451.jpg"
                        />
                    </Col>

                    <Col className={style.left} span={10}>
                        <h2>Jordan</h2>
                        <h1>Your choice <br /> My Money</h1>
                        <Button type="primary" icon={<ShoppingCartOutlined />} size='large'  >
                            Buy now!
                        </Button>
                    </Col>
                    <Col span={14}>
                        <Image

                            width={'75%'}
                            className={style.image_container}
                            src="https://cdn.inprnt.com/thumbs/2c/48/2c487f61add5ffed3f1605f3c0c6e50e.jpg?response-cache-control=max-age=2628000"
                        />
                    </Col>

                    <Col className={style.left} span={10}>
                        <h2>Fila</h2>
                        <h1>Your choice <br /> My Money</h1>
                        <Button type="primary" icon={<ShoppingCartOutlined />} size='large'  >
                            Buy now!
                        </Button>
                    </Col>
                    <Col span={14}>
                        <Image

                            width={'75%'}
                            className={style.image_container}
                            src="https://i.pinimg.com/originals/9c/9a/af/9c9aaf166a5ce6ce6905b858f562df01.jpg"
                        />
                    </Col> */}


                </Col>

            </Row>


        </div>
    )
}

export default Banner


