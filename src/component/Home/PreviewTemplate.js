import BookPreview from './preview/BookPreview'
import ReviewPreview from './preview/ReviewPreview'
import PageType from './Do/PageType'

const getPreviewTemplate = (pageType, previewDo, onClick, handlePreviewClick) => {
    const template = {};
    template[PageType.BOOK] = <BookPreview preview={previewDo} handleReadReview={onClick} onClick={handlePreviewClick} />
    template[PageType.REVIEW] = <ReviewPreview preview={previewDo} />
    return template[pageType];
}

export {getPreviewTemplate};