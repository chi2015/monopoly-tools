<template>
  <div class="main">
    <v-carousel :hide-controls="true" :hide-delimiters="true"
        :cycle="false"
        v-bind:value="currentCard">
      <v-carousel-item
        v-for="(card,index) in cardsDeck"
        :key="index"
        :src="backgroundImg(card)"
        :class="['monopoly-card', cardClass(card), card]"
      ></v-carousel-item>
    </v-carousel>
    <div class="selected-cards">
        <div v-for="(card, index) in myCards" :key="index" :class="['monopoly-card', cardClass(card), card]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
        cardsDeck() {
            return this.$store.getters.CARDS_DECK;
        },
        myCards() {
           return this.$store.getters.MY_CARDS;
        },
        currentCard() {
            return this.$store.getters.CURRENT_CARD;
        }
    },
    mounted() { 
      this.selectCard();
    },
    methods: {
      cardClass(card) {
            if (~this.$store.getters.CARDS1.indexOf(card)) return 'monopoly-card1';
            if (~this.$store.getters.CARDS2.indexOf(card)) return 'monopoly-card2';
            if (~this.$store.getters.CARDS3.indexOf(card)) return 'monopoly-card3';
            return 'monopoly-card1';
        },
        backgroundImg(card) {
            if (~this.$store.getters.CARDS1.indexOf(card)) return "../../static/monopoly-cards1.jpg";
            if (~this.$store.getters.CARDS2.indexOf(card)) return "../../static/monopoly-cards2.jpg";
            if (~this.$store.getters.CARDS3.indexOf(card)) return "../../static/monopoly-cards3.jpg";
            return 'monopoly-card1';
        },
        selectCard() {
            this.$store.dispatch('selectCard');
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
