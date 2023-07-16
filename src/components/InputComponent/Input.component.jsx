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

export default InputComponent;