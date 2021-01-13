import { BrowserRouter } from "react-router-dom";
import { Home, Login, Signup, ComposeReview, Review } from "../pages";
import { Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/compose" component={ComposeReview}></Route>
            <Route exact path="/compose/:bookTitle" component={ComposeReview}></Route>
            <Route exact path="/review/:reviewId" component={Review}></Route>
        </BrowserRouter>
    );
};

export default Router;
