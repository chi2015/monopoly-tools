<template>
  <div class="main">
    <v-card>
    <v-card-title><h3>Credit Line</h3></v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-content>Months left:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{monthsLeft}}</v-list-tile-content>
      </v-list-tile>
       <v-list-tile>
        <v-list-tile-content>Credit value:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{credit}}</v-list-tile-content>
      </v-list-tile>
       <v-list-tile v-if="minimalPay && !minPayDone">
        <v-list-tile-content>Minimal pay:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{minimalPay}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
    <div class="achieve-block">
      <div class="game-over" v-if="gameOver">GAME OVER!</div>
      <div class="credit-noclear" v-if="gameOver && credit > 0">You couldn't pay all credit! You're under arrest!</div>
      <div class="credit-clear" v-if="credit<=0">Congratulations! You paid all credit!</div>
    </div>
    <div class="actions-block" v-if="!gameOver">
      <v-btn color="warning" v-if="!gotCredit && monthsLeft>=12" @click="addCredit">Add another credit</v-btn>
      <div class="err-credit" v-if="errGet">You can't get credit anymore</div>
      <div class="pay-block" v-if="!minPayDone">
        <div class="pay-text">Pay for credit:</div>
        <input type="text" class="pay-input" v-model="payVal"/>
        <v-btn color="info" @click="pay">Pay</v-btn>
      </div>
      <div class="err-credit" v-if="errPay">Your minimal pay is {{minimalPay}}. You can't pay less!</div>
      <v-btn color="success" @click="nextMonthUsual" v-if="!monthsLeft">Finish game</v-btn>
      <div class="next-month-block" v-if="monthsLeft">
        <v-btn color="primary" @click="nextMonthUsual">Next month</v-btn>
        <v-btn color="secondary" @click="nextMonthForce">Next month (from prison)</v-btn>
      </div>
      <div class="err-credit" v-if="errPayDone">You didn't make minimal pay this month yet!</div>
    </div>
    <div class="reset-block">
      <v-btn v-if="monthsLeft" color="error" @click="reset">Reset</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {       
        errPayDone: false,
        errPay: false,
        errGet: false,
        gameOver: false
      };
    },
    computed: {
      minimalPay() {
        return this.$store.getters.MINIMAL_PAY;
      },
      monthsLeft() {
        return this.$store.getters.MONTHS_LEFT;
      },
      credit() {
        return this.$store.getters.CREDIT;
      },
      payVal() {
        return this.$store.getters.PAY_VAL;
      },
      minPayDone() {
        return this.$store.getters.MIN_PAY_DONE;
      },
      gotCredit() {
        return this.$store.getters.GOT_CREDIT;
      }
    },
    methods: {
      pay() {
        if (this.payVal < this.minimalPay) { this.errPay = true; return; }
        this.errPay = false;
        this.$store.dispatch("pay");
        this.errPayDone = false;
      },
      addCredit() {
        if (this.monthsLeft < 12) { this.errGet = true; return; }
        this.$store.dispatch("addCredit");
      },
      nextMonthUsual() {
        this.nextMonth(false);
      },
      nextMonthForce() {
        this.nextMonth(true);
      },
      nextMonth(force) {
        if (!force) {
          if (this.monthsLeft < 12 && !this.minPayDone) { this.errPayDone = true; return; }
        }
        this.$store.dispatch("nextMonth");
        this.errPayDone = false;
        this.errGet = false;
      },
      finishGame() {
        this.gameOver = true;
      },
      reset() {
       this.$store.dispatch("reset");
        this.errPayDone = false;
        this.errPay = false;
        this.errGet = false;
        this.gameOver = false;
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
  flex-direction: column;
  justify-content: flex-start;
  max-width: 660px;
}
.main > div {
  width: 100%;
}
.credit-head {
  font-size: 30px;
  height: 45px;
  display: flex;
  margin-top: 23px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.credit-summary {
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
    flex-wrap: wrap;
    align-content: space-around;
}
.credit-summary > div {
  display: flex;
  flex-direction: row;
}
.credit-summary > div > div {
  height: 25px;
  width: 140px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 2px;
  margin-bottom: 2px;
}

.c-text {
  text-align: center;
  background-color: #999999;
}
.c-value {
  text-align: center;
  background-color: #e6b800;
}
.actions-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.pay-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
}
.pay-input {
  font-size: 26px;
  height: 36px;
  width: 100px;
  margin: 0 4px 0 12px;
  text-align: center;
  border: 1px black solid;
  line-height: normal;
}

.next-month-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.err-credit {
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin: 5px;
}
.minimal-pay {
  color: #00802b;
  margin-top: 5px;
  margin-left: 20px;
}
.game-over {
  font-size: 24px;
}
.credit-clear {
  color: green;
  margin: 10px;
}
.credit-noclear {
  color: red;
  margin: 10px;
}
.reset-block {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
