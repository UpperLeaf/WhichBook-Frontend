import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'
import PreviewPageDo from './Do/PreviewPageDo'

class PreviewPage extends React.Component {

    render() {

        const page = new PreviewPageDo(this.props.page);
        const previews = page.previews;

        const Page = previews.map((
            preview
        ) => (
            <Preview key={preview.id}
                preview={preview}
            />
        ))

        return (
            <div className={`preview_page ${page.checked && 'active'}`}>
                {Page}
            </div>
        )
    }

};

export default PreviewPage;