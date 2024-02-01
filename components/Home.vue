<template>
  <section class="c-hero-wrapper">
    <div class="c-hero-content">
      <template v-if="isTitle">
        <h1 v-html="title" />
      </template>
      <template v-if="isSubParagraph">
        <p class="c-sub-text">
          {{ subTitle }}
        </p>
      </template>
      <template v-if="isTextParagraph">
        <p class="c-text" v-html="text" />
      </template>
    </div>
    <div class="c-hero-image-container">
      <img src="~/assets/images/hero-image.png" alt="Meulemeershoeve hero image" class="c-hero-image">
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useTractor } from '../composables/useTractor';

const { replacerTractor, tagChecker } = useTractor();

const props = defineProps({
  title: String,
  subTitle: String,
  text: String
});

const title = computed(() => {
  return replacerTractor(props.title);
});

const subTitle = computed(() => {
  return replacerTractor(props.subTitle);
});

const text = computed(() => {
  return replacerTractor(props.text);
});

const isTitle = computed(() => {
  return tagChecker(props.title, '<h1>', '</h1>')
});

const isTextParagraph = computed(() => {
  return tagChecker(props.text, '<p>', '</p>')
});

const isSubParagraph = computed(() => {
  return tagChecker(props.subTitle, '<p>', '</p>')
});
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.c-hero-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 160px 0;

  .c-hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: $title;
      font-family: $main-font;
      font-weight: 600;
      line-height: 92px;
      max-width: 620px;
      margin: 0.47em 0;
      margin-bottom: 0;

      span {
        font-family: $detail-font;
        font-weight: 400;
        font-style: italic;
      }
    }

    .c-sub-text {
      max-width: 572px;
      font-size: $hero_sub_text;
      font-family: $main-font;
      line-height: 34px;
      margin: 10px 0 0 0;
      color: #000;
    }

    .c-text {
      max-width: 572px;
      font-size: $sub_text;
      font-family: $main-font;
      color: $gray;
      line-height: 34px;
      margin: 30px 0;

      a {
        color: #000;
      }

      span {
        font-weight: 400;
        color: #000;
      }

      i {
        font-family: $detail-font;
        font-weight: 400;
      }
    }
  }

  .c-hero-image-container {
    position: relative;

    .c-hero-image {
      width: 110%;
    }
  }
}

@media only screen and (max-width: 1250px) {
  .c-hero-wrapper .c-hero-content h1 {
    font-size: 52px;
    line-height: 60px;
    max-width: 427px;
  }

  .c-hero-wrapper .c-hero-content .c-text {
    max-width: 492px;
    font-size: 16px;
    line-height: 27px;
    margin: 24px 0;
  }
}

@media only screen and (max-width: 1050px) {
  .c-hero-wrapper {
    flex-direction: row;
    margin: 50px 0;
    justify-content: space-between;

    .c-hero-image-container .c-hero-image {
      position: relative;
      width: 370px;
      margin-bottom: 30px;
      top: 0;
    }
  }
}

@media only screen and (max-width: 877px) {
  .c-hero-wrapper {
    flex-direction: column-reverse;
    margin: 50px 0;

    .c-hero-image-container .c-hero-image {
      position: relative;
      width: 370px;
      margin-bottom: 30px;
      top: 0;
    }
  }
}

@media only screen and (max-width: 570px) {
  .c-hero-wrapper {
    flex-direction: column-reverse;
    margin: 0;

    .c-hero-image-container .c-hero-image {
      width: 70%;
      height: auto;
      left: 50%;
      transform: translateX(-50%);
    }

    .c-hero-content {
      margin-bottom: 30px;
    }

    .c-hero-content h1 {
      font-size: 40px;
      line-height: 110%;
      margin-top: 24px;
    }

    .c-hero-content .c-text {
      font-size: 16px;
      line-height: 27px;
      margin: 16px 0;
    }

    .c-hero-image-container {
      position: relative;
      display: unset;
    }
  }
}
</style>
