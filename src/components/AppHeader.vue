<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "@/stores/modal";
const modalStore = useModalStore();
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const closeMenu = () => {
  menuOpen.value = false;
};
</script>
<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="75"
      height="75"
    />

    <div class="wrapper">
      <nav class="nav">
        <button class="hamburger" @click="toggleMenu">☰</button>
        <div :class="['nav-links', { open: menuOpen }]">
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/surprise" @click="closeMenu">Surprise</RouterLink>
          <RouterLink to="/about" @click="closeMenu">About</RouterLink>
        </div>
      </nav>
      <button
        type="button"
        class="button primary-button"
        @click="modalStore.open"
      >
        Contact Us
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0;
  background-color: white;
}

.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header .wrapper {
  display: flex;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  position: relative;
}

.hamburger {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.wrapper {
  gap: 20px;
}

@media (max-width: 675px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    background-color: white;
    min-width: 150px;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
