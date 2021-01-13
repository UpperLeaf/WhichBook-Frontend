import BookPreview from './preview/BookPreview'
import ReviewPreview from './preview/ReviewPreview'
import PageType from './Do/PageType'

const getPreviewTemplate = (pageType, previewDo, onClick) => {
    const template = {};
    template[PageType.BOOK] = <BookPreview preview={previewDo} onClick={onClick}/>
    template[PageType.REVIEW] = <ReviewPreview preview={previewDo} />
    return template[pageType];
}

export {getPreviewTemplate};