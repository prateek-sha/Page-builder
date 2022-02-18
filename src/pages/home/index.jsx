import React from 'react'
import { Row, Col } from 'antd'
import { MainPanel } from '../../components/mainPanel'
import { SidePanel } from '../../components/sidePanel'

export const HomePage = () => {
    return (
        <Row>
            <Col span={20}>
                <MainPanel />
            </Col>
            <Col span={4}>
                <SidePanel />
            </Col>
        </Row>
    )
}
