import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import Routes from "./routes";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <Routes />
      </Router>
    </MetaProvider>
  );
}
