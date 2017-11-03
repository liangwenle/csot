<template>
  <div id="home" >
    <!-- 主体 -->
    <MainChart></MainChart>
    <TopTitle></TopTitle>

    <!-- top nav -->
    <TopNav></TopNav>
    <LeftTarget></LeftTarget>
    <!-- 浮动弹框 -->
    <MyDialog :visible.sync="dialogVisible">
      <h1 slot="header">这里可能是一个页面标题</h1>
        <p>主要内容的一个段落。</p>
        <p>另一个主要段落。</p>
        <p slot="footer">这里有一些联系信息</p>
    </MyDialog>
  </div>
</template>

<script>
import echarts from "echarts";
import TopNav from "@/components/TopNav";
import TopTitle from "@/components/TopTitle";
import MainChart from "@/components/MainChart";
import LeftTarget from "@/components/LeftTarget";
import MyDialog from "@/components/MyDialog";

export default {
  name: "Home",
  components: { TopTitle, TopNav, MainChart, LeftTarget, MyDialog },

  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    
  },
  mounted() {}
};
</script>
<style scoped>

</style>
