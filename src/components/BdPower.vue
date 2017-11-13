<template>
  <div id="bdpower">
    <MyDialog  :visible.sync="diaLogs.b" :sytop='60' :syleft='40' >
       <!-- <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col> -->
      <!-- </el-row> -->
        <div id="abc"></div>
    </MyDialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyDialog from "@/components/MyDialog";
import echarts from "echarts";

export default {
  name: "BdPower",
  components: { MyDialog },
  computed: {},
  data() {
    return { chart: null };
  },
  watch: {
    "diaLogs.b"(n) {
      if (n) {
        this.$nextTick(() => {
          this.dorwC1();
        });
      } else {
        let dom = document.getElementById('abc');
        let existInstance = echarts.getInstanceByDom(dom);
        if (existInstance) this.chart.dispose();
      }
    }
  },
  computed: {
    ...mapGetters(["diaLogs"])
  },
  methods: {
    ...mapActions(["setDiaLogs"]),
    init() {},
    dorwC1() {
      let dom = document.getElementById("abc");
      this.chart = echarts.init(dom);
      let names = ["电能", "水能", "天然气", "化能",'原料A','原料B'];
      function getData() {
        return names.map(item => {
          let a = {
            value: parseFloat((Math.random() * 10).toFixed(2)),
            name: item
          };
          return a;
        });
      }
      let option = {
        title: {
          text: "厂房 A 能耗分析",
          subtext: "F1 中占比 ",
          textStyle: {
            color: "#eee"
          }
        },
        grid: [
          {
            width: 300,
            height: 300,
            containLabel: true
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: function(a) {
            if (a.seriesName == "能耗总量") {
              return `${a.name} <br/> ${a.seriesName} : ${a.value} kw/h`;
            } else if (a.seriesName == "pie") {
              return `${a.name} : ${a.percent}%`;
            }
          }
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "#eee"
              }
            },
            data: ["F1", "F2", "F3", "F4", "F5", "F6"]
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "#eee"
              }
            }
          }
        ],
        series: [
          {
            name: "能耗总量",
            type: "bar",
            data: [5, 20, 36, 10, 15, 20],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#c23531" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#ae0051" // 100% 处的颜色
                    }
                  ]
                }
              }
            }
          },
          {
            name: "pie",
            type: "pie",
            radius: [0, 60],
            center: ["75%", "30%"],
            roseType: "radius",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: getData()
          }
        ]
      };

      this.chart.setOption(option);
      this.chart.on("click", p => {
        if (p.seriesType == "bar")
          this.chart.setOption({
            title: {
              subtext: `${p.name} 中占比 `
            },
            series: [
              {
                name: "pie",
                data: getData()
              }
            ]
          });
      });
    },
    dorwC2() {}
  },
  mounted() {
    // this.setDiaLogs(["b", true]);
  }
};
</script>

<style scoped>
#abc,
#abc2 {
  /* float: left; */
  width: 1000px;
  height: 500px;
}
</style>