import React from 'react';
import "./PreviewWrapper.css"
import PreviewPage from "./PreviewPage"
import PreviewPageDo from "./Do/PreviewPageDo"

class PreviewWrapper extends React.Component {

    render() {
        let pages = [] || [new PreviewPageDo()];
        pages = this.props.pages;

        const Pages = pages.map((
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