import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from "antd";

import './Input.style.css'

function InputComponent({ 
        label, 
        required,
        id, 
        placeholder, 
        type, 
        maxLength,
        maxRows,
        onInput 
    }) {

    return (
        <>
            { (type !== 'password' && type !== 'number' && type !== 'textarea') &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required,
                            message: '${label} é obrigatório'
                        },
                        {
                            type: type,
                            message: '${label} não é um ${type} válido(a)'
                        }
                    ]} 
                    hasFeedback
                >

                    <Input
                        className='form-input'
                        id={ id }
                        placeholder={ placeholder }
                        type={ type }
                        onInput={ onInput }
                    />

                </Form.Item>
            }

            { type === 'password' &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required,
                            message: '${label} é obrigatório'
                        },
                        {
                            min: 8,
                            max: 12,
                            message: '${label} deve conter entre ${min} e ${max} caracteres'
                        }
                    ]}
                    hasFeedback
                >

                    <Input.Password
                        className='form-input'
                        id={ id }
                        placeholder={ placeholder }
                        onInput={ onInput }
                    />

                </Form.Item>
            }

            { type === 'textarea' &&
                <Form.Item
                    className='form-field-textarea'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required,
                            message: '${label} é obrigatório'
                        }
                    ]}
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
                        onInput={ onInput }
                    />

                </Form.Item>
            }

            { type === 'number' &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required,
                            message: '${label} é obrigatório'
                        }
                    ]}
                    hasFeedback
                >

                    <InputNumber
                        className='form-input-number'
                        id={ id }
                        placeholder={ placeholder }
                        min={ 0 }
                        onInput={ onInput }
                    />

                </Form.Item>
            }
        </>
    );
}

InputComponent.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    maxRows: PropTypes.number,
    onInput: PropTypes.func
}

export default InputComponent