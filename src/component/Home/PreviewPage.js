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

    handlePreviewClick = (preview) => {
        console.log(preview);
        const newPreview = new PreviewDo(preview);
        newPreview.shortCutFlag = !newPreview.shortCutFlag;
        const activeIndex =  this.state.previews.findIndex((preview) => preview.id === newPreview.id);
        let newPreviews = this.state.previews;
        newPreviews[activeIndex] = newPreview;
        this.setState({previews : newPreviews});
    }

    render() {
        const {onClick} = this.props;
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
                    getPreviewTemplate(page.type, preview, onClick, this.handlePreviewClick)
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