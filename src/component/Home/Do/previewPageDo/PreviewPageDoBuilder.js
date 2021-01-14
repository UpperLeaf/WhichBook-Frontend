import PreviewPageDo from './PreviewPageDo.js';

class PreviewPageDoBuilder {

    constructor() {
        this.page = new PreviewPageDo();
    };

    pageTitle(pageTitle) {
        this.page.pageTitle = pageTitle;
        return this;
    }

    checked(checked) {
        this.page.checked = checked;
        return this;
    }

    previews(previews) {
        this.page.previews = this.page.previews.concat(previews);
        return this;
    }

    type(type) {
        this.page.type = type;
        return this;
    }

    page(page) {
        this.page.page = page;
        return this;
    }

    build() {
        return this.page;
    }

}

export default PreviewPageDoBuilder;