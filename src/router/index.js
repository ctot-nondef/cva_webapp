import Vue from 'vue';
import Router from 'vue-router';
import App from '../components/App';
import Start from '../components/Start';
import standorte from '../components/standorte';
import standortsingle from '../components/standort_single';
import fenster from '../components/fenster';
import fenstersingle from '../components/fenster_single';
import actors from '../components/actors';

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
          path: 'standorte',
          name: 'standorte',
          components: {
            Content: standorte,
          },
        },
        {
          path: 'standorte/:id',
          name: 'standortsingle',
          components: {
            Content: standortsingle,
          },
        },
        {
          path: 'fenster',
          name: 'fenster',
          components: {
            Content: fenster,
          },
        },
        {
          path: 'fenster/:id',
          name: 'fenstersingle',
          components: {
            Content: fenstersingle,
          },
        },
        {
          path: 'actors',
          name: 'actors',
          components: {
            Content: actors,
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
