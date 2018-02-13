<template>
  <div class="main">
    <div class="roll-buttons">
      <div v-on:click="rollDiceMove" class="roll-move valign-text noselect">Roll Dice For Move</div>
      <div v-on:click="rollDiceSimple" class="roll valign-text noselect">Roll Dice</div>
    </div>
    <div class="dice-block">
    <div class="dice">
      <div v-for="(val, index) in rollingDiceVal"  class="dice-item valign-text">
        <template v-for="n in 9">
          <div class="dice-dot" v-bind:style="{ top: dotTop(n), left : dotLeft(n) }" v-if="showDot(val, n)"></div>
        </template>
      </div>
    </div>
    <div class="total"><span v-if="!rolling">{{total}}</span></div>
    </div>
    <div class="double-note">
      <div v-bind:class="[vAlign, doubleTextClass, warnClass]">{{doubleText}}</div>
      <div v-on:click="resetDouble" class="double-reset valign-text noselect">Reset</div>
    </div>
  </div>
</template>

<script>

// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

export default {
  name: 'RollDice',
  data() {
    return {
      rollingDiceVal: [chance.d6(), chance.d6()],
      diceVal: [0, 0],
      doubleCnt: 0,
      vAlign: 'valign-text',
      doubleTextClass: 'double-text',
      rolling: false,
    };
  },
  computed: {
    total() {
      const res = this.diceVal[0] + this.diceVal[1];
      return `Total: ${res}`;
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
      this.diceVal = [this.rollingDiceVal[0], this.rollingDiceVal[1]];
      if (move && this.diceVal[0] === this.diceVal[1]) this.doubleCnt += 1;
      else this.doubleCnt = 0;
      if (this.doubleCnt > 3) this.doubleCnt = 0;
    },
    resetDouble() {
      this.doubleCnt = 0;
    },
    dotTop(n) {
      const p = 12 + (30 * (Math.ceil(n / 3) - 1));
      return `${p}%`;
    },
    dotLeft(n) {
      const p = 12 + (30 * ((n - 1) % 3));
      return `${p}%`;
    },
    showDot(v, n) {
      let dotsArr = [];
      switch (v) {
        case 1: dotsArr = [5]; break;
        case 2: dotsArr = [3, 7]; break;
        case 3: dotsArr = [3, 5, 7]; break;
        case 4: dotsArr = [1, 3, 7, 9]; break;
        case 5: dotsArr = [1, 3, 5, 7, 9]; break;
        case 6: dotsArr = [1, 3, 4, 6, 7, 9]; break;
        default: dotsArr = []; break;
      }
      return dotsArr.indexOf(n) !== -1;
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

.roll-move {
  background-color: #6aa0f7;
}

.roll {
  background-color: #4a72b2;
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

.dice-item {
  background-color: red;
  position: relative;
  width: 40%;
  padding-bottom: 40%;
  border-radius: 15%;
}

.dice-dot {
  background-color: black;
  border-radius: 50%;
  position: absolute;
  width: 20%;
  height: 20%;
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

.double-reset {
  background-color: #666666;
  color: #aaaaaa;
}
  
.dice-dot {
  
}

@media (min-width: 700px) {
  html, body {
    font-size: 45px;
  }
  
  .dice-block {
    height: 450px;
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
    height: 100vh;
  }
  
  .main > div, .roll-buttons > div, .double-note > div {
    width: 100%;
  }
  
  .roll-move {
    font-size: 7vw;
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
    height: 100vh;
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
