import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'
import PreviewPageDo from './Do/PreviewPageDo'

class PreviewPage extends React.Component {

    render() {

        const option = new PreviewPageDo(this.props.option);
        const previews = option.previews;
        
        const Page = previews.map((
            preview
        ) => (
            <Preview key={preview.id}
                preview={preview}
            />
        ))

        return (
            <div className={`preview_page ${option.checked && 'active'}`}>
                {Page}
            </div>
        )
    }

};

export default PreviewPage;