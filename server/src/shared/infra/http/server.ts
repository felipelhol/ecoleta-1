import App from './app';

App.listen(process.env.APP_API_PORT || 3333, () => {
  // eslint-disable-next-line
   console.log('🚀  Server started on port 3333!');
});
