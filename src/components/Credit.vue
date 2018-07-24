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
      <div class="credit-noclear" v-if="gameOver && !creditClear">You couldn't pay all credit! You're under arrest!</div>
      <div class="credit-clear" v-if="creditClear">Congratulations! You paid all credit!</div>
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
        monthsLeft: 24,
        credit: 1000,
        percent: 1,
        creditVal: 200,
        gotCredit: true,
        payVal: 0,
        errPayDone: false,
        errPay: false,
        errGet: false,
        creditClear: false,
        gameOver: false,
        minPayDone: false,
      };
    },
    computed: {
      minimalPay() {
        return this.monthsLeft < 12 ? Math.ceil(this.credit / (this.monthsLeft + 1)) : 0;
      },
    },
    methods: {
      pay() {
        if (this.minPayDone) return;
        if (this.payVal < this.minimalPay) { this.errPay = true; return; }
        this.errPay = false;
        this.credit -= this.payVal;
        this.minPayDone = true;
        this.errPayDone = false;
        if (this.credit <= 0) { this.credit = 0; this.creditClear = true; }
      },
      addCredit() {
        if (this.gotCredit) return;
        if (this.monthsLeft < 12) { this.errGet = true; return; }
        this.credit += this.creditVal;
        this.gotCredit = true;
        this.creditClear = false;
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
        this.errPayDone = false;
        this.monthsLeft -= 1;
        this.credit = Math.ceil((this.credit * (100 + this.percent)) / 100);
        this.errGet = false;
        this.minPayDone = false;
        this.gotCredit = false;
        this.payVal = this.minimalPay;
      },
      finishGame() {
        this.gameOver = true;
      },
      reset() {
        this.monthsLeft = 24;
        this.credit = 1000;
        this.payVal = 0;
        this.errPayDone = false;
        this.errPay = false;
        this.errGet = false;
        this.gameOver = false;
        this.minPayDone = false;
        this.creditClear = false;
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
