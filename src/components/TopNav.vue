<template>
  <div id="topNav">
    <div id="topIcons">

      <div v-for="(meun,index) in topMeuns" :key="index">
        <i @click="setDiaLogs(['a',true])" :class="meun.icon"></i>
      </div>
    </div>
    <div id="ctIcons" >
      <div v-for="(meun,index) in ctmeuns" :key="index"
      @click="ckCT(index)"
       class="ctIcons">
        <el-badge :is-dot="meun.isdot" >
          <i :class="meun.icon"></i>
        </el-badge>
      </div>
    </div>
    
    <div id="meuns" v-show="meunShow">
      <div v-for="(meunL1,index) in meuns" :key="index" class="meunL1">
        <div class="meunL1Title" @click= "ckmeunL1(meunL1,index)">
           <i :class="meunL1.icon"></i>
        </div>
        <div v-show="meunL1.level.length>0&&meunL1.show" class="meunL2">
          <div v-for="(meunL2 ,j) in meunL1.level" 
          :key="j" 
          @click="ckmeunL2(meunL2,j,meunL1,index)"
          class="l2Item">
            {{meunL2.title}}
          </div>
        </div>
      </div>
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
    return {
      meunShow: false,
      topMeuns: [
        {
          icon: "fa fa-user"
        },
        {
          icon: "fa fa-sign-out"
        },
        {
          icon: "fa fa-question-circle"
        }
      ],
      ctmeuns: [
        {
          icon: "fa fa-line-chart"
        },
        {
          icon: "fa fa-wrench"
        },
        {
          icon: "el-icon-edit"
        },
        {
          icon: "fa fa-bell-o",
          isdot: true
        },
        {
          icon: "fa fa-list-ul"
        }
      ],
      meuns: [
        {
          icon: "fa fa-home",
          show: false,
          level: []
        },
        {
          icon: "fa fa-map-signs",
          show: false,
          level: [
            {
              title: "厂区A"
            },
            {
              title: "厂区B"
            }
          ]
        },
        {
          icon: "fa fa-eye",
          show: false,

          level: [
            {
              title: "热力情况"
            },
            {
              title: "统计分析"
            }
          ]
        },
        {
          icon: "fa fa-cog",
          show: false,

          level: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["diaLogs"])
  },
  methods: {
    ...mapActions(["setDiaLogs"]),
    ckCT(i) {
      if(i==3){
        this.setDiaLogs(['a',true])
      }else if (i == 4) {
        this.meunShow = !this.meunShow;
      }
    },
    ckmeunL1(l1, i) {
      this.meuns.map((itemm,index)=>{
        if(i==index){
          l1.show = !l1.show;
        }else{
          itemm.show = false;
        }
      })
    },
    ckmeunL2(l2, j, l1, i) {
      l1.show = false;
    }
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
  color: #eee;
}
#topIcons {
  position: absolute;
  top: -40px;
  right: 15px;
  height: 100%;
}
#topIcons div {
  display: inline-block;
  width: 40px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 23px;
}
#ctIcons {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  height: 100%;
}
.ctIcons {
  width: 40px;
  height: 100%;
  text-align: center;
  font-size: 22px;
}

#topIcons div:hover,
.ctIcons:hover {
  cursor: pointer;
  color: #7f88e6;
  background: rgba(24, 27, 58, 0.71);
}

#meuns {
  position: absolute;
  right: 15px;
}
.meunL1 {
  margin-top: 10px;
  position: relative;
}
.meunL1Title {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: #20234c;
  border: 1px solid #fff;
  line-height: 40px;
  text-align: center;
}
.meunL2 {
  position: absolute;
  top: 0px;
  right: 50px;
  border: 0.5px solid #fff;
}
.l2Item {
  padding: 5px 10px;
  min-width: 100px;
  background: #181b3a;
}
.l2Item:hover {
  background: #20234c;
}
.meunL2::before {
  content: "";
  position: absolute;
  right: -10px;
  top: 15px;
  border-color: transparent;
  border-style: solid;
  border-left-color: #fff;
  border-width: 5px;
}
</style>