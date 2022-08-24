import './input-field.css'

function SelectField({ type, register, hint, error }) {
    return (
        <div>
             <select className="round" id="cars"> 
               <option value="audi">Yes</option>
               <option value="audi">No</option>
            </select>
        </div>
    )
}

export default SelectField;