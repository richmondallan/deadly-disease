import ReactTags from 'react-tag-autocomplete'

import './input-tags.css'

function InputTags({ tags, suggestions, onDelete, onAddition, hint, error }) {
    return (
        <div>
            <ReactTags
                tags={tags}
                placeholderText={hint}
                suggestions={suggestions}
                onDelete={onDelete}
                onAddition={onAddition} />
            <p className='error-message'>{error}</p>
        </div>
    )
}

export default InputTags;