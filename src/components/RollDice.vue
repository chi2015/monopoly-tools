<template>
  <div class="main">
    <div class="roll-buttons">
       <v-btn block color="primary" dark @click="rollDiceMove">Roll Dice For Move</v-btn>
       <v-btn block color="secondary" dark @click="rollDiceSimple">Roll Dice</v-btn>
    </div>
    <div class="dice-block">
    <div class="dice">
      <die v-bind:die-val="rollingDiceVal[0]"/>
      <die v-bind:die-val="rollingDiceVal[1]"/>
    </div>
    <div class="total"><span v-if="!rolling && total">Total: {{total}}</span></div>
    </div>
    <div class="double-note">
      <div v-bind:class="[vAlign, doubleTextClass, warnClass]">{{doubleText}}</div>
      <v-btn block color="warning" dark @click="resetDouble">Reset</v-btn>
    </div>
  </div>
</template>

<script>

// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

import Die from './Die';
import Vue from 'vue';

export default {
  name: 'RollDice',
  data() {
    return {
      rollingDiceVal: [0,0],
      vAlign: 'valign-text',
      doubleTextClass: 'double-text',
      rolling: false,
    };
  },
  created() {
     Vue.set(this.rollingDiceVal, 0 , this.$store.getters.DICE_VAL[0] || chance.d6());
     Vue.set(this.rollingDiceVal, 1 , this.$store.getters.DICE_VAL[1] || chance.d6());
  },
  components: {
		die : Die
  },
  computed: {
    total() {
      return this.$store.getters.TOTAL;
    },
    doubleText() {
      switch (this.doubleCnt) {
        case 2: return '2nd double in a row';
        case 3: return '3rd double in a row';
        default: return '';
      }
    },
    warnClass() {
      switch (this.doubleCnt) {
        case 2: return 'second';
        case 3: return 'third';
        default: return '';
      }
    },
    diceVal() {
      return this.$store.getters.DICE_VAL;
    },
    doubleCnt() {
      return this.$store.getters.DOUBLE_CNT;
    }
  },
  methods: {
    rollDiceSimple() {
      this.rollDice(false);
    },
    rollDiceMove() {
      this.rollDice(true);
    },
    rollDice(move) {
      if (this.rolling) return;
      this.rolling = true;
      let rollInterval = setInterval(() => {
        this.rollingDiceVal = [chance.d6(), chance.d6()];
      }, 50);
      setTimeout(() => {
        clearInterval(rollInterval);
        rollInterval = null;
        this.stopDice(move);
      }, 500);
    },
    stopDice(move) {
      this.rolling = false;
      this.$store.dispatch("setDiceVal", this.rollingDiceVal);
      if (this.diceVal[0] !== this.diceVal[1])
        this.resetDouble();
      if (move) {
        setTimeout(() => {
          this.$router.push('/gameboard');
          setTimeout(() => {
            this.$store.dispatch("moveChip", this.total);
          }, 1000);
        }, 1000);
        if (this.diceVal[0] === this.diceVal[1]) 
          this.$store.dispatch("addDouble");
      }
    },
    resetDouble() {
      this.$store.dispatch("resetDouble");
    },
  },
};
</script>

<style scoped>
  
.main {
  margin: 0 auto;
  background-color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: flex-start;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.roll-buttons {
  color: #1f2f49;
  display: flex;
  flex-direction: column;
}

.roll-move, .roll {
  width: 100%;
  height: 50%;
}

.valign-text {
  display: flex;
  justify-content: center;
  align-items:center;
}

.dice-block {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.dice {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.total {
  height: 14%;
}

.double-note {
  display: flex;
  flex-direction: column;
}

.double-note > div {
  width: 100%;
}

.double-text, .double-reset {
  height: 50%;
}

.double-text.second {
  background-color: #f4e64b;
}

.double-text.third {
  background-color: #f44a4a;
}

@media (min-width: 700px) {
  html, body {
    font-size: 45px;
  }
  
  .dice-block {
    height: 80%;
  }
  
  .roll-buttons, .double-note {
    height: 180px;
  }
    
  .main {
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 800px) and (orientation: portrait) {
  html, body {
    font-size: 10vw;
  }
  
  .main {
    flex-direction: column;
    height: 87vh;
  }
  
  .main > div, .roll-buttons > div, .double-note > div {
    width: 100%;
  }
    
  .roll-buttons {
    height: 25%;
  }
  
  .dice-block {
    height: 50%;
  }
  
  .double-note {
    height: 25%;
  }
}

@media (max-width: 800px) and (orientation: landscape) {
  html, body {
    font-size: 5vh;
  }
    
  .main {
    flex-direction: row;
    height: 87vh;
  }
  
  .main > div, .double-note > div {
    height: 100%;
  }
  
  .roll-buttons {
    width: 25%;
  }
  
  .dice-block {
    width: 50%;
  }
  
  .double-note {
    width: 25%;
  }
}
</style>
