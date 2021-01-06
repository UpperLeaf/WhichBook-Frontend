import PreviewDo from './PreviewDo.js'
import PageType from './PageType.js'
class PreviewPageDo {

    constructor(previewPage) {
        this.pageTitle = "";
        this.checked = false;
        this.previews = [] || [new PreviewDo()];
        this.type = PageType.REVIEW;
        
        if (previewPage !== undefined) {
            for (const property in this) {
                this[property] = previewPage[property];
            }
        }
    }

}

export default PreviewPageDo;