import HomeStateDo from '../../component/Home/Do/HomeStateDo';
import Axios from 'axios';
import UriBuilder from '../UriBuilder';
import BookResponseDto from './dto/BookResponseDto';
import PageRequestBuilder from './PageRequestBuilder';
class HomeUtils {

    static getBookList = async (bookRequestDto) => {
        const uri = new UriBuilder("http://localhost:8080/book/search", bookRequestDto)
            .build();
        try {
            let response = await Axios.get(uri);
            return response.data.map(book => new BookResponseDto(book).toPreviewDo());
        } catch (err) {
            return err;
        }
    };

    static scrollisEnd = () => {
        const currentScrollValue = document.documentElement.scrollTop;
        const widnowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        return currentScrollValue + widnowHeight >= scrollHeight
    }

    static scrollEnd = async (state) => {
        const newState = new HomeStateDo(state);
        const activePageIndex = newState.pages.getActivePageIndex();
        let activePage = newState.pages.getActivePage();
        await activePage.addPreviews(
            new PageRequestBuilder()
                .setStart(0)
                .setDisplay(10)
                .build()
        )
        newState.pages.setPage(activePageIndex, activePage);
        return newState;
    }

}

export default HomeUtils;