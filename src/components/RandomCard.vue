<template>
  <div class="main">
    <div v-bind:class="[cardClass, cards[card]]"/>
  </div>
</template>

<script>
    const Chance = require('chance');

    // Instantiate Chance so it can be used
    const chance = new Chance();

  export default {
    data() {
      return {
        cards: ['kaluga', 
                'kazan', 
                'ufa', 
                'rostov', 
                'nizhniy', 
                'perm',
                'tomsk',
                'krasnodar',
                'archangelsk',
                'chelyabinsk',
                'novosibirsk',
                'vodoprovod',
                'electro',
                'stavropol',
                'rizhskayazd',
                'belgorod',
                'leninzd',
                'kurskzd',
                'kazanzd',
                'habarovsk',
                'omsk',
                'ekaterinburg',
                'samara',
                'saint',
                'volgograd',
                'moscow',
                'tumen',
                'vladivostok'
                ],
        card : 0,
        shuffling : false
      };
    },
    computed: {
        cardClass() {
            if (this.card >= 0 && this.card < 10) return 'monopoly-card1';
            if (this.card >= 10 && this.card < 20) return 'monopoly-card2';
            if (this.card >= 20 && this.card < 28) return 'monopoly-card3';
            return 'monopoly-card1';
        }
    },
    mounted() {
      //  this.cards.sort(() => Math.random() - 0.5);
        var changeCardInterval = setInterval(() => {this.card = chance.integer({ min: 0, max: this.cards.length -1  })}, 300);
        setTimeout(() => {clearInterval(changeCardInterval);}, 5000);
    },
    methods: {
      
    },
  };
</script>

<style scoped>
.main {
  margin: 0 auto;
  background-color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 660px;
}

.monopoly-card1 {
    background-image: url("../../static/monopoly-cards1.jpg");
}

.monopoly-card2 {
    background-image: url("../../static/monopoly-cards2.jpg");
}

.monopoly-card3 {
    background-image: url("../../static/monopoly-cards3.jpg");
}

.monopoly-card1, .monopoly-card2, .monopoly-card3 {
    margin-top: 40px;
    width: 325px;
    height: 500px;
}

.monopoly-card1.kaluga, .monopoly-card2.novosibirsk {
    background-position: -100px 0;
}
.monopoly-card1.kazan, .monopoly-card2.vodoprovod, .monopoly-card3.omsk {
    background-position: -425px 0;
}
.monopoly-card1.ufa, .monopoly-card2.electro, .monopoly-card3.ekaterinburg {
    background-position: -750px 0;
}
.monopoly-card1.rostov, .monopoly-card2.stavropol, .monopoly-card3.samara {
    background-position: -1075px 0;
}
.monopoly-card1.nizhniy, .monopoly-card2.rizhskayazd, .monopoly-card3.saint {
    background-position: -1400px 0;
}
.monopoly-card1.perm, .monopoly-card2.belgorod {
    background-position: -100px -500px;
}
.monopoly-card1.tomsk, .monopoly-card2.leninzd, .monopoly-card3.volgograd {
    background-position: -425px -500px;
}
.monopoly-card1.archangelsk, .monopoly-card2.kurskzd, .monopoly-card3.moscow {
    background-position: -750px -500px;
}
.monopoly-card1.krasnodar, .monopoly-card2.kazanzd, .monopoly-card3.tumen {
    background-position: -1075px -500px;
}   
.monopoly-card1.chelyabinsk, .monopoly-card2.habarovsk, .monopole-card3.vladivostok {
    background-position: -1400px -500px;
}
</style>
