<template>
  <div class="main">
  <h1>Gameboard</h1>
  <div class="gameboard">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>


  </div>
  
  </div>
</template>

<script>
export default {
  name: 'Gameboard',
  data() {
    return {
      msg: 'Welcome!',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.main {
    max-height: 600px;
    max-width: 600px;
    width: 90%;
    height: 90%;
    margin: 0 auto;
}
.gameboard {
    border: 2px #000 solid;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}

.gameboard .item {
    border: 2px #000 solid;
}
</style>