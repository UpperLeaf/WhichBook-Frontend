import React from 'react';
import "./PreviewPage.css"
import Preview from './preview/Preview'
import PreviewDo from './Do/PreviewDo'
import PreviewPageDo from './Do/PreviewPageDo'
import {getPreviewTemplate} from  './PreviewTemplate'

class PreviewPage extends React.Component {

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({
                previews : this.props.page.previews
            })
        }
    }

    state={
        previews : this.props.page.previews
    }

    render() {
        const {handleWriteReview,handleClickPreview} = this.props;
        const page = new PreviewPageDo(this.props.page);
        const previews = page.previews;
        let itemId = 0;
        const Page = previews.map((
            preview
        ) => (
            <Preview 
                key={itemId++}
                preview={preview}
                previewTemplate={
                    getPreviewTemplate(page.type, preview, handleClickPreview, handleWriteReview)
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