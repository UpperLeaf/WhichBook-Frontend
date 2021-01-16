import React from 'react';
import "./PreviewWrapper.css"
import PreviewPage from "./PreviewPage"
import PreviewPages from './Do/PreviewPages'

class PreviewWrapper extends React.Component {

    render() {
        const { bookPreviewTemplate, reviewPreviewTemplate } = this.props;
        let pages = new PreviewPages(this.props.pages);
        let rawPages = pages.getRawPages();
        const Pages = rawPages.map((
            page
        ) => (
            <PreviewPage
                key={page.pageTitle}
                bookPreviewTemplate={bookPreviewTemplate}
                reviewPreviewTemplate={reviewPreviewTemplate}
                page={page}
            />
        ))

        return (
            <div className="preview_wrapper">
                {Pages}
            </div>
        )
    }

};

export default PreviewWrapper;