import BookPreview from './preview/BookPreview'
import ReviewPreview from './preview/ReviewPreview'
import PageType from './Do/PageType'

const getPreviewTemplate = (pageType, previewDo, handleReadReview, handleWriteReview) => {
    const template = {};
    template[PageType.BOOK] = <BookPreview preview={previewDo} handleReadReview={handleReadReview} handleWriteReview={handleWriteReview} />
    template[PageType.REVIEW] = <ReviewPreview preview={previewDo} />
    return template[pageType];
}

export {getPreviewTemplate};