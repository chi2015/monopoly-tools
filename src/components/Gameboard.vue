<template>
  <div class="main">
  <h1>Gameboard</h1>
  <div class="gameboard">
    <template v-for="block in fieldsToBlocks">
      <template v-if="block.group == 'center'"><div class="center" :key="block.position">center</div></template>
      <template v-if="block.group != 'center'"><div class="field" :key="block.position"
      :style="{backgroundColor: block.group}">{{block.text}}</div></template>
    </template>
    <div class="chip" :style="{ top: chipAbsolutePos.top, left: chipAbsolutePos.left }"></div>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'Gameboard',
  data() {
    return {
      msg: 'Welcome!',
      fields: [
        { group : 'white', position: 0, text: 'start'},
        { group : 'brown', position: 1, text: 'M60'},
        { group : 'white', position: 2, text: '$$$'},
        { group : 'brown', position: 3, text: 'M60'},
        { group : 'white', position: 4, text: '-200'},
        { group : 'black', position: 5, text: 'M200'},
        { group: 'blue', position: 6, text: 'M100'},
        { group: 'white', position: 7, text: '?'},
        { group: 'blue', position: 8, text: 'M100'},
        {group: 'blue', position: 9, text: 'M120'},
        {group: 'white', position: 10, text: 'Prison/Just visit'},
        { group : 'pink', position: 11, text: 'M140'},
        { group : 'grey', position: 12, text: 'M150'},
        { group : 'pink', position: 13, text: 'M140'},
        { group : 'pink', position: 14, text: 'M160'},
        { group : 'black', position: 15, text: 'M200'},
        { group: 'orange', position: 16, text: 'M180'},
        { group: 'white', position: 17, text: '$$$'},
        { group: 'orange', position: 18, text: 'M180'},
        { group: 'orange', position: 19, text: 'M200'},
        { group: 'white', position: 20, text: 'Free parking'},
        { group : 'red', position: 21, text: 'M220'},
        { group : 'white', position: 22, text: '?'},
        { group : 'red', position: 23, text: 'M220'},
        { group : 'red', position: 24, text: 'M240'},
        { group : 'black', position: 25, text: 'M200'},
        { group: 'yellow', position: 26, text: 'M260'},
        { group: 'yellow', position: 27, text: 'M260'},
        { group: 'grey', position: 28, text: 'M150'},
        { group: 'yellow', position: 29, text: 'M280'},
        { group: 'white', position: 30, text: 'Go to prison'},
        { group : 'green', position: 31, text: 'M300'},
        { group : 'green', position: 32, text: 'M300'},
        { group : 'white', position: 33, text: '$$$'},
        { group : 'green', position: 34, text: 'M320'},
        { group : 'black', position: 35, text: 'M200'},
        { group: 'white', position: 36, text: '???'},
        { group: 'purple', position: 37, text: 'M350'},
        { group: 'white', position: 38, text: '-100'},
        { group: 'purple', position: 39, text: 'M400'}
      ]
    };
  },
  created() {
    setInterval(() => {
        this.$store.dispatch("moveChip", 7);
    },3000)
  },
  computed : {
    fieldsToBlocks : function() {
        let blocks = [];
        for (let i=0; i<=10; i++) blocks.push(this.fields[i]);
        blocks.push(this.fields[39]);
        blocks.push({ group : 'center'});
        blocks.push(this.fields[11]);
        for (let j=0; j<8; j++) {
          blocks.push(this.fields[38-j]);
          blocks.push(this.fields[12+j]);
        }
        for (let k=0; k<=10; k++)
          blocks.push(this.fields[30-k]);
        return blocks;
    },
    chipPos : function() {
        return this.$store.getters.CHIP_POS;
    },
    chipAbsolutePos : function() {
        let top;
        let left = '5%';
        
        if (this.chipPos <= 10) top = '5%'; 
        if (this.chipPos > 0 && this.chipPos < 10) left = (10 + (this.chipPos % 10) * 7.5) + '%';
        if (this.chipPos >=10 && this.chipPos <= 20) left = '90%';
        if (this.chipPos > 10 && this.chipPos < 20) top = (10 + (this.chipPos % 10) * 7.4) + '%';
        if (this.chipPos >=20 && this.chipPos <=30 ) top = '90%';
        if (this.chipPos > 20 && this.chipPos <30) left = (85 - (this.chipPos % 10) * 7.5) + '%';
        if (this.chipPos > 30 && this.chipPos <=39) top = (85 - (this.chipPos % 10) * 7.4) + '%';
        if (this.chipPos >= 30 && this.chipPos <=39) left = '5%';
        return { top : top, left: left};
    }
  }
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
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
    grid-template-rows: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
    position: relative;
}

.gameboard .field {
    border: 2px #000 solid;
}
.gameboard .center {
  grid-row-start: 2;
  grid-row-end: 11;
  grid-column-start: 2;
  grid-column-end: 11;
}

.chip {
  position: absolute;
  width: 5%;
  height: 5%;
  border-radius: 50%;
  background-color: white;
  border: 1px #000 solid;
  transition: all 1s ease-out;
}
</style>