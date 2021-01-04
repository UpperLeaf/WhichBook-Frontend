import PreviewPageDo from './PreviewPageDo.js';

class PreviewPageDoBuilder{

    constructor(){
        this.page = new PreviewPageDo();
    };

    setPageTitle(pageTitle){
        this.page.pageTitle = pageTitle;
        return this;
    }

    setChecked(checked){
        this.page.checked = checked;
        return this;
    }

    setPreviews(previews){
        this.page.previews = this.page.previews.concat(previews);
        return this;
    }

    build() {
        return this.page;
    }


}

export default PreviewPageDoBuilder;