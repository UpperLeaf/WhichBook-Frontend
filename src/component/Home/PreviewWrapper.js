import React from 'react';
import "./PreviewWrapper.css"
import PreviewPage from "./PreviewPage"
import PreviewPages from './Do/PreviewPages'

class PreviewWrapper extends React.Component {

    render() {
        let pages = new PreviewPages(this.props.pages);
        let rawPages = pages.getRawPages();

        const Pages = rawPages.map((
            page
        ) => (
            <div key={page.pageTitle}>
                <PreviewPage
                    page={page}
                />
            </div>
        ))

        return (
            <div className="preview_wrapper">
                {Pages}
            </div>
        )
    }

};

export default PreviewWrapper;