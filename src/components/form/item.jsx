import React from 'react'
import { Form, Input, InputNumber } from 'antd'
const { Item } = Form

export const FormInput = ({ name, label, required, type }) => {

    const getInput = () => {
        switch (type) {
            case 'number':
                return <InputNumber />
            default:
                return <Input />
        }
    }

    return (
        <Item name={name} label={label} rules={[{ required, message: "This field is required" }]} >
            {getInput()}
        </Item>
    )
}
