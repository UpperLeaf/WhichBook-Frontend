import PageRequest from './PageRequest'

class PageRequestBuilder{
    
    constructor(){
        this.pageRequest = new PageRequest();
    }

    setStart(start){
        this.pageRequest.start = start;
        return this;
    }

    setDisplay(display){
        this.pageRequest.display = display;
        return this;
    }

    build(){
        return this;
    }

}

export default PageRequestBuilder;