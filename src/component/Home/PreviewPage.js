import React from 'react';
import "./PreviewPage.css"
import Preview from './preview/Preview'
import PreviewPageDo from './Do/PreviewPageDo'
import {getPreviewTemplate} from  './PreviewTemplate'

class PreviewPage extends React.Component {

    render() {
        const page = new PreviewPageDo(this.props.page);
        const previews = page.previews;
        const Page = previews.map((
            preview
        ) => (
            <Preview 
                key={preview.id}
                preview={preview}
                previewTemplate={
                    getPreviewTemplate(page.type, preview)
                }
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