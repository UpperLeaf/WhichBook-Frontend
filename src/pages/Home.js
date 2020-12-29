import Navigation from '../component/navigation/Navigation';
import Main from '../component/Main'
import Search from '../component/Home/Search'

const Home = () => {
    return (
        <Main>
            <Navigation />
            <Search/>
        </Main>
    )
}

export default Home;