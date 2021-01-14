// import PreviewPageDo from "./PreviewPageDo.js";
// import HomeUtils from '../../../../utils/HomeUtils/HomeUtils.js'
// import PageRequest from '../../../../utils/HomeUtils/PageRequest.js'
// import BookRequestDtoBuilder from '../../../../utils/HomeUtils/dto/BookRequestDtoBuilder.js';
// import BookResponseDto from '../../../../utils/HomeUtils/dto/BookResponseDto.js';

// class ReviewPreivewPageDo extends PreviewPageDo{
//     constructor(bookPreviewPage){
//         super(bookPreviewPage);
//     }

//     async addPreviews(pageRequest){
//         let newPageRequest = new PageRequest(pageRequest);
//         const response = (await HomeUtils.getBookList(
//             new BookRequestDtoBuilder()
//                 .title(this.pageTitle)
//                 .id(newPageRequest.id)
//                 .display(newPageRequest.display)
//                 .start(newPageRequest.start)
//                 .build()
//         ));
//         if (response.status === 200 && response.data.length !== 0) {
//             const bookList = response.data.map(book => new BookResponseDto(book).toPreviewDo());
//             this.previews = this.previews.concat(bookList);
//             return true;
//         }
//         return false;
//     }
// }
// export default ReviewPreivewPageDo;