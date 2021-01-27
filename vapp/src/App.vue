<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <Wallet />
    </div>

    <div class="section">
      <Toast />
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import Wallet from "./Wallet";
import Toast from "./Toast";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Wallet,
    Toast,
  },

  computed: mapGetters("drizzle", ["isDrizzleInitialized"]),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
