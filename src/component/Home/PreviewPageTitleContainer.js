import React from 'react'
import './PreviewPageTitleContainer.css'
import PreviewPageTitle from './PreviewPageTitle'
import PreviewPages from './Do/PreviewPages'

class PreviewPageTitleContainer extends React.Component {

    render() {
        const { onClick, onRemove } = this.props;
        let pages = new PreviewPages(this.props.pages);
        let rawPages = pages.getRawPages();
        const pageList = rawPages.map(
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