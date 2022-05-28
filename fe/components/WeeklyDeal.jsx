import { ArrowRightOutlined } from '@ant-design/icons';
import { Row, Col, Image, Typography } from 'antd'
import React from 'react'
import css from '../styles/WeeklyDeal.module.scss'
import Link from 'next/link'

const { Title, Paragraph } = Typography;
const WeekyDeal = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Weekly deals</h1>
      <Row gutter={[16, 24]}>
        <Col span={15}>
          <Row span={24} gutter={[16, 24]}>
            <Col span={12} className={css.product_wrap}>
              <Link href='/product/?category=shoes'>
                <a>
                  <div className={css.titleProduct}>
                    <Title >Shoes</Title>
                    <Paragraph strong={true}>up to 35% off</Paragraph>
                    <ArrowRightOutlined className={css.icon} />
                  </div>
                  <Image
                    preview={false}
                    width={'100%'}
                    height={'300px'}
                    src="https://i.pinimg.com/736x/92/7d/2a/927d2a28e7c4e90539d299cdd438b8b1.jpg"
                  />
                </a>
              </Link>
            </Col>
            <Col span={12} className={css.product_wrap}>
              <Link href='/product/?category=clothing'>
                <a>


                  <div className={css.titleProduct}>

                    <Title >Clothing</Title>
                    <Paragraph strong={true}>many attractive gifts</Paragraph>
                    <ArrowRightOutlined className={css.icon} />
                  </div>

                  <Image
                    preview={false}
                    width={'100%'}
                    height={'300px'}
                    src="https://64.media.tumblr.com/dfaabe578e38cf67d7604c8069897273/1c42d3707b02956d-cf/s1280x1920/d844c8012a59071d8e0cb8bf55c2f70082ccff18.jpg"
                  />
                </a>
              </Link>
            </Col>
          </Row>
          <Col span={24} className={css.product_wrap}>
            <Link href='/product/?category=computer'>
              <a>


                <div className={css.titleProduct}>

                  <Title >Computer</Title>
                  <Paragraph strong={true}>Gamming -25%</Paragraph>
                  <ArrowRightOutlined className={css.icon} />
                </div>

                <Image
                  preview={false}
                  width={'100%'}
                  height={'400px'}
                  src="https://img.freepik.com/free-vector/computer-monitor-graphic-animator-creating-video-game-modeling-motion-processing-video-file-using-professional-editor-vector-illustration-graphic-design-art-designer-workplace-concept_74855-13038.jpg?w=2000"
                />
              </a>
            </Link>
          </Col>

        </Col>
        <Col span={9} className={css.product_wrap}>
          <Link href='/product/?category=mobile'>
            <a>


              <div>
                <Title className={css.titleProduct}>Mobile</Title>
                <Paragraph strong={true}>sale up 35%</Paragraph>
                <ArrowRightOutlined className={css.icon} />
              </div>

              <Image
                preview={false}
                width={'100%'}
                height={'100%'}
                src="https://www.thedavincipursuit.com/wp-content/uploads/2020/09/iStock-1160025421.jpg"
              />
            </a>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default WeekyDeal