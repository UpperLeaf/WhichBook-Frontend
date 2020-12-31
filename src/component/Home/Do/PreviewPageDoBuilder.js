import PreviewPageDo from './PreviewPageDo.js';

class PreviewPageDoBuilder{

    constructor(){
        this.option = new PreviewPageDo();
    };

    setOptionTitle(optionTitle){
        this.option.optionTitle = optionTitle;
        return this;
    }

    setChecked(checked){
        this.option.checked = checked;
        return this;
    }

    setPreviews(previews){
        this.option.previews = this.option.previews.concat(previews);
        return this;
    }

    build() {
        return this.option;
    }


}

export default PreviewPageDoBuilder;