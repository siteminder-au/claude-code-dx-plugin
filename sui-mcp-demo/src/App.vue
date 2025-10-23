<script setup>
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: #42b983;
  padding: 20px;
  display: flex;
  gap: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.navbar a.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
