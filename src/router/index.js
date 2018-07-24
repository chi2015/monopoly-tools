import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import RollDice from '@/components/RollDice';
import Credit from '@/components/Credit';
import RandomCard from '@/components/RandomCard';
import Gameboard from '@/components/Gameboard';


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
    {
      path: '/randomcard',
      name: 'RandomCard',
      component: RandomCard
    },
    {
      path: '/gameboard',
      name: 'Gameboard',
      component: Gameboard
    }
  ],
});
