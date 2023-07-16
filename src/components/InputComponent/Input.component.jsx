import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from "antd";

import './Input.style.css'

function InputComponent({ 
        label, 
        required,
        id, 
        placeholder, 
        type, 
        onInput 
    }) {

    return (
        <>
            { (type !== 'password' && type !== 'number') &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required,
                            type: type
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
                            whitespace: true
                        },
                        {
                            min: 8,
                            max: 12,
                            message: '${label} must be between ${min} and ${max} characters'
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

            { type === 'number' &&
                <Form.Item
                    className='form-field'
                    label={ label }
                    name={ id }
                    rules={[
                        {
                            required: required
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
    onInput: PropTypes.func
}

export default InputComponent;
