import React from 'react';
import './Preview.css'
class Preview extends React.Component {

    render() {
        const previewTemplate = this.props.previewTemplate;
        return previewTemplate;
    }
}

export default Preview;