import React from 'react';
import './PreviewPageTitle.css';
import './Do/PreviewPageDo'
import PreviewPageDo from './Do/PreviewPageDo';
class PreviewPage extends React.Component{

    render(){
        const {onClick, onRemove} = this.props;
        const page = new PreviewPageDo(this.props.page);

        return (
            <li className={`preview_page_title ${page.pageTitle} ${page.checked && 'active'}`} onClick={() => onClick(page.pageTitle)}>
                <div className ="remove_container">
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(page.pageTitle)}}>
                    ×
                </div>
                </div>
                {page.pageTitle}
            </li>
        );
    }
};

export default PreviewPage;