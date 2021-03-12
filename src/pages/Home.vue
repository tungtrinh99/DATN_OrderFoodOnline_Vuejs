<template>
  <a-layout>
    <a-layout-content style="padding: 0 50px">
      <a-row>
          <a-col :span="6">
        <card></card>

          </a-col>
            <a-col :span="6">
        <card></card>

          </a-col>
            <a-col :span="6">
        <card></card>

          </a-col>
            <a-col :span="6">
        <card></card>

          </a-col>
       
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script>
import Card from "../components/Card/Card.vue";
export default {
  components: {
    Card
  }
};
</script>
