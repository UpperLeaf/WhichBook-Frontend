import React from 'react';
import "./PreviewWrapper.css"
import PreviewPage from "./PreviewPage"

class PreviewWrapper extends React.Component {

    render() {
        const {options} = this.props;
        const Pages = options.map((
            { optionTitle, previews, checked }
        ) => (
            <div key={optionTitle}>
                <PreviewPage
                    checked={checked}
                    previews={previews}
                />
            </div>
        ))
        
        return (
            <div className="preview_wrapper">
                {Pages}
            </div>
        )
    }

};

export default PreviewWrapper;
