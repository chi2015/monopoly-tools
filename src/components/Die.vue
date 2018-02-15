<template>
	<div class="die valign-text">
		<template v-for="n in 9">
		  <div class="die-dot" v-bind:style="{ top: dotTop(n), left : dotLeft(n) }" v-if="showDot(dieVal, n)"></div>
		</template>
	</div>
</template>

<script>

// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

export default {
  name: 'Die',
  props: ['dieVal'],
  data() {
    return {
      
    };
  },
  methods: {
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

.dice {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.die {
  background-color: red;
  position: relative;
  width: 40%;
  padding-bottom: 40%;
  border-radius: 15%;
}

.valign-text {
  display: flex;
  justify-content: center;
  align-items:center;
}

.die-dot {
  background-color: black;
  border-radius: 50%;
  position: absolute;
  width: 20%;
  height: 20%;
}

</style>
