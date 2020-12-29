import React from 'react'
import './PreviewOptionContainer.css'
import PreviewOption from './PreviewOption'
class PreviewOptionContainer extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {

        return this.props.options !== nextProps.options;
    }

    render() {

        const { options, onClick } = this.props;
        const optionList = options.map(
            ({ optionTitle, checked}) => (
                <PreviewOption key={optionTitle}
                    optionTitle={optionTitle}
                    checked={checked}
                    onClick={onClick}
                />
        )
        )

        return (
            <ul className="preview_option_container">
                {optionList}
            </ul>
        );
    }
}


export default PreviewOptionContainer;