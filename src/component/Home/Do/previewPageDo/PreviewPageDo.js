import PreviewDo from '../PreviewDo.js'
import PageType from '../PageType.js'
import HomeUtils from '../../../../utils/HomeUtils/HomeUtils.js'
import PageRequest from '../../../../utils/HomeUtils/PageRequest.js'
import BookRequestDto from '../../../../utils/HomeUtils/dto/BookRequestDto.js';
import { isNotEmpty } from '../../../../utils/Utils.js';
import PageRequestBuilder from '../../../../utils/HomeUtils/PageRequestBuilder.js';
import BookResponseDto from '../../../../utils/HomeUtils/dto/BookResponseDto.js';

class PreviewPageDo {

    constructor(previewPage) {
        this.pageTitle = "";
        this.checked = false;
        this.previews = [] || [new PreviewDo()];
        this.type = PageType.REVIEW;
        this.loading = false;
        this.page = 0;

        if (previewPage !== undefined) {
            for (const property in this) {
                this[property] = previewPage[property];
            }
        }
    }

    static Builder = class {
        constructor(){
            this.previewPageDo = new PreviewPageDo();
        }

        pageTitle(pageTitle){
            this.previewPageDo.pageTitle = pageTitle;
            return this;
        }

        checked(checked){
            this.previewPageDo.checked = checked;
            return this;
        }

        previews(previews){
            this.previewPageDo.previews = previews;
            return this;
        }

        type(type){
            this.previewPageDo.type = type;
            return this;
        }

        loading(loading){
            this.previewPageDo.loading = loading;
            return this;
        }

        page(page){
            this.previewPageDo.page = page;
            return this;
        }

        build(){
            return this.previewPageDo;
        }

    }

    isEqual(previewPage) {
        return this.pageTitle === previewPage.pageTitle && previewPage.type === this.type;
    }

    toggleChecked() {
        this.checked = !this.checked;
    }

    removePreviews() {
        this.previews = [];
    }

    isLoading() {
        return this.loading;
    }

    preventAddPreviews() {
        this.loading = true;
    }

    permitAddPreviews() {
        this.loading = false;
    }

    pageUp() {
        this.page = this.page + 20;
    }

    resetPage() {
        this.page = 0;
    }

    reset() {
        new PreviewPageDo().removePreviews.call(this);
        new PreviewPageDo().resetPage.call(this);
    }

    async addPreviews(pageRequest) {
        return await this.addBookPreviews(pageRequest);
        // return await bookPreviewPageDo.addPreviews();
        // if (PageType.BOOK === this.type) {
        //     // return await this.addBookPreviews(pageRequest);
        // }
        // else{
        //     await this.addReviewPreviews(pageRequest);
        // }
    }

    async addPreviewsIfPreviewIsEmpty() {
        if (isNotEmpty(this.previews)) return;
        const status = await this.addPreviews(
            new PageRequestBuilder()
                .display(20)
                .start(0)
                .build()
        );
        if (status) {
            this.pageUp();
        }
    }

    async addPreviewIfScrolling() {
        if (this.isLoading()) return;
        this.preventAddPreviews();
        const status = await this.addPreviews(
            new PageRequestBuilder()
                .display(20)
                .start(this.page)
                .build()
        )
        if (status) {
            this.pageUp();
        }
        this.permitAddPreviews();

    }

    async addBookPreviews(pageRequest) {
        let newPageRequest = new PageRequest(pageRequest);
        const response = (await HomeUtils.getBookList(
            new BookRequestDto.Builder()
                .title(this.pageTitle)
                .id(newPageRequest.id)
                .display(newPageRequest.display)
                .start(newPageRequest.start)
                .build()
        ));
        if (response.status === 200 && response.data.length !== 0) {
            const bookList = response.data.map(book => new BookResponseDto(book).toPreviewDo());
            this.previews = this.previews.concat(bookList);
            return true;
        }
        return false;
    }

    async addReviewPreviews(pageRequest) {
        this.previews = this.previews.concat(
            new PreviewDo.Builder()
                .title(this.pageTitle)
                .imgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                .description("만들어진 zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz꿈을 살dasdasdsadsadsadsadsadsadsadasdasdasdasd 수있는")
                .createdAt("2020년 12월 13dasdaszzzzzzzzzzzzzzzzdzzzzzzzzzzzzzzzasdasdazzzzzzzzzzzzzzzzzzzzzzzzzzzsdasdasdasdsadsadadsadsadsadasdsadsadsa일")
                .author("jinseonghsdadsadasdsadzzzzzzzzzzzzazzzzzzzzzzzzzzzzzzzzzdsadsadsadadasdasdasdaso")
                .id("1")
                .build()
        )
    }

}

export default PreviewPageDo;