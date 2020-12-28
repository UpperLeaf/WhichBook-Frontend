import Navigation from '../component/navigation/Navigation';
import Main from '../component/main/Main'
import Search from '../component/Home/search/Search'

const Home = () => {
    return (
        <Main>
            <Navigation />
            <Search/>
        </Main>
    )
}

export default Home;