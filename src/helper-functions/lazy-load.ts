import LazyLoad from "react-lazyload";

// for some reason, when run in the browser, LazyLoad is set to default, whereas in Node, it is set to {default, ...}
// so, we'll just manually check if default exists

let ActualLazyLoad;
if ("default" in LazyLoad) ActualLazyLoad = LazyLoad.default;
else ActualLazyLoad = LazyLoad;

export default (ActualLazyLoad as typeof LazyLoad);