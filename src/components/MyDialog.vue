<template>
  <div v-show="copyVisible" class="myDialog"  draggable="true" @dragstart="dragstart" @dragend="drag"
  :style="`top:${top}px;left:${left}px;`"
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
  props: ["visible",'sytop','syleft'],
  data() {
    return {
      top: this.sytop||300,
      left: this.syleft||200,
      copyVisible: this.visible,
      sx: null,
      sy: null
    };
  },
  watch: {
   
    visible(n, o) {
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
      this.top = e.clientY - this.sy + this.top
      this.left = e.clientX - this.sx + this.left
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
.close {
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
.close:hover {
  cursor: pointer;
}
</style>