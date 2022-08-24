import './input-field.css'
import SelectField from './Select';

function InputField({ type, register, hint, error }) {
    return (
        <div className='input-field'>
            {
                type == 'textarea'
                    ? <textarea className='custom-input' rows={3} {...register} placeholder={hint} />
                    : <SelectField />
            }
            {
                error
                    ? <p className='error-message'>{error}</p>
                    : null
            }

        </div>
    )
}

export default InputField;