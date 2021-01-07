class PageRequest{
    constructor(pageRequest) {
        this.start = 0;
        this.display = 10;

        if(pageRequest !== undefined){
            for(const property in this){
                this[property] = pageRequest[property]
            }
        }
    }   
}

export default PageRequest;