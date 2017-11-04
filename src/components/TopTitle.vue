<template>
  <div id="topTitle">
    <span><img src="../assets/logo.png" alt=""></span>
    <h3>大数据可视化分析平台</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TopTitle",
  components: {},
  computed: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getabc"])
  },
  methods: {
    ...mapActions(["setAbc"])
  },
  mounted() {}
};
</script>

<style scoped>
#topTitle {
  position: fixed;
  top: 5px;
  width: 100%;
  height: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
}
img {
  height: 50px;
}
h3 {
  line-height: 50px;
  font-size: 30px;
}
</style>