import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'antd'
import { FormInput } from '../form/item'
import './index.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateBlock } from '../../redux/actions/blockAction'

const formItems = [
    { name: "text", label: "Text", required: false },
    { name: "x", label: "X", required: true, type: "number" },
    { name: "y", label: "Y", required: true, type: "number" },
    { name: "fontSize", label: "Font Size", required: false, type: "number" },
    { name: "fontWeight", label: "Font weight", required: false, type: "select" },
]

export const ItemModal = ({ blockKey }) => {
    const [visible, setVisible] = useState(false)

    const [form] = Form.useForm()

    const blocks = useSelector(state => state.block.blocks);
    const dispatch = useDispatch();

    useEffect(() => {
        if (blockKey || blockKey === 0) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [blockKey])

    const handleSubmit = () => {
        let newBlockConfig = form.getFieldsValue()
        dispatch(updateBlock({ id: blockKey, newBlockConfig }))
        form.resetFields()
        setVisible(false)
    }

    const setFormValues = () => {
        if (blocks) {
            if (blocks[blockKey]) {
                let data = blocks[blockKey]['config'];
                form.setFieldsValue(data)
            }
        }
    }

    useEffect(() => {
        if (visible) {
            setFormValues()
        }
    }, [visible])

    return (
        <Modal
            visible={visible}
            title={"Edit Label"}
            onCancel={handleSubmit}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit} layout={"vertical"}>
                {formItems.map((item, index) => <FormInput key={index} {...item} />)}
                <button className="modal-button" type="submit">Save Changes</button>
            </Form>
        </Modal>
    )
}
