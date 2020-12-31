import React from 'react';
import './PreviewPageTitle.css';
import './Do/PreviewPageDo'
import PreviewPageDo from './Do/PreviewPageDo';
class PreviewPage extends React.Component{

    render(){
        const {onClick, onRemove} = this.props;
        const option = new PreviewPageDo(this.props.option);

        return (
            <li className={`preview_page_title ${option.pageTitle} ${option.checked && 'active'}`} onClick={() => onClick(option.pageTitle)}>
                <div className ="remove_container">
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(option.pageTitle)}}>
                    ×
                </div>
                </div>
                {option.pageTitle}
            </li>
        );
    }
};

export default PreviewPage;