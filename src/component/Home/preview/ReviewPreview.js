import Preview from './Preview';
import PreviewDo from '../Do/PreviewDo'
import noImage from './no_image.png'
import './ReviewPreview.css'
class ReviewPreview extends Preview {

    constructor() {
        super();
    }

    render() {
        const preview = new PreviewDo(this.props.preview);
        return (
            <div className="review_preview">
                <div className="review_preview_img">
                    <img src={preview.imgURL || noImage} ></img>
                </div>
                <div className="review_preview_details">
                     <h4
                         className="review_preview_title"
                         dangerouslySetInnerHTML={{ __html: preview.title }}
                     >
                     </h4>
                     <p
                         className="review_preview_description"
                         dangerouslySetInnerHTML={{ __html: preview.description }}
                     >
                     </p>
                         <span className="review_preview_createdAt">
                             {preview.createdAt}
                         </span>
                         <span className="review_preview_author">
                             {preview.author}
                         </span>
                </div>
            </div>
        )
    }

}

export default ReviewPreview;