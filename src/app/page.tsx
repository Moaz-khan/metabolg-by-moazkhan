import BlogSlider from "./component/blogslider";
import Contact from "./contact/page";
import ExploreBlogs from "./component/exploreblogs";
import SubscribeCard from "./component/subscribe";

export default function Home() {
  return (
    <div>
      <BlogSlider/>
      <ExploreBlogs/>
      <SubscribeCard/>
      <Contact/>
    </div>
  );
}
