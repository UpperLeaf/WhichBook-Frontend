import PreviewOptionDo from './PreviewOptionDo.js'

class HomeStateDo{

    constructor(){
        this.query = "";
        this.options = [] || [new PreviewOptionDo];
    }
}

export default HomeStateDo;