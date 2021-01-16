import PreviewPageDo from "./PreviewPageDo.js";
import HomeUtils from '../../../../utils/HomeUtils/HomeUtils.js'
import PageRequest from '../../../../utils/HomeUtils/PageRequest.js'
import BookRequestDto from '../../../../utils/HomeUtils/dto/BookRequestDto.js';
import BookResponseDto from '../../../../utils/HomeUtils/dto/BookResponseDto.js';

class BookPreivewPageDo{
    constructor(bookPreviewPage){
        const previewPageDo = new PreviewPageDo(bookPreviewPage);
    }

    async addPreviews(pageRequest){
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
}

export default BookPreivewPageDo;