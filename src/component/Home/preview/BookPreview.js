import Preview from './Preview';
import PreviewDo from '../Do/PreviewDo'
import noImage from './no_image.png'
class BookPreview extends Preview {
    
    shouldComponentUpdate(preProps){
        return preProps.preview !== this.props.preview;
    }

    constructor() {
        super();
    }

    render() {
        const {onClick} = this.props;
        const preview = new PreviewDo(this.props.preview);
        return (
            <div className="preview" onClick={() => (
                onClick(preview)
                )}>
                <div className="preview_img">
                    <img src={preview.imgURL || noImage} ></img>
                </div>
                <div className="preview_footer">
                    <h4
                        className="preview_title"
                        dangerouslySetInnerHTML={{ __html: preview.title }}
                    >
                    </h4>
                    <p
                        className="preview_description"
                        dangerouslySetInnerHTML={{ __html: preview.description }}
                    >
                    </p>
                    <div className="footer">
                        <span className="preview_createdAt">
                            {preview.createdAt}
                        </span>
                        <span className="preview_author">
                            {preview.author}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookPreview;