import React, { useCallback, useEffect, useMemo } from 'react'
import { Button, Typography, PageHeader, Statistic, Descriptions } from 'antd';
import css from '../styles/CheckOutInCart.module.scss'


const { Title } = Typography;


const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);


const CheckOutInCart = ({ itemSelected, cart }) => {
    // const priceSeleted = useMemo(() => itemSelected.reduce((pre, curr) => {

    //     return pre.price || pre + curr?.price
    // }, 0), [])
    const priceSeleted = useMemo(() => (
        itemSelected.reduce((pre, curr) => {
            return pre.price || pre + curr?.price
        }, 0
        )), [itemSelected.length,cart.filter(item => item.quantities)])


    const renderContent = (column = 2) => (
        <Descriptions size="small" column={column}>
            <Descriptions.Item label={<Title level={5}>Selected Item</Title>}>
                <Title level={5}>{itemSelected.length}</Title>
            </Descriptions.Item>
            <Descriptions.Item label={<Title level={5}>Total</Title>}>
                <Title level={5}>{priceSeleted}$</Title>
            </Descriptions.Item>

        </Descriptions>
    );




    return (
        <PageHeader
            className={`site-page-header-responsive ${css.checkout}`}
            title={<Title level={3}>Checkout</Title>}
        >
            <Content >{renderContent()}</Content>
        </PageHeader>
    )
}

export default CheckOutInCart