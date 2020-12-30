import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'
import PreviewOptionDo from './Do/PreviewOptionDo'

class PreviewPage extends React.Component {

    render() {

        const option = new PreviewOptionDo(this.props.option);
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