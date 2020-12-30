import React from 'react'
import './PreviewOptionContainer.css'
import PreviewOption from './PreviewOption'
import PreviewOptionDo from '../Home/Do/PreviewOptionDo'

class PreviewOptionContainer extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.options !== nextProps.options;
    }

    render() {
        const { onClick, onRemove } = this.props;
        let options = [] || [new PreviewOptionDo];
        options = this.props.options;
        
        const optionList = options.map(
            (option) => (
                <PreviewOption key={option.optionTitle}
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