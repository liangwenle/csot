<template>
  <div id="home" >
    <!-- 主体 -->
    <MainChart></MainChart>
    <TopTitle></TopTitle>

    <!-- top nav -->
    <TopNav></TopNav>
    <LeftTarget></LeftTarget>
    <!-- 浮动弹框 -->
    <MyDialog :visible.sync="diaLogs.a" :sytop='280' :syleft='10'>
      <h3 slot="header">温馨提示</h3>
        <br>
        <p>1 今日厂区内各个设备能耗正常</p>
        <br>
        <p>2 处理废料车队中，有故障车辆</p>
        <!-- <p slot="footer">这里有一些联系信息</p> -->
        <br>
    </MyDialog>

    <BDPower></BDPower>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
import TopNav from "@/components/TopNav";
import TopTitle from "@/components/TopTitle";
import MainChart from "@/components/MainChart";
import LeftTarget from "@/components/LeftTarget";
import MyDialog from "@/components/MyDialog";
import BDPower from "@/components/BdPower";

export default {
  name: "Home",
  components: { TopTitle, TopNav, MainChart, LeftTarget, MyDialog, BDPower },

  data() {
    return {
      dialogVisible: true
    };
  },
  computed: {
    ...mapGetters(["diaLogs"])
  },
  methods: {
    ...mapActions(["setDiaLogs"])
  },
  mounted() {}
};
</script>
<style scoped>

</style>
