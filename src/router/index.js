import Vue from 'vue';
import Router from 'vue-router';
import App from '../components/App';
import Start from '../components/Start';
import CollectionList from '../components/collection_list';
import CollectionSingle from '../components/collection_single';
import Query from '../components/query';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: (to) => {
        if (to.params.lang !== 'en' || to.params.lang !== 'de') {
          // const language = window.navigator.userLanguage || window.navigator.language;
          return '/en';
        }
        return to.fullPath;
      },
    },
    {
      path: '/:lang',
      components: {
        default: App,
      },
      // Children to the root path '/'
      children: [
        {
          path: 'start',
          name: 'start',
          components: {
            Content: Start,
          },
        },
        {
          path: 'collections',
          name: 'collections',
          components: {
            Content: CollectionList,
          },
        },
        {
          path: 'collection/:id',
          name: 'collection',
          components: {
            Content: CollectionSingle,
          },
        },
        {
          path: 'query',
          name: 'query',
          components: {
            Content: Query,
          },
        },
        {
          path: '',
          redirect: { name: 'start' },
        },
      ],
    },
  ],
  scrollBehavior() {
    // always scroll back to the top
    return { x: 0, y: 0 };
  },
});
