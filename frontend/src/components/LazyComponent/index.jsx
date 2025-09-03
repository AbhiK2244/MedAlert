import { Suspense } from "react";
import LoadingBar from "./components/LoadingBar";


const LazyComponent = ({ children }) => {
  return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
};

export default LazyComponent;
