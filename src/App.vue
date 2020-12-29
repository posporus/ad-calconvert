<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>
        AD-Cal: Soll-Einsatzplan Converter
      </b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@500;600&display=swap');
#app {
  font-family: 'Karla', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  
}
</style>
