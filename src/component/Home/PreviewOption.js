import React from 'react';
import './PreviewOption.css';

class PreviewOption extends React.Component{
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render(){
        const {optionTitle, checked, onClick} = this.props;
        return (
            <li className={`preview_option ${checked && 'active'}`} onClick={() => onClick(optionTitle)}>
                {optionTitle}
            </li>
        );
    }
};

export default PreviewOption;