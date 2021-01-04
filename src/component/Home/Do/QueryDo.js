class QueryDo{

    static queryMode = {
        BOOK : "book",
        REVIEW : "review"
    }

    constructor(queryDo){
        this.value="";
        this.mode=QueryDo.queryMode.REVIEW;

        if(queryDo !== undefined){
            for(const property in queryDo){
                this[property] = queryDo[property];
            }
        }
    }

}

export default QueryDo;