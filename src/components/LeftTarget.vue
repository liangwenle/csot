<template>
  <div id="leftTarget">
    <h4>经济运行时钟</h4>
    <div id="nos">
       <countTo  ref='example':startVal='0' :endVal='endVal' :suffix='""'  :duration='1000'></countTo>
    </div>
    <div id="tips">
      <div class="tipTitle">经济指标</div>
      <div class="tipContent">
        <p>2017.07 固定资产投资：2,123,452万元</p>
        <p>2017.07 收入：2,453万元</p>
        <p>2017.07 规模以上总产值：6,323,423万元</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import countTo from "vue-count-to";
export default {
  name: "LeftTarget",
  components: { countTo },
  computed: {},
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      endVal: 234248845644560949,
      timer: null
    };
  },

  methods: {
    ...mapActions([])
  },
  mounted() {
    /* this.$nextTick(() => {
      this.timer = setInterval(()=>{
        this.endVal += 1839
        this.$refs.example.start();
      },8000) 
    }); */
  }
};
</script>

<style scoped>
#leftTarget {
  position: fixed;
  top: 5px;
  left: 10px;
  color: #fff;
}
h4 {
  color: #999;
}
#tips {
  background: rgba(40, 45, 94, 0.5);
  margin-top: 5px;
  border: 0.5px solid #eee;
  min-height: 150px;
  width: 180px;
}
#tips .tipTitle {
  padding-left: 10px;
  height: 39px;
  border-bottom: 0.5px solid #eee;
  line-height: 39px;
  font-weight: 500;
}
#tips .tipContent {
  padding: 10px;
  font-size: 12px;
}
.tipContent p {
  padding: 10px 0;
}
</style>