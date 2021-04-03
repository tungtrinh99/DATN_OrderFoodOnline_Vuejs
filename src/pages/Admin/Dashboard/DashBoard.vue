<template>
  <a-calendar @panelChange="onPanelChange" />
</template>
<script>
export default {
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
  },
};
</script>
