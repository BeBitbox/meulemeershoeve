<template>
  <section id="over-ons" class="c-overons-wrapper">
    <div class="e_layout">
      <h2>Over Ons & Onze Visie</h2>
      <div>
        <template v-if="isOverOnsParagraph">
          <p v-html="overOns" />
        </template>
        <template v-if="isVizieParagraph">
          <p v-html="vizie" />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTractor } from '../composables/useTractor';

const { replacerTractor, tagChecker } = useTractor();

const props = defineProps({
  overOns: String,
  vizie: String
});

const overOns = computed(() => {
  return replacerTractor(props.overOns);
});

const vizie = computed(() => {
  return replacerTractor(props.vizie);
});

const isOverOnsParagraph = computed(() => {
  return tagChecker(props.overOns, '<p>', '</p>')
});

const isVizieParagraph = computed(() => {
  return tagChecker(props.vizie, '<p>', '</p>')
});

</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.c-overons-wrapper {
  width: 100%;
  margin: 0 0 160px 0;
  background: url('../assets/images/pattern.png') repeat center center;
  color: #fff;
  padding: 60px 0;

  .e_layout {
    display: flex;
    justify-content: space-evenly;

    h2 {
      color: #fff;
      font-size: $sub_page_title;
      font-family: $main-font;
      font-weight: 600;
      line-height: 72px;
      max-width: 620px;
      width: 400px;
      margin: 30px 0;
      width: 400px;
    }

    p {
      font-size: $text;
      font-family: $main-font;
      color: #fff;
      max-width: 572px;
      line-height: 24px;
      margin: 30px 0;
      text-align: justify;

      span {
        font-weight: 600;
      }
    }
  }
}

@media only screen and (max-width: 877px) {
  .c-overons-wrapper {
    .e_layout {
      display: flex;
      flex-direction: column;

      h2 {
        width: 100%;
      }

      p {
        max-width: 100%;
      }
    }
  }
}

@media only screen and (max-width: 570px) {}
</style>
