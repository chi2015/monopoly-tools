<template>
  <div class="main">
    <div class="credit-head">Credit Line</div>
    <div class="credit-summary">
      <div class="months">
        <div class="c-text">Months left:</div>
        <div class="c-value">{{monthsLeft}}</div>
      </div>
      <div class="credit">
        <div class="c-text">Credit value:</div>
        <div class="c-value">{{credit}}</div>
      </div>
    </div>
    <div class="achieve-block">
      <div class="game-over" v-if="gameOver">GAME OVER!</div>
      <div class="credit-noclear" v-if="gameOver && !creditClear">You couldn't pay all credit! You're under arrest!</div>
      <div class="credit-clear" v-if="creditClear">Congratulations! You paid all credit!</div>
    </div>
    <div class="actions-block" v-if="!gameOver">
      <a class="add-credit credit-btn" href="javascript:void(0)" v-if="!gotCredit" v-on:click="addCredit">Add another credit</a>
      <div class="err-credit" v-if="errGet">You can't get credit anymore</div>
      <div class="pay-block" v-if="!minPayDone">
        <div class="pay-text">Pay for credit:</div>
        <input type="text" class="pay-input" v-model="payVal"/>
        <a class="pay-btn credit-btn" href="javascript:void(0)" v-on:click="pay">Pay</a>
        <div v-if="minimalPay" class="minimal-pay">Minimal pay: {{minimalPay}}</div>
      </div>
      <div class="err-credit" v-if="errPay">Your minimal pay is {{minimalPay}}. You can't pay less!</div>
      <a class="finish-btn credit-btn" href="javascript:void(0)"  v-if="!monthsLeft" v-on:click="finishGame">Finish game</a>
      <div class="next-month-block" v-if="monthsLeft">
        <a class="next-month credit-btn" href="javascript:void(0)" v-on:click="nextMonthUsual">Next month</a>
        <a class="next-month credit-btn" href="javascript:void(0)" v-on:click="nextMonthForce">Next month force (prison)</a>
      </div>
      <div class="err-credit" v-if="errPayDone">You didn't make minimal pay this month yet!</div>
    </div>
    <div class="reset-block"><a class="reset-btn credit-btn" href="javascript:void(0)" v-on:click="reset">Reset</a></div>
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
.credit-btn {
  display: flex;
  flex-direction: column;
  height: 36px;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  color: #000000;
}
.credit-btn:active {
  filter: brightness(85%);
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
.pay-btn {
  background-color: #ff6600;
  width: 60px;
}
.next-month-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.next-month {
  width: 210px;
  background-color: red;
  margin: 5px 10px;
}
.next-month:first-child {
  background-color:  #ff9999;
}
.reset-btn {
  background-color: #aaaaaa;
  width: 120px;
}
.add-credit {
  background-color: #00802b;
  width: 220px;
  margin-bottom: 10px;
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
.finish-btn {
  background-color: #99ccff;
  width: 150px;
  margin-bottom: 10px;
}
.reset-block {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
