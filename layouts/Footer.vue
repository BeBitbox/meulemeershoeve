<template>
  <div>
    <footer class="e_layout --desktop">
      <section class="left-content-footer">
        <nuxt-link to="/#rassen" target="_blank">Rassen</nuxt-link>
        <nuxt-link to="/#verwachte-nesten">Verwachte nesten</nuxt-link>
      </section>
      <section class="middle-content-footer">
        <a href="https://maps.app.goo.gl/d9AQkTRCxheWRjKE6" target="_blank">Barelstraat 12, 9880 Aalter</a>
        <img src="~/assets/images/footer-logo.png">
        <p>©{{ currentYear }} Meuleershoeve</p>
      </section>
      <section class="right-content-footer">
        <nuxt-link to="/#over-ons" target="_blank">Over ons</nuxt-link>
        <nuxt-link to="/fotos">Momentopnames</nuxt-link>
      </section>
    </footer>
    <footer class="e_layout --mobile">
      <section class="left-content-footer">
        <nuxt-link to="/#over-ons" target="_blank">Over ons</nuxt-link>
        <nuxt-link to="/#verwachte-nesten">Verwachte nesten</nuxt-link>
        <nuxt-link to="/#rassen" target="_blank">Rassen</nuxt-link>
        <nuxt-link to="/fotos">Momentopnames</nuxt-link>
      </section>
      <section class="right-content-footer">
        <img src="~/assets/images/footer-logo.png">
        <a href="https://maps.app.goo.gl/d9AQkTRCxheWRjKE6" target="_blank">Barelstraat 12, 9880 Aalter</a>
        <p>©{{ currentYear }} Meuleershoeve</p>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

@media only screen and (min-width: 650px) {
  footer {
    &.--desktop {
      display: flex;
      justify-content: space-between;
      height: 170px;
      a {
        text-decoration: none;
        color: #000;
      }
      .left-content-footer {
        display: flex;
        align-items: center;
        font-size: $text;
        font-style: normal;
        font-weight: 500;
        font-family: $main-font;
        a:first-child {
          margin-right: 6vw;
        }
      }

      .middle-content-footer {
        display: flex;
        align-items: center;
        font-size: $small_text;
        color: $gray;
        font-family: $main-font;
        a {
          color: $gray;
        }
        img {
          margin: 0 30px;
          width: 40px;
        }
      }

      .right-content-footer {
        display: flex;
        align-items: center;
        font-size: $text;
        font-style: normal;
        font-weight: 500;
        font-family: $main-font;
        a:last-child {
          margin-left: 6vw;
        }
      }
    }
    &.--mobile {
      display: none;
    }
  }
}
@media only screen and (max-width: 920px) {
  footer {
    &.--desktop {
      display: none;
    }
    &.--mobile {
      display: flex;
      justify-content: center;
      height: 170px;
      margin: 48px 0;
      a {
        text-decoration: none;
        color: #000;
        margin-bottom: 20px;
        font-size: 12px;
      }
      .left-content-footer {
        display: flex;
        flex-direction: column;
        margin-right: 69px;
        // align-items: center;
        justify-content: center;
        font-size: $text;
        font-style: normal;
        font-weight: 500;
        font-family: $main-font;
      }

      .right-content-footer {
        display: flex;
        flex-direction: column;
        // align-items: center;
        font-size: 12px;
        color: $gray;
        font-family: $main-font;
        a {
          color: $gray;
          margin-bottom: 20px;
        }
        img {
          width: 42px;
          margin-bottom: 38px;
        }
      }
    }
  }
}

</style>
