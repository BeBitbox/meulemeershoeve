<template>
  <section id="fotos">
    <h2 class="gallery-title">Momentopnames</h2>
    <p class="gallery-sub">Ontdek in onze galerij de vreugdevolle momenten van Meulemeershoeve, vastgelegd in beeld met
      onze <span>Berner Sennenhonden</span> en <span>Golden Retrievers</span>.</p>
    <div class="gallery">
      <img v-for="image in images" :src="(image as string)" @click="setSelectedImage(image)"
        alt="Meulemeershoeve gallerij image" />
      <div v-if="maxImages && props.images.length > maxImages" class="show-more --desktop">
        <h2>Meer foto's</h2>
        <Button text="Toon alles" to="/fotos" />
      </div>
    </div>
    <div v-if="maxImages && props.images.length > maxImages" class="show-more --mobile">
      <h2>Meer foto's</h2>
      <Button text="Toon alles" to="/fotos" />
    </div>
  </section>
  <Carrousel v-if="selectedImage" :selectedImage="selectedImage" @closeModal="setSelectedImage(null)"
    @setPreviousImage="setPreviousImage" @setNextImage="setNextImage" />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  images: Array,
  maxImages: {
    type: Number,
    default: null
  }
});

const images = ref(props.maxImages ? props.images.slice(0, props.maxImages ?? props.images.length) : props.images);

const selectedImage = ref(null);

const setSelectedImage = (image) => {
  selectedImage.value = image;
  if (image) {
    document.body.classList.add("modal-open");
    return;
  }
  document.body.classList.remove("modal-open");
};
const setPreviousImage = () => {
  const index = props.images.findIndex(image => image === selectedImage.value)
  selectedImage.value = props.images[index - 1] ?? props.images[props.images.length - 1]
};
const setNextImage = () => {
  const index = props.images.findIndex(image => image === selectedImage.value)
  selectedImage.value = props.images[index + 1] ?? props.images[0]
};
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.gallery-title {
  margin-top: 160px;
}

.gallery-sub {
  max-width: 572px;
  font-size: $sub_text;
  font-family: $main-font;
  color: $gray;
  line-height: 34px;
  margin: 0;
  margin-bottom: 60px;

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

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-bottom: 160px;

  .show-more {
    background: url('../assets/images/nerves.jpg') no-repeat center center;
    background-size: cover;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      padding: 0 40px;
      margin: 0;
      padding-top: 0;
      color: #fff;
      margin-bottom: 20px;
    }

    .c-button {
      margin: 0 0 0 40px;
      background-color: #fff;
      border-color: #fff;

      p {
        color: #000;
      }
    }
  }

  img {
    cursor: pointer;
    transition-duration: 400ms;

    &:hover {
      transition-duration: 400ms;
      transform: scale(1.01);
    }
  }

  img,
  .show-more {
    object-fit: cover;
    width: 100%;
    height: 412.67px;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 1250px) {
  .gallery {
    grid-column-gap: 2vw;
    grid-row-gap: 2vw;

    img,
    .show-more {
      height: calc(33vw - 4vw);
    }
  }
}

@media only screen and (max-width: 1200px) {
  .show-more {
    h2 {
      font-size: 4vw;
    }
  }
}

@media only screen and (min-width: 977px) {
  .show-more {
    &.--desktop {
      display: flex;
    }

    &.--mobile {
      display: none;
    }
  }
}

@media only screen and (max-width: 977px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);

    margin-bottom: 0 !important;

    img,
    .show-more {
      height: calc(50vw - 4vw) !important;
    }

    .show-more {
      width: 100% !important;
    }
  }

  .show-more {
    justify-content: center;
    align-items: center;

    &.--desktop {
      display: none;
    }

    &.--mobile {
      background: url('../assets/images/nerves.jpg') no-repeat center center;
      background-size: cover;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 160px;
      height: calc(50vw - 4vw) !important;
      border-radius: 10px;
      display: flex;
      margin-top: 2vw;

      h2 {
        padding: 0 40px;
        margin: 0;
        padding-top: 0;
        color: #fff;
        margin-bottom: 20px;
      }

      .c-button {
        margin: 0 0 0 40px;
        background-color: #fff;
        border-color: #fff;

        p {
          color: #000;
        }
      }
    }

    h2 {
      font-size: 3.5vw;
      line-height: 3.5vw;
      margin-bottom: 20px !important;
      padding: 0 !important;
    }

    .c-button {
      margin: 0 !important;
    }
  }
}
</style>
