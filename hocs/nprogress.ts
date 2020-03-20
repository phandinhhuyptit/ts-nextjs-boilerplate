import NProgress from 'nprogress';
import Router from 'next/router';
import {NextPage} from 'next';

let delayMs = 300;
let timer: NodeJS.Timeout | number | null = null;

// when a route change start run a timeout to init the progress bar
Router.router?.events.on('onRouteChangeStart', () => {
  timer = setTimeout(NProgress.start, delayMs);
});

// when completed finish the progress bar and clear the timeout
Router.router?.events.on('onRouteChangeComplete', () => {
  NProgress.done();
  clearTimeout(timer as number);
});

// when errored finish the progress bar and clear the timeout
Router.router?.events.on('onRouteChangeError', () => {
  NProgress.done();
  clearTimeout(timer as number);
});

export const nprogress = (_delayMs = delayMs, configOptions: {showSpinner: boolean}) => {
  delayMs = _delayMs;
  // configure NProgress if configuration object is passed
  if (configOptions) NProgress.configure(configOptions);
  // receive page and return it as is
  return (page: NextPage) => page;
};
