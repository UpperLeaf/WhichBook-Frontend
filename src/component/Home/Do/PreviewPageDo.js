import PreviewDo from './PreviewDo.js'
import PageType from './PageType.js'
import HomeUtils from '../../../utils/HomeUtils/HomeUtils.js'
import PageRequest from '../../../utils/HomeUtils/PageRequest.js'
import BookRequestDtoBuilder from '../../../utils/HomeUtils/dto/BookRequestDtoBuilder.js';
import PreviewDoBuilder from './PreviewDoBuilder.js';
import { isNotEmpty } from '../../../utils/Utils.js';
import PageRequestBuilder from '../../../utils/HomeUtils/PageRequestBuilder.js';

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

    isEqual(previewPage){
        return this.pageTitle === previewPage.pageTitle && previewPage.type === this.type;
    }

    toggleChecked(){
        this.checked = !this.checked;
    }

    removePreviews(){
        this.previews = [];
    }

    async addPreviews(pageRequest){
        if(PageType.BOOK === this.type){
            await this.addBookPreviews(pageRequest);
        }
        else{
            await this.addReviewPreviews(pageRequest);
        }
    }

    async addPreviewsIfPreviewIsEmpty(){
        if(isNotEmpty(this.previews))return;

        await this.addPreviews(
            new PageRequestBuilder()
            .setDisplay(20)
            .setStart(0)
            .build()
        )
    }

    async addBookPreviews(pageRequest){
        let newPageRequest = new PageRequest(pageRequest);
        const bookList = await HomeUtils.getBookList(
            new BookRequestDtoBuilder()
            .setTitle(this.pageTitle)
            .setId(newPageRequest.id)
            .setDisplay(newPageRequest.display)
            .setStart(newPageRequest.start)
            .build()
        )
        this.previews = this.previews.concat(bookList);
    }

    async addReviewPreviews(pageRequest){
            new PreviewDoBuilder
        this.previews = this.previews.concat(
            new PreviewDoBuilder()
                .setTitle(this.pageTitle)
                .setImgURL("https://bookthumb-phinf.pstatic.net/cover/164/054/16405427.jpg?udate=20201222")
                .setDescription("만들어진 꿈을 살 수있는")
                .setCreatedAt("2020년 12월 13일")
                .setAuthor("jinseongho")
                .setId("1")
                .build()
        )
    }

}

export default PreviewPageDo;