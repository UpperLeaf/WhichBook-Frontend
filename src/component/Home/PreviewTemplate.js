import BookPreview from './content/BookPreview'
import ReviewPreview from './content/ReviewPreview'
import PageType from './Do/PageType'

const getPreviewTemplate = (pageType, previewDo) => {
    const template = {};
    template[PageType.BOOK] = <BookPreview preview={previewDo}/>
    template[PageType.REVIEW] = <ReviewPreview preview={previewDo}/>
    return template[pageType];
}

export {getPreviewTemplate};