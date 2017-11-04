<template>
  <div id="topNav">
    <div id="topIcons">
      <i @click="setDiaLogs(['a',true])" class="fa fa-user"></i>
      <i class="fa fa-sign-out"></i>
      <i class="fa fa-question-circle"></i>
    </div>
    <div id="ctIcons" >
      <i class="fa fa-line-chart"></i>
      <i class="fa fa-wrench"></i>
      <i class="el-icon-edit"></i>
      <i class="fa fa-bell-o"></i>
      <i class="fa fa-list-ul"></i>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TopNav",
  components: {},
  computed: {},
  data() {
    return {};
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
#topNav {
  background: rgba(49, 54, 110, 0.42);
  position: fixed;
  top: 57px;
  width: 100%;
  height: 40px;
}
#topIcons {
  position: absolute;
  top: -40px;
  right: 15px;
}
#ctIcons {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}
i {
  line-height: 40px;
  color: #ffffff;
  padding: 0 7px;
  font-size: 23px;
}
i:hover{
  cursor:pointer;
  color: #7f88e6;
}
</style>