class OptionDo{

    constructor(){
        this.optionTitle="";
        this.checked=false;
        this.previews=[];
    }
    
}

class OptionDoBuilder{

    constructor(){
        this.option = new OptionDo();
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

    build(){
        return this.option;
    }

}

export default OptionDoBuilder;