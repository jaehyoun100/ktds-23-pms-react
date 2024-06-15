import ReviewApp from "../../components/review/ReviewApp";
import ViewReview from "../../components/review/reviewComponents/ViewReview";

const reviewRouter = {
    path: "review/",
    children: [
        {path: "write", element: <ReviewApp />},
        {path: "result", element: <ViewReview />}
],
};
export default reviewRouter;
