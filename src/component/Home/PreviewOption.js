import React from 'react';
import './PreviewOption.css';

class PreviewOption extends React.Component{
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render(){
        const {optionTitle, checked, onClick} = this.props;
        return (
            <li className={`preview_option ${optionTitle} ${checked && 'active'}`} onClick={() => onClick(optionTitle)}>
                <div className ="remove_container">
                <div className="remove">
                    ×
                </div>
                </div>
                {optionTitle}
            </li>
        );
    }
};

export default PreviewOption;