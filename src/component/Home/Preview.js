import React from 'react';
import './Preview.css'

class Preview extends React.Component {

    render() {
        const {
            imgURL,
            title,
            description,
            createdAt,
            author,
        } = this.props;

        return (
            <div className="preview">
                <div className="preview_img">
                    <img src={imgURL} ></img>
                </div>
                <div className="preview_footer">
                    <h4 className="preview_title">{title}</h4>
                    <p className="preview_description">
                        {description}
                    </p>
                    <div className="footer">
                        <span className="preview_createdAt">
                            {createdAt}
                        </span>
                        <span className="preview_author">
                            {author}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;