import React from 'react'
import './PreviewOptionContainer.css'
import PreviewOption from './PreviewOption'
import PreviewPageDo from './Do/PreviewPageDo'

class PreviewOptionContainer extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.options !== nextProps.options;
    }

    render() {
        const { onClick, onRemove } = this.props;
        let options = [] || [new PreviewPageDo];
        options = this.props.options;

        const optionList = options.map(
            (option) => (
                <PreviewOption key={option.pageTitle}
                    option={option}
                    onClick={onClick}
                    onRemove={onRemove}
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