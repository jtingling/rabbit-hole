import React, { useState, ChangeEvent } from 'react';
import { updateUrl } from '../features/articles/searchSlice';
import { useDispatch } from 'react-redux';

import '../styles/ToggleSwitch.css'

interface Props {
    name: string,
    id?: string,
    checked: boolean,
    onChange: (e:boolean) => void
}
const ToggleSwitch: React.FC<Props> = ({ name, id, checked, onChange }) => {
    let dispatch = useDispatch();
    if (checked) {
        dispatch(updateUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI'));
    } else {
        dispatch(updateUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI'));
    }
    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name={name}
                id={id}
                checked={checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
            />
            <label className="toggle-switch-label" htmlFor={id}>
                <span className="toggle-switch-inner" data-web="Web" data-news="News" />
                <span className="toggle-switch-switch" />
            </label>
        </div>

    )
}


export default ToggleSwitch