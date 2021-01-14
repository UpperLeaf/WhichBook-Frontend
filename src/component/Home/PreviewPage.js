import React from 'react';
import "./PreviewPage.css"
import Preview from './preview/Preview'
import PreviewPageDo from './Do/previewPageDo/PreviewPageDo'
import PageType from './Do/PageType';

class PreviewPage extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                previews: this.props.page.previews
            })
        }
    }

    state = {
        previews: this.props.page.previews
    }

    getTemplate(type, preview) {
        const { bookPreviewTemplate, reviewPreviewTemplate } = this.props;
        if (type === PageType.BOOK) {
            return React.cloneElement(
                bookPreviewTemplate,
                { preview: preview }
            )
        }
        else {
            return React.cloneElement(
                reviewPreviewTemplate,
                { preview: preview }
            )
        }
    }

    render() {
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
                    this.getTemplate(page.type, preview)
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