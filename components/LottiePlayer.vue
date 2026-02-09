<template>
  <div ref="container" class="lottie-player" :style="containerStyle" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { PropType } from "vue";
import type { AnimationItem } from "lottie-web";

type AnimationData = Record<string, unknown>;

const props = defineProps({
  animationData: {
    type: Object as PropType<AnimationData>,
    required: true,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
});

const container = ref<HTMLDivElement | null>(null);
let animationInstance: AnimationItem | null = null;

const normalizeSize = (value?: number | string) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  return typeof value === "number" ? `${value}px` : value;
};

const containerStyle = computed(() => ({
  width: normalizeSize(props.width),
  height: normalizeSize(props.height),
}));

const destroyAnimation = () => {
  if (animationInstance) {
    animationInstance.destroy();
    animationInstance = null;
  }
};

const loadAnimation = async () => {
  if (!import.meta.client || !container.value) {
    return;
  }

  const { default: lottie } = await import("lottie-web");

  destroyAnimation();
  animationInstance = lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
  });
};

onMounted(() => {
  void loadAnimation();
});

onBeforeUnmount(() => {
  destroyAnimation();
});

watch(
  () => [props.animationData, props.loop, props.autoplay],
  () => {
    void loadAnimation();
  }
);
</script>

<style scoped>
.lottie-player {
  display: inline-block;
}
</style>
