import HomeStateDo from '../../component/Home/Do/HomeStateDo';
import Axios from 'axios';
import UriBuilder from '../UriBuilder';
import BookResponseDto from './dto/BookResponseDto';
class HomeUtils {

    static getBookList = async (bookRequestDto) => {
        const uri = new UriBuilder("http://localhost:8080/book/search", bookRequestDto)
            .build();
        try {
            let response = await Axios.get(uri);
            return response;
        } catch (err) {
            return err;
        }
    };


    static scrollEnd = async (state) => {
        const newState = new HomeStateDo(state);
        await newState.pages.onScrollEnd();
        return newState;
    }

}

export default HomeUtils;