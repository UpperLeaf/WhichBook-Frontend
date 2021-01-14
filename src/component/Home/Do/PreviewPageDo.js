import PreviewDo from './PreviewDo.js'
import PageType from './PageType.js'
import HomeUtils from '../../../utils/HomeUtils/HomeUtils.js'
import PageRequest from '../../../utils/HomeUtils/PageRequest.js'
import BookRequestDtoBuilder from '../../../utils/HomeUtils/dto/BookRequestDtoBuilder.js';
import PreviewDoBuilder from './PreviewDoBuilder.js';
import { isNotEmpty } from '../../../utils/Utils.js';
import PageRequestBuilder from '../../../utils/HomeUtils/PageRequestBuilder.js';
import BookResponseDto from '../../../utils/HomeUtils/dto/BookResponseDto.js';

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

    isEqual(previewPage){
        return this.pageTitle === previewPage.pageTitle && previewPage.type === this.type;
    }

    toggleChecked(){
        this.checked = !this.checked;
   }

    removePreviews(){
        this.previews = [];
    }

    isLoading(){
        return this.loading;
    }

    preventAddPreviews(){
        this.loading = true;
    }

    permitAddPreviews(){
        this.loading = false;
    }

    pageUp(){
        this.page = this.page+20;
    }

    resetPage(){
        this.page = 0;
    }

    reset(){
        new PreviewPageDo().removePreviews.call(this);
        new PreviewPageDo().resetPage.call(this);
    }

    async addPreviews(pageRequest){
            return await this.addBookPreviews(pageRequest);
        // if(PageType.BOOK === this.type){
        //     return await this.addBookPreviews(pageRequest);
        // }
        // else{
        //     await this.addReviewPreviews(pageRequest);
        // }
    }

    async addPreviewsIfPreviewIsEmpty(){
        if(isNotEmpty(this.previews))return;
        const status = await this.addPreviews(
            new PageRequestBuilder()
            .setDisplay(20)
            .setStart(0)
            .build()
        );
        if(status){
            this.pageUp();
        }
    }
    
    async addPreviewIfScrolling(){
        if(this.isLoading())return;
        this.preventAddPreviews();
        const status = await this.addPreviews(
            new PageRequestBuilder()
            .setDisplay(20)
            .setStart(this.page)
            .build()
        )
        if(status){
            this.pageUp();
        }
        this.permitAddPreviews();
        
    }

    async addBookPreviews(pageRequest){
        let newPageRequest = new PageRequest(pageRequest);
        const response = (await HomeUtils.getBookList(
            new BookRequestDtoBuilder()
            .setTitle(this.pageTitle)
            .setId(newPageRequest.id)
            .setDisplay(newPageRequest.display)
            .setStart(newPageRequest.start)
            .build()
        ));
        if (response.status === 200 && response.data.length !== 0) {
            const bookList = response.data.map(book => new BookResponseDto(book).toPreviewDo());
            this.previews = this.previews.concat(bookList);
            return true;
        }
        return false;
    }

    async addReviewPreviews(pageRequest){
            new PreviewDoBuilder
        this.previews = this.previews.concat(
            new PreviewDoBuilder()
                .setTitle(this.pageTitle)
                .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                .setDescription("만들어진 zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz꿈을 살dasdasdsadsadsadsadsadsadsadasdasdasdasd 수있는")
                .setCreatedAt("2020년 12월 13dasdaszzzzzzzzzzzzzzzzdzzzzzzzzzzzzzzzasdasdazzzzzzzzzzzzzzzzzzzzzzzzzzzsdasdasdasdsadsadadsadsadsadasdsadsadsa일")
                .setAuthor("jinseonghsdadsadasdsadzzzzzzzzzzzzazzzzzzzzzzzzzzzzzzzzzdsadsadsadadasdasdasdaso")
                .setId("1")
                .build()
        )
    }

}

export default PreviewPageDo;