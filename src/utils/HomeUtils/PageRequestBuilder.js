import PageRequest from './PageRequest'

class PageRequestBuilder {

    constructor() {
        this.pageRequest = new PageRequest();
    }

    start(start) {
        this.pageRequest.start = start;
        return this;
    }

    display(display) {
        this.pageRequest.display = display;
        return this;
    }

    id(id) {
        this.pageRequest.id = id;
        return this;
    }

    build() {
        return this.pageRequest;
    }

}

export default PageRequestBuilder;