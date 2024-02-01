<template>
  <section id="rassen">
    <h2 class="rassen-title">Rassen</h2>
    <p class="rassen-sub">
      Ontdek de bijzondere kenmerken van <span>Berner Sennen</span> en <span>Golden Retrievers</span>, twee rassen bekend om hun loyaliteit en vriendelijke aard.
    </p>
    <div class="c-rassen-wrapper">
      <div class="c-rassen-image-container">
        <img src="~/assets/images/berner.png" alt="Meulemeershoeve rassen image" class="c-rassen-image">
      </div>
      <div class="c-rassen-content">
        <h2>Berner Sennen</h2>
      <template v-if="isBernerSennenParagraph">
        <p class="c-text" v-html="bernerSennen" />
      </template>
      </div>
    </div>
    <div class="c-rassen-wrapper">
      <div class="c-rassen-content">
        <h2>Golden Retriever</h2>
      <template v-if="isGoldenRetrieverParagraph">
        <p class="c-text" v-html="goldenRetriever" />
      </template>
      </div>
      <div class="c-rassen-image-container">
        <img src="~/assets/images/goldy.png" alt="Meulemeershoeve rassen image" class="c-rassen-image">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useTractor } from '../composables/useTractor';

const { replacerTractor, tagChecker } = useTractor();

const props = defineProps({
  bernerSennen: String,
  goldenRetriever: String
});

const bernerSennen = computed(() => {
  return replacerTractor(props.bernerSennen);
});

const goldenRetriever = computed(() => {
  return replacerTractor(props.goldenRetriever);
});

const isBernerSennenParagraph = computed(() => {
  return tagChecker(props.bernerSennen, '<p>', '</p>')
});

const isGoldenRetrieverParagraph = computed(() => {
  return tagChecker(props.goldenRetriever, '<p>', '</p>')
});
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.rassen-sub {
  max-width: 572px;
  font-size: $sub_text;
  font-family: $main-font;
  color: $gray;
  line-height: 34px;
  margin: 0;

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

.c-rassen-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 60px 0;

  .c-rassen-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .c-text {
      max-width: 572px;
      font-size: $text;
      font-family: $main-font;
      color: $gray;
      line-height: 24px;
      margin: 0;
    }
  }

  .c-rassen-image-container {
    position: relative;

    .c-rassen-image {
      width: 600px;
    }
  }
}

@media only screen and (max-width: 1250px) {
  .c-rassen-wrapper .c-rassen-content h1 {
    font-size: 52px;
    line-height: 60px;
    max-width: 310px;
  }

  .c-rassen-wrapper .c-rassen-content .c-text {
    max-width: 492px;
    font-size: 16px;
    line-height: 27px;
    margin: 24px 0;
  }
}

@media only screen and (max-width: 1050px) {
  .c-rassen-wrapper {
    flex-direction: row;
    margin: 50px 0;
    justify-content: space-between;

    .c-rassen-image-container .c-rassen-image {
      position: relative;
      width: 370px;
      margin-bottom: 30px;
      top: 0;
    }
  }
}

@media only screen and (max-width: 877px) {
  .c-rassen-wrapper {
    flex-direction: column-reverse;
    margin: 50px 0;

    .c-rassen-image-container .c-rassen-image {
      position: relative;
      width: 370px;
      margin-bottom: 30px;
      top: 0;
    }
  }
}

@media only screen and (max-width: 570px) {
  .c-rassen-wrapper {
    flex-direction: column-reverse;
    margin: 0;

    .c-rassen-image-container .c-rassen-image {
      width: 70%;
      height: auto;
      left: 50%;
      transform: translateX(-50%);
    }

    .c-rassen-content {
      margin-bottom: 30px;
    }

    .c-rassen-content h1 {
      font-size: 40px;
      line-height: 110%;
      margin-top: 24px;
    }

    .c-rassen-content .c-text {
      font-size: 16px;
      line-height: 27px;
      margin: 16px 0;
    }

    .c-rassen-image-container {
      position: relative;
      display: unset;
    }
  }
}</style>
