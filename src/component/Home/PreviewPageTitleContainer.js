import React from 'react'
import './PreviewPageTitleContainer.css'
import PreviewPageTitle from './PreviewPageTitle'
import PreviewPageDo from './Do/PreviewPageDo'

class PreviewPageTitleContainer extends React.Component {

    render() {
        const { onClick, onRemove } = this.props;
        let pages = [] || [new PreviewPageDo()];
        pages = this.props.pages;

        const pageList = pages.map(
            (page) => (
                <PreviewPageTitle key={page.pageTitle}
                    page={page}
                    onClick={onClick}
                    onRemove={onRemove}
                />
            )
        )

        return (
            <ul className="preview_page_title_container">
                {pageList}
            </ul>
        );
    }
}

export default PreviewPageTitleContainer;