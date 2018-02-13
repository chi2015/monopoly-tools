<!--<template>
  <div id="app">
    <h1 v-on:click="home()">Monopoly Tools</h1>
    <template v-for="tool in tools">
    <router-link class="tool-link" :to="tool.link">{{tool.name}}</router-link>
  </template>  
    <router-view/>
  </div>
</template>-->

<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="home()">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="tool in tools">
          <v-list-tile @click="tool.goto">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{tool.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
         </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-width>
        <v-layout
          justify-center
          align-center
        >
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      tools: [
        {
          name: 'Roll the Dice',
          link: '/rolldice',
          goto : function() { this.rolldice() }.bind(this)
        },
        {
          name: 'Calc Credit Line',
          link: '/credit',
          goto: function() { this.credit() }.bind(this)
        },
      ],
      drawer: true,
    };
  },
  props: {
    source: String,
  },
  methods: {
    home() {
      this.$router.push('/');
    },
    rolldice() {
      this.$router.push('/rolldice');
    },
    credit() {
      this.$router.push('/credit');
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tool-link {
  margin: 10px;
}
</style>
