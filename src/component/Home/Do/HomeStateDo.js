import PreviewPageDo from './PreviewPageDo.js'

class HomeStateDo{

    constructor(){
        this.query = "";
        this.pages = [] || [new PreviewPageDo];
    }
}

export default HomeStateDo;