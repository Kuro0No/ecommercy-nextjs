import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Typography, PageHeader, Statistic, Descriptions } from 'antd';
import css from '../styles/CheckOutInCart.module.scss'
import { CartSlice } from '../redux/cartReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'antd';

const { Panel } = Collapse;


const { Title } = Typography;


const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);


const CheckOutInCart = ({ itemSelected, cart, priceSeleted }) => {

    const { currentUser } = useSelector(state => state.user)

    const renderContent = (column = 2) => (<>
        <Descriptions size="small" column={column}>
            <Descriptions.Item label={<Title level={5}>Name</Title>}>
                <Title level={5}>{currentUser?.name || 'Test'}</Title>
            </Descriptions.Item>

            <Descriptions.Item label={<Title level={5}>Selected Item</Title>}>
                <Title level={5}>{itemSelected.length}</Title>
            </Descriptions.Item>

            <Descriptions.Item label={<Title level={5}>Address</Title>}>
                <Title level={5}>Dong Da, Ha Noi</Title>
            </Descriptions.Item>

            <Descriptions.Item label={<Title level={5}>Total</Title>}>
                <Title level={5}>{priceSeleted}$</Title>
            </Descriptions.Item>

            <Descriptions.Item label={<Title level={5}>Phone Number</Title>}>
                <Title level={5}>0123456789</Title>
            </Descriptions.Item>

        </Descriptions>
        <Button danger type='primary'>Purchase</Button>
    </>
    );




    return (<Collapse accordion>
        <Panel   className={`${css.checkout}`} header={<Title level={5}>Checkout</Title>} key="1">
            <PageHeader
                className={`site-page-header-responsive `}
            >
                <Content >{renderContent()}</Content>
            </PageHeader>

        </Panel>
    </Collapse>
    )
}

export default CheckOutInCart