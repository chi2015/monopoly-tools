<template>
  <div class="main">
    <v-carousel :hide-controls="true" :hide-delimiters="true"
        :cycle="false"
        v-bind:value="card">
      <v-carousel-item
        v-for="(card,index) in cards"
        :key="index"
        :src="backgroundImg(card)"
        :class="['monopoly-card', cardClass(card), card]"
      ></v-carousel-item>
    </v-carousel>
    <div class="selected-cards">
        <div v-for="(card, index) in selectedCards" :key="index" :class="['monopoly-card', cardClass(card), card]"></div>
    </div>
  </div>
</template>

<script>
    const Chance = require('chance');

    // Instantiate Chance so it can be used
    const chance = new Chance();

  export default {
    data() {
      return {
        cards: [
                
                
                ],
        cards1: ['kaluga', 
                'kazan', 
                'ufa', 
                'rostov', 
                'nizhniy', 
                'perm',
                'tomsk',
                'krasnodar',
                'archangelsk',
                'chelyabinsk',],
        cards2: ['novosibirsk',
                'vodoprovod',
                'electro',
                'stavropol',
                'rizhskayazd',
                'belgorod',
                'leninzd',
                'kurskzd',
                'kazanzd',
                'habarovsk',],
        cards3: ['omsk',
                'ekaterinburg',
                'samara',
                'saint',
                'volgograd',
                'moscow',
                'tumen',
                'vladivostok'],
        card : 0,
        selectedCard : 0,
        shuffling : false,
        selectedCards : [],
        numToSelect : 5,
      };
    },
    computed: {
        
    },
    mounted() { 
      this.selectCard();
    },
    methods: {
      cardClass(card) {
            if (~this.cards1.indexOf(card)) return 'monopoly-card1';
            if (~this.cards2.indexOf(card)) return 'monopoly-card2';
            if (~this.cards3.indexOf(card)) return 'monopoly-card3';
            return 'monopoly-card1';
        },
        backgroundImg(card) {
            if (~this.cards1.indexOf(card)) return "../../static/monopoly-cards1.jpg";
            if (~this.cards2.indexOf(card)) return "../../static/monopoly-cards2.jpg";
            if (~this.cards3.indexOf(card)) return "../../static/monopoly-cards3.jpg";
            return 'monopoly-card1';
        },
        selectCard() {
            this.cards = [...this.cards1, ...this.cards2, ...this.cards3,...this.cards1, ...this.cards2, ...this.cards3,...this.cards1, ...this.cards2, ...this.cards3]
            .filter(card => !~this.selectedCards.indexOf(card));
            this.cards.sort(() => Math.random() - 0.5);
            this.card = 0;
            this.selectedCard = chance.integer({ min: 56, max: this.cards.length -1  });
            var changeCard = () => {
                this.card++; 
                if (this.card < this.selectedCard) setTimeout(changeCard, 380 - 5*(this.selectedCard - this.card));
                else {
                    setTimeout(() => { 
                        this.selectedCards.push(this.cards[this.selectedCard]); 
                        if (this.selectedCards.length < this.numToSelect) setTimeout(this.selectCard, 1000);
                    }, 1000);
                    
                }
            };
            changeCard();
        }
    },
  };
</script>

<style scoped>
.main {
  margin: 40px auto;
  background-color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 /* max-width: 760px;*/
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
    background-size: 523% auto;
}

.monopoly-card1.kaluga, .monopoly-card2.novosibirsk {
    background-position: 7% 0;
}
.monopoly-card1.kazan, .monopoly-card2.vodoprovod, .monopoly-card3.omsk {
    background-position: 31% 0;
}
.monopoly-card1.ufa, .monopoly-card2.electro, .monopoly-card3.ekaterinburg {
    background-position: 54% 0;
}
.monopoly-card1.rostov, .monopoly-card2.stavropol, .monopoly-card3.samara {
    background-position: 77% 0;
}
.monopoly-card1.nizhniy, .monopoly-card2.rizhskayazd, .monopoly-card3.saint {
    background-position: 100% 0;
}
.monopoly-card1.perm, .monopoly-card2.belgorod {
    background-position: 7% 70%;
}
.monopoly-card1.tomsk, .monopoly-card2.leninzd, .monopoly-card3.volgograd {
    background-position: 31% 70%;
}
.monopoly-card1.krasnodar, .monopoly-card2.kurskzd, .monopoly-card3.moscow {
    background-position: 54% 70%;
}
.monopoly-card1.archangelsk, .monopoly-card2.kazanzd, .monopoly-card3.tumen {
    background-position: 77% 70%;
}   
.monopoly-card1.chelyabinsk, .monopoly-card2.habarovsk, .monopoly-card3.vladivostok {
    background-position: 100% 70%;
}
.carousel {
    width: 200px;
    height: 294px;
}
.monopoly-card.carousel__item {
    background-size: 523% auto;
}
.selected-cards {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 660px;
}
.selected-cards .monopoly-card {
    margin: 10px;
    width: 120px;
    height: 185px;
    
}
</style>
