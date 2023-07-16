import PropTypes from 'prop-types'
import { Form, Input } from "antd";

function InputComponent({ 
        label, 
        rules, 
        hasFeedback,
        id, 
        placeholder, 
        type, 
        onInput 
    }) {

    return (
        <>
            <Form.Item
                    className='form-field'
                    label={ label }
                    rules={ rules }
                    hasFeedback={ hasFeedback }
                >
                    <Input
                        className='form-input'
                        id={ id }
                        placeholder={ placeholder }
                        type={ type }
                        onInput={ onInput }
                    /> 
                </Form.Item>
        </>
    );
}

InputComponent.propTypes = {
    label: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(PropTypes.object),
    hasFeedback: PropTypes.bool,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    onInput: PropTypes.func
}

export default InputComponent;
