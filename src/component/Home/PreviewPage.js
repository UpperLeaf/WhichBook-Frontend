import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'
import PreviewOptionDo from './Do/PreviewOptionDo'

class PreviewPage extends React.Component {

    render() {

        let option = new PreviewOptionDo(this.props.option);
        const previews = option.previews;
        
        const Page = previews.map((
            preview
        ) => (
            <Preview key={preview.id}
                preview={preview}
                imgURL={preview.imgURL}
                title={preview.title}
                description={preview.description}
                createdAt={preview.createdAt}
                author={preview.author}
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