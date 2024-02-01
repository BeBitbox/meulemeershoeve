<template>
  <nav class="navbar" :class="computedShowNavbar">
    <article class="e_layout c-desktop-nav">
      <nuxt-link to="/" class="logo">
        <img src="~/assets/logo.png" alt="Meuleershoeve Logo">
      </nuxt-link>
      <div class="main-menu --desktop">
        <nuxt-link v-for="{ label, key } in header" :to="`/${key === 'home' ? '' : key === 'fotos' ? key : '#' + key}`"
          :class="{ '--active': activeSection === key }" @click="activeSection = key">
          {{ label }}
          <div class="active-line" />
        </nuxt-link>
      </div>
    </article>
    <article class="mobile-menu" :style="{ right: activeWidth + '%' }">
      <nuxt-link v-for="{ label, key } in header" :to="`/${key === 'home' ? '' : key === 'fotos' ? key : '#' + key}`"
        :class="{ '--active': activeSection === key }" @click="activeSection = key">
        <p @click="() => close()">
          {{ label }}
        </p>
        <div class="active-line" />
      </nuxt-link>
    </article>
    <div id="hamburger" :class="{ active: isActive }" @click="toggleMenu()">
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      activeWidth: -100,
      isActive: false,
      activeSection: '',
      header: {
        home: {
          label: 'Home',
          key: 'home'
        },
        overOns: {
          label: 'Over ons',
          key: 'over-ons'
        },
        rassen: {
          label: 'Rassen',
          key: 'rassen'
        },
        fotos: {
          label: 'Foto\'s',
          key: 'fotos'
        },
        verwachteNesten: {
          label: 'Verwachte nesten',
          key: 'verwachte-nesten'
        },
        contacteerOns: {
          label: 'Contacteer ons',
          key: 'contacteer-ons'
        }
      }
    };
  },
  computed: {
    computedShowNavbar() {
      return { 'navbar--hidden': !this.showNavbar };
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll);
    if (this.$route.name === 'fotos') {
      this.activeSection = 'fotos';
    } else if (this.$route.name === 'index') {
      this.activeSection = 'home';
    } {
      this.updateActiveMenuItem();
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },

  watch: {
    $route() {
      if (this.$route.name === 'fotos') {
        this.activeSection = 'fotos';
      } else {
        this.updateActiveMenuItem();
      }
    }
  },

  methods: {
    close() {
      this.isActive = false;
      this.activeWidth = -100;
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
      if (this.$route.name !== 'fotos') {
        this.updateActiveMenuItem();
      }
    },
    toggleMenu() {
      if (this.activeWidth === -100) {
        this.isActive = true;
        this.activeWidth = 0;
      } else {
        this.isActive = false;
        this.activeWidth = -100;
      }
    },
    updateActiveMenuItem() {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.pageYOffset;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          this.activeSection = section.id;
        }
      });
    },
  }
};
</script>

<style scoped lang="scss">
@import '../assets/style/settings.scss';

.navbar {
  height: 97px;
  width: 100vw;
  position: fixed;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
  background: #fff;
  z-index: 999;

  img {
    margin-top: 16px;
    transition-duration: 600ms;
  }
}

.mobile-menu {
  height: 100vh;
  background: #fff;
  position: fixed;
  transition-duration: 600ms;
  width: 100%;
  flex-direction: column;

  p {
    text-align: left;
  }
}

#hamburger {
  width: 36px;
  height: 18px;
  position: fixed;
  display: block;
  cursor: pointer;
  margin: 0 auto;
  right: 17px;
  top: 41px;

  .line {
    width: 36px;
    height: 2px;
    display: block;
    background-color: #000;
    position: absolute;
    left: 0;
    transition: all .3s cubic-bezier(0.580, 0.000, 0.580, 1.000);

    &:nth-child(1) {
      top: 0;
      margin: 0;
    }

    &:nth-child(2) {
      top: 50%;
      margin-top: -1px;
    }

    &:nth-child(3) {
      top: 100%;
      margin-top: -2px;
    }
  }

  &:hover,
  &:focus {
    .line {
      &:nth-child(1) {
        transform: translateY(-1px);
      }

      &:nth-child(3) {
        transform: translateY(1px);
      }
    }
  }

  &.active {
    .line {
      &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
}

.c-desktop-nav {
  border-bottom: 1px solid $light_line-gray;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin: 0;
      height: 40px;
    }
  }
}

.navbar.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}

.main-menu {
  float: right;
  padding-right: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  a {
    text-decoration: none;
    color: #000;
    margin-left: 35px;
    font-family: $main-font;
    font-size: $text;
    font-style: normal;
    font-weight: 500;
    height: calc(50% + 9px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .active-line {
      width: 100%;
      height: 2px;
      background-color: transparent;
      position: relative;
      bottom: -1px;
    }
  }

  .--active {
    color: #000;

    .active-line {
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,
          $green 0%,
          $lightgreen 100%);
      position: relative;
      bottom: -1px;
    }
  }
}

.mobile-menu {
  .--active  {
    color: $lightergreen;
    font-weight: 500;
  }
}

.main-menu:last-child .--active  {
  background: transparent;
}

.main-wrapper {
  width: 100%;
  max-width: 1440px;
}

.mobile-menu {
  padding-top: 40px;

  a {
    text-decoration: none;
    color: #000;
    margin-left: 17px;
    font-family: $main-font;
    font-size: 28px;
    margin-bottom: 22px;
    display: block;
  }
}

.navbar img:hover {
  transition-duration: 600ms;
  transform: scale(1.05);
}

@media only screen and (min-width: 1029px) {
  .mobile-menu {
    display: none;
  }

  #hamburger {
    display: none;
  }

  .--desktop {
    display: flex;
  }
}

@media only screen and (max-width: 1029px) {
  .mobile-menu {
    display: flex;
  }

  #hamburger {
    display: block;
  }

  .--desktop {
    display: none;
  }
}

@media only screen and (max-width: 570px) {

  #hamburger {
    display: block;
    top: 17px;
  }
}

@media only screen and (max-width: 530px) {
  .main-menu {
    padding-right: 0;

    a {
      margin-left: 10vw;
    }
  }
}

@media only screen and (max-width: 440px) {
  .main-menu {
    a {
      margin-left: 20px;
    }
  }

  .c-desktop-nav .logo {
    justify-content: flex-start;

    img {
      height: 30px;
    }
  }
}

@media only screen and (max-width: 570px) {
  .navbar {
    height: 56px;
  }

  .c-desktop-nav {
    border-bottom: none;
  }

  .main-menu .--active .active-line {
    bottom: 0;
  }
}

@media only screen and (max-width: 357px) {
  .c-desktop-nav .logo {
    display: flex;
    justify-content: center;
    width: 78px;
    min-width: 78px;
  }
}
</style>
