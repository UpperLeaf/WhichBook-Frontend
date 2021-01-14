import Preview from './Preview';
import PreviewDo from '../Do/PreviewDo'
import noImage from './no_image.png'
import {Link} from 'react-router-dom'
class BookPreview extends Preview {
    
    shouldComponentUpdate(preProps){
        return preProps.preview !== this.props.preview;
    }

    constructor() {
        super();
    }
    
    render() {
        const {handleReadReview} = this.props;
        const preview = new PreviewDo(this.props.preview);
        return (
            <div className={`preview`} onClick={(e) => {
                const main_x = document.querySelector('.main').getBoundingClientRect().x;
                const x = (e.nativeEvent.pageX.toString()-main_x)+"px";
                const y = e.nativeEvent.pageY.toString()+"px";
                const target = e.currentTarget.querySelector(".preview_short_cuts");
                target.style.left = x; 
                target.style.top = y
                e.currentTarget.classList.toggle("active")
            }}>
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
                <div className="preview_short_cuts">
                    <div className="item" onClick={(e) => {
                        handleReadReview(preview)}}>
                        리뷰 보기
                    </div>
                    <Link className="item"to={`/compose/${preview.getTitle()}`}>
                    <div>
                        리뷰 작성하기
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default BookPreview;