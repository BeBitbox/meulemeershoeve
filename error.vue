<template>
  <div class="error-container e_layout e_top">
    <h1>Oops something went wrong...</h1>
    <p>Status {{ error.statusCode }} </p>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    error: { type: Object, default: () => ({}) }
  }
};
</script>
<style lang="scss">
@import './assets/style/settings.scss';

.error-container {
  height: calc(100vh - 170px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 25px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 0px;
  }

  a {
    margin-top: 20px;
    height: 45px;
    color: #fff;
    text-decoration: none;
    transition: 0.5s;
    background: $lightergreen;
    border-radius: 5px;
    border: none;
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    padding: 0 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;

    &.nuxt-link-exact-active {
      p {
        color: #fff;
      }
    }

    p {
      padding: 10px 0;
      font-size: 18px;
      color: #fff;
    }

    &:disabled {
      cursor: pointer;
    }

    &:hover {
      --x: 100%;
    }

    .c-loading-lottie {
      position: absolute;
    }
  }
}</style>
