<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      selectedTab: "start",
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    function selectTab(val) {
      this.selectedTab = val.id;
      const element = document.getElementById(val.id);
      const top = element.offsetTop;

      window.scrollTo(0, top);
    }

    function selectedTabClass(val) {
      if (this.selectedTab === val.id) {
        return "text-bold";
      } else {
        return "";
      }
    }

    return {
      leftDrawerOpen,
      selectedTabClass,
      selectTab,
    };
  },
});
</script>
