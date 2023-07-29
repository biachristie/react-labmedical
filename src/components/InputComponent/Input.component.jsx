import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from "antd";

import './Input.style.css'

function InputComponent({ 
        label, 
        id, 
        rules,
        style,
        placeholder, 
        type, 
        maxLength,
        maxRows,
        onChange,
        disabled,
        addonBefore
    }) {

    return (

        <>
            { (type === 'text' || type === 'email') && 
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={ rules }
                    style={ style }
                    hasFeedback
                >

                    <Input
                        className='form-input'
                        id={ id }
                        placeholder={ placeholder }
                        type={ type }
                        onChange={ onChange }
                        disabled={ disabled }
                        addonBefore={ addonBefore }
                    />

                </Form.Item>
            }

            { type === 'password' &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={ rules }
                    style={ style }
                    hasFeedback
                >

                    <Input.Password
                        className='form-input'
                        id={ id }
                        placeholder={ placeholder }
                        onChange={ onChange }
                    />

                </Form.Item>
            }

            { type === 'textarea' &&
                <Form.Item
                    className='form-field-textarea'
                    label={ label }
                    name={ id }
                    rules={ rules }
                    style={ style }
                    hasFeedback
                >

                    <Input.TextArea
                        className='form-input-textarea'
                        id={ id }
                        placeholder={ placeholder }
                        showCount
                        maxLength={ maxLength }
                        autoSize ={{
                            minRows: 2,
                            maxRows: maxRows
                        }}
                        onChange={ onChange }
                    />

                </Form.Item>
            }

            { type === 'number' &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={ rules }
                    style={ style }
                    hasFeedback
                >

                    <InputNumber
                        className='form-input-number'
                        id={ id }
                        placeholder={ placeholder }
                        min={ 0 }
                        onChange={ onChange }
                    />

                </Form.Item>
            }
        </>
    );
}

InputComponent.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    maxRows: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    addonBefore: PropTypes.string
}

export default InputComponent