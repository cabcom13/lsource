<template>
  <div id="app">
<v-app>
  <v-navigation-drawer mini-variant fixed app dark color="grey darken-4">
    <v-list dense>
        <v-list-tile ripple to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple to="/addsource">
          <v-list-tile-action>
            <v-icon>playlist_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Quelle hinzufügen</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple to="/managetyps">
          <v-list-tile-action>
            <v-icon>storage</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Typenvorlage verwalten</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  <v-toolbar app  dark flat prominent>
    <v-toolbar-title>Quellenverwaltung</v-toolbar-title>

  </v-toolbar>
  <v-content>

      <router-view/>
    
  </v-content>
  <v-footer app dark>Quellenverwaltung 1.0</v-footer>
</v-app>
  <!--  <img src="./assets/logo.png">-->

  </div>
</template>

<script>

export default {
  name: 'App',
  data:()=>{
    return {
      test: 'ABC'
    }
  }
}
</script>

<style>
body{

}
.application .theme--dark.footer, .theme--dark .footer{
  background:black;
}
.application .theme--dark.navigation-drawer, .theme--dark .navigation-drawer{
  background:black;
}
</style>
