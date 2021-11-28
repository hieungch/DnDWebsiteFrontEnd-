<script setup>
</script>

<template>
  <header>
    <nav class="header-nav">
        <a class="header-title" href="/">MyWeb</a>
        <ul>
            <li class="header-link"> <a href="/authors">Home</a></li>
            <li class="header-link"> <a href="/authors/new">Clases</a></li>
            <li class="header-link"> <a href="/books">Backgrounds</a></li>
            <li class="header-link"> <a href="/books/new">Feats</a></li>
            <li class="header-link"> <a href="/login">Login</a></li>
        </ul>
    </nav>
</header>
</template>

<style lang="scss">
:root {
  --nav-title-font-size: 2rem;
  --nav-title-font-weight: bold;
  --nav-link-font-weight: 200;
}

.header-title {
  color: var(--color-text-light);
  text-decoration: none;
  font-size: var(--nav-title-font-size);
  font-weight: var(--nav-title-font-weight);
}

.header-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header-nav ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.header-nav li {
  list-style: none;
}

.header-nav li a {
  text-decoration: none;
  color: var(--color-text-light);
  font-weight: var(--nav-link-font-weight);
  padding: 1rem;
}

.header-nav li a:hover, .header-title:hover {
  color: white;
}





</style>