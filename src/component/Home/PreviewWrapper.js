import React from 'react';
import "./PreviewWrapper.css"
import PreviewPage from "./PreviewPage"
import PreviewPageDo from "./Do/PreviewPageDo"

class PreviewWrapper extends React.Component {

    render() {
        let options = [] || [new PreviewPageDo];
        options = this.props.options;
        
        const Pages = options.map((
            option
        ) => (
            <div key={option.optionTitle}>
                <PreviewPage
                    option={option}
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
