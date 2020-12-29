import React from 'react';
import "./PreviewPage.css"
import Preview from './Preview'

class PreviewPage extends React.Component {

    render() {

        const {previews, checked} = this.props;
        const Page = previews.map((
            {imgURL, title, description, createdAt, author, id}
        ) => (
            <div key={id}>
                <Preview
                imgURL = {imgURL}
                title = {title}
                description = {description}
                createdAt = {createdAt}
                author = {author}
                />
            </div>
        ))

        return (
            <div className={`preview_page ${checked && 'active'}`}>
                {Page}
            </div>
        )
    }

};

export default PreviewPage;