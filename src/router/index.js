import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import RollDice from '@/components/RollDice';
import Credit from '@/components/Credit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/rolldice',
      name: 'RollDice',
      component: RollDice,
    },
    {
      path: '/credit',
      name: 'Credit',
      component: Credit,
    },
  ],
});
