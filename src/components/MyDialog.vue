<template>
  <div v-show="copyVisible" class="myDialog"  draggable="true" @dragstart="dragstart" @dragend="drag"
  style="top:300px;left:200px;"
  >
  <div class="close" @click="close">
    <i class="el-icon-close"></i>
  </div>
   <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  components: {},
  computed: {},
  props: ["visible"],
  data() {
    return {
      copyVisible: this.visible,
      sx: null,
      sy: null
    };
  },
  watch:{
    visible(n,o){
      this.copyVisible = n;
    }
  },
  methods: {
    dragstart(e) {
      // this.$emit("update:visible", false);
      
      this.sx = e.clientX;
      this.sy = e.clientY;
    },
    drag(e) {
      let el = e.currentTarget;
      let topNo = parseInt(getComputedStyle(el).top.replace(/px/,''))
      let leftNo = parseInt(getComputedStyle(el).left.replace(/px/,''))

      el.style.top = `${e.clientY-this.sy+topNo}px`;
      el.style.left = `${e.clientX-this.sx+leftNo}px`;
      // this.$emit("update:visible", true);
      
    },
    close() {
      this.$emit("update:visible", false);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.myDialog {
  background: #20234c;
  position: fixed;
  border: 0.5px solid #eee;
  color: #eee;
  padding: 10px;
}
.close{
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  border: 0.5px solid #eee;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #20234c;
  color: #999;
}
.close:hover{
  cursor: pointer;
}
</style>