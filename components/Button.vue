<template>
  <button
    v-if="type === 'action'" class="c-button"
    :disabled="disabled"
    @click.prevent="action">
    <p>{{ text }}</p>
  </button>
  <button
    v-else-if="type === 'submit'" class="c-button"
    :disabled="disabled"
    type="submit">
    <p>{{ text }}</p>
  </button>
  <a
    v-else-if="type === 'external'" :href="href"
    class="c-button" target="_blank">
    <p>{{ text }}</p>
  </a>
  <nuxt-link
    v-else :to="to"
    class="c-button">
    <p>{{ text }}</p>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
    type: { type: String, default: '' },
    to: { type: String, default: '' },
    href: { type: String, default: '' }
  },
  methods: {
    action() {
      this.$emit('action');
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.c-button {
  background-color: $green;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid $green;
  height: 56px;
  border-radius: 5px;
  padding: 0 30px;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 600ms;
  &:disabled{
    background-color: rgb(159, 159, 159);
    border: 3px solid rgb(159, 159, 159);
  }
  p {
    color: #fff;
    font-family: $main-font;
    font-size: $text;
    font-weight: 600;
    font-style: normal;
    white-space: nowrap;
  }
  img {
    margin-right: 10px;
  }
  &:hover {
    background-color: transparent;

    transition-duration: 600ms;
    p {
      color: $green;
    }
  }
}

</style>
