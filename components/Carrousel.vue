<template>
  <div v-if="props.selectedImage" class="image-modal">
    <div class="image-wrapper">
      <button class="close-btn" @click="closeModal(null)">
        <img src="~/assets/images/icons/cross.png" alt="Close icon" />
      </button>
      <button class="arrow-left-btn" @click="setPreviousImage(props.selectedImage)">
        <img src="~/assets/images/icons/arrowLeft.png" alt="arrow left icon" />
      </button>
      <button class="arrow-right-btn" @click="setNextImage(props.selectedImage)">
        <img src="~/assets/images/icons/arrowRight.png" alt="arrow right icon" />
      </button>
      <img :src="props.selectedImage" alt="Meulemeershoeve selected image" class="selected-image" />
    </div>
    <div v-if="props.modSidePanel" class="side-panel">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const emit = defineEmits(['closeModal', 'setPreviousImage', 'setNextImage'])

const props = defineProps({
  modSidePanel: Boolean,
  selectedImage: String
});

const closeModal = () => {
  emit('closeModal')
};

const setPreviousImage = () => {
  emit('setPreviousImage')
};

const setNextImage = () => {
  emit('setNextImage')
};
</script>

<style lang="scss">
@import '../assets/style/settings.scss';

.image-modal {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background-color: $background-gray;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;

  .side-panel {
    position: relative;
    width: 600px;
    height: 100vh;
    background-color: $background-gray;
    border-left: .1px solid $line-gray;
    overflow-y: scroll;
  }

  .image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    .selected-image {
      object-fit: cover;
      max-height: 100%;
      max-width: 100%;
    }

    button {
      position: absolute;
      color: #000;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: $line-gray;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
      }
    }

    .close-btn {
      top: 40px;
      right: 40px;

      img {
        width: 15px;
      }
    }

    .arrow-left-btn {
      top: 50%;
      left: 40px;
    }

    .arrow-right-btn {
      top: 50%;
      right: 40px;
    }
  }
}
</style>
