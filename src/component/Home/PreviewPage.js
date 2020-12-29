import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'

class PreviewPage extends React.Component {

    render() {

        const {previews, checked} = this.props;
        const Page = previews.map((
            {imgURL, title, description, createdAt, author, id}
        ) => (
            <Preview key={id}
                imgURL={imgURL}
                title={title}
                description={description}
                createdAt={createdAt}
                author={author}
            />
        ))

        return (
            <div className={`preview_page ${checked && 'active'}`}>
                {Page}
            </div>
        )
    }

};

export default PreviewPage;