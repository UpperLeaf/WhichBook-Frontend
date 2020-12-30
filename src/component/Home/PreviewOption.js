import React from 'react';
import './PreviewOption.css';
import './Do/PreviewOptionDo'
import PreviewOptionDo from './Do/PreviewOptionDo';
class PreviewOption extends React.Component{

    render(){
        const {onClick, onRemove} = this.props;
        const option = new PreviewOptionDo(this.props.option);

        return (
            <li className={`preview_option ${option.optionTitle} ${option.checked && 'active'}`} onClick={() => onClick(option.optionTitle)}>
                <div className ="remove_container">
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(option.optionTitle)}}>
                    ×
                </div>
                </div>
                {option.optionTitle}
            </li>
        );
    }
};

export default PreviewOption;