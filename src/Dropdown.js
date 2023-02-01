import React, { useEffect } from "react";
import { useState } from "react";
import "./Dropdown.scss"

function Dropdown(props) {
    // icons from feathericons.com
    const square = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
    const checkSquare = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
    const chevronDown = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
    const chevronUp = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>

    // options: { id: string, value: string, display?: string }[]
    // defaultLabel: string
    // onChange: callback function
    // multiselect: boolean
    const { options, defaultLabel, onChange, multiselect, allowSelectAll } = props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [availableOptions, setAvailableOptions] = useState({});
    
    useEffect(() => { // only runs once
        // initialize Dictionary so that lookups are faster for large datasets
        const newOptions = {};
        for (let option of options) {
            newOptions[option.id] = option;
        }
        setAvailableOptions(newOptions);
    }, [])

    const toggleVisibility = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleSelection = (id) => {
        let newSelected = {};
        if (!multiselect) { // single select
            if (selectedOptions[id]) {
                delete newSelected[id];
            } else {
                newSelected[id] = availableOptions[id]
            }
        } else {
            newSelected = {...selectedOptions}
            if (selectedOptions[id]) {
                delete newSelected[id];
            } else {
                newSelected[id] = availableOptions[id]
            }
        }
        setSelectedOptions(newSelected);
    }

    const handleSelectAll = () => {
        if (Object.keys(selectedOptions).length === Object.keys(availableOptions).length) {
            setSelectedOptions({});
        } else {
            setSelectedOptions(availableOptions);
        }
    }

    useEffect(() => { // hit the callback whenever new options are selected
        onChange(selectedOptions);
    }, [selectedOptions])

    return isDropdownOpen ? (
        <div className="dropDown">
            <button className="dropdownButton" onClick={toggleVisibility}>
                <label>{
                    Object.keys(selectedOptions).length
                        ? Object.values(selectedOptions).map(e => 
                            `${multiselect ? '• ' : ''}${e.display || e.value} `)
                        : defaultLabel
                    }</label><span className="chevron">{chevronUp}</span>
            </button>
            <div className="dropdownContent">
                {multiselect && allowSelectAll && (
                    <div className="option" onClick={handleSelectAll}>
                        <span>
                            <label>{
                                Object.keys(selectedOptions).length === Object.keys(availableOptions).length 
                                    ? "Deselect All" : "Select All"
                                }
                            </label>
                        </span>
                    </div>
                )}
                {options.map((element) => {
                    return (
                        <div className="option" onClick={() => {handleSelection(element.id)}}>
                            <span>
                                {multiselect && (selectedOptions[element.id] ? checkSquare : square)}
                                <label>{` ${element.display || element.value}`}</label>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    ) : (
        <div className="dropDown">
            <button className="dropdownButton" onClick={toggleVisibility}>
                <label>{
                    Object.keys(selectedOptions).length 
                        ? Object.values(selectedOptions).map(e => `• ${e.display || e.value} `)
                        : defaultLabel
                    }</label><span className="chevron">{chevronDown}</span>
            </button>
        </div>
    )
}

export default Dropdown;