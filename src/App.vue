<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style>
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import "../node_modules/flex.css/dist/flex.css";

* {
  margin: 0;
  padding: 0;
}
body {
  background: #181b3a;
}
html,
body,
#app,
#home {
  width: 100%;
  height: 100%;
}

/* @font-face {
    font-family: 'iconfont';  
    src: url('//at.alicdn.com/t/font_461997_w6zcic1lazrjatt9.eot');
    src: url('//at.alicdn.com/t/font_461997_w6zcic1lazrjatt9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_461997_w6zcic1lazrjatt9.woff') format('woff'),
    url('//at.alicdn.com/t/font_461997_w6zcic1lazrjatt9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_461997_w6zcic1lazrjatt9.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;} 
    */
</style>
