import { Route } from "@solidjs/router";
import Home from "./routes/index";
import Contact from "./routes/contact";
import Blog from "./routes/blog";
import BlogPost from "./routes/blog/[slug]";
import Guestbook from "./routes/guestbook";
import NotFound from "./routes/[...404]";

export default function Routes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/guestbook" component={Guestbook} />
      <Route path="*" component={NotFound} />
    </>
  );
}
