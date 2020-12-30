import PreviewOptionDo from './PreviewOptionDo.js';

class PreviewOptionDoBuilder{

    constructor(){
        this.option = new PreviewOptionDo();
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

export default PreviewOptionDoBuilder;