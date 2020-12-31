import React from 'react'
import './PreviewPageTitleContainer.css'
import PreviewOption from './PreviewOption'
import PreviewPageDo from './Do/PreviewPageDo'

class PreviewPageTitleContainer extends React.Component {

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
            <ul className="preview_page_title_container">
                {optionList}
            </ul>
        );
    }
}


export default PreviewPageTitleContainer;