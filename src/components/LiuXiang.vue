<template>
  <div id="bdpower">
    <MyDialog  :visible.sync="diaLogs.c" :sytop='60' :syleft='40' >
        <div id="liuxiang"></div>
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
    "diaLogs.c"(n) {
      if (n) {
        this.$nextTick(() => {
          this.dorwC1();
        });
      } else {
        let dom = document.getElementById("liuxiang");
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
    dorwC1() {
      let dom = document.getElementById("liuxiang");
      this.chart = echarts.init(dom);

      var data = [
        {
          name: "天然气",
          value: [10, 30]
        },
        {
          name: "锅炉",
          value: [10, 50]
        },
        {
          name: "市政",
          value: [10, 70]
        },
        {
          name: "电",
          value: [10, 120]
        },
        {
          name: "水",
          value: [10, 140]
        },

        {
          name: "照明",
          value: [30, 0]
        },
        {
          name: "食堂",
          value: [30, 20]
        },
        {
          name: "采暖",
          value: [30, 50]
        },
        {
          name: "热源(热水)",
          value: [30, 80]
        },
        {
          name: "冷水机组",
          value: [30, 120]
        },
        {
          name: "冷却塔",
          value: [30, 140]
        },
        {
          name: "空压机组",
          value: [30, 160]
        },
        {
          name: "真空泵",
          value: [30, 180]
        },

        {
          name: "空调设备",
          value: [50, 20]
        },
        {
          name: "新风机组",
          value: [50, 40]
        },
        {
          name: "排风(废气处理)系统",
          value: [50, 60]
        },
        {
          name: "一般机组给水系统",
          value: [50, 80]
        },
        {
          name: "回水处理系统",
          value: [50, 100]
        },
        {
          name: "纯水系统",
          value: [50, 120]
        },
        {
          name: "PCW系统",
          value: [50, 140]
        },
        {
          name: "废水处理系统",
          value: [50, 160]
        },

        {
          name: "洁净室",
          value: [70, 0]
        },
        {
          name: "生活，绿化",
          value: [70, 80]
        },
        {
          name: "工艺设备",
          value: [70, 160]
        }
      ];

      let a = [
        [10, 140, 10, 145],
        [10, 145, 40, 145],
        [40, 145, 40, 120],
        [40, 120, 50, 120],
        [40, 140, 50, 140],

        [10, 140, 30, 140]
      ];
      let b = [
        [10, 120, 5, 120],
        [5, 120, 5, 190],
        [5, 180, 30, 180],

        [5, 120, 5, 0],
        [5, 0, 30, 0],

        [5, 190, 70, 190],
        [70, 190, 70, 160],

        [10, 120, 30, 120],
        [20, 120, 20, 160],
        [20, 160, 30, 160],

        [20, 143, 30, 143],

        [20, 120, 20, 100],
        [20, 100, 50, 100],

        [35, 100, 35, 20],
        [35, 100, 35, 160],

        [35, 20, 50, 20],
        [35, 40, 50, 40],
        [35, 60, 50, 60],
        [35, 80, 50, 80],
        [35, 123, 50, 123],
        [35, 142, 50, 142],
        [35, 160, 50, 160]
      ];

      let trq = [
        [10, 30, 10, 50],
        [10, 30, 30, 30],
        [30, 30, 30, 20],
        [20, 30, 20, 63],
        [20, 63, 50, 63]
      ];

      let zm = [[30, 0, 70, 0]];

      let rs = [
        [30, 80, 30, 50],
        [30, 82, 38, 82],

        [38, 90, 38, 118],
        [38, 90, 38, 18],

        [38, 18, 50, 18],
        [38, 38, 50, 38],
        [38, 118, 50, 118],

        [10, 70, 10, 80],
        [10, 80, 30, 80],

        [10, 50, 15, 50],
        [15, 50, 15, 80],

        [30, 158, 15, 158],
        [15, 158, 15, 80]
      ];

      let lsz = [
        [30, 120, 30, 80],
        [30, 110, 43, 110],

        [43, 110, 43, 138],
        [43, 110, 43, 22],

        [43, 22, 50, 22],
        [43, 42, 50, 42],
        [43, 58, 50, 58],
        [43, 116, 50, 116],
        [43, 138, 50, 138],
        [30, 140, 30, 120]
      ];
      let kqys = [
        [30, 160, 30, 170],
        [30, 170, 65, 170],
        [65, 170, 65, 140],

        [65, 160, 50, 160],
        [65, 160, 70, 160],
        [65, 140, 50, 140]
      ];

      let zk = [[30, 180, 68, 180], [68, 180, 68, 162], [68, 162, 70, 162]];

      let pcw = [[50, 158, 70, 158]];

      let cs = [[50, 120, 70, 120], [70, 120, 70, 160], [50, 100, 50, 120]];

      let ybjz = [[50, 80, 70, 80], [60, 80, 60, 20], [60, 20, 50, 20]];

      let gy = [
        [69, 160, 69, 100],
        [69, 100, 65, 100],
        [65, 100, 65, 2],
        [65, 40, 50, 40],
        [65, 60, 50, 60],
        [65, 2, 70, 2]
      ];

      let jjs = [[70, 0, 70, 38], [70, 38, 50, 38], [70, 18, 50, 18]];
      let arrs = [
        {
          data: a,
          color: "#599"
        },
        {
          data: b,
          color: "#00f"
        },
        {
          data: trq,
          color: "#3ef32b"
        },
        {
          data: zm,
          color: "#f3e517"
        },
        {
          data: rs,
          color: "#f35e2d"
        },
        {
          data: lsz,
          color: "#65e4ec"
        },
        {
          data: kqys,
          color: "#d561ea"
        },
        {
          data: zk,
          color: "#000"
        },
        {
          data: pcw,
          color: "#000"
        },
        {
          data: cs,
          color: "#65e4ec"
        },
        {
          data: ybjz,
          color: "#066d19"
        },
        {
          data: gy,
          color: "#000"
        },
        {
          data: jjs,
          color: "#00f1bd"
        }
      ];

      let lines2 = [];
      arrs.map(one => {
        one.data.map(item => {
          let tmp = [
            {
              coord: [item[0], item[1]]
            },
            {
              coord: [item[2], item[3]],
              lineStyle: {
                normal: {
                  color: one.color
                }
              }
            }
          ];
          lines2.push(tmp);
        });
      });

      let option = {
        title: {
          text: ""
        },
        tooltip: {},
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            type: "graph",
            layout: "none",
            symbol: "roundRect",
            coordinateSystem: "cartesian2d",
            symbolSize: 20,
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: "bottom"
              }
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            data: data,
            itemStyle: {
              normal: {
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                // shadowBlur: 10,
                // shadowOffsetX: -1,
                // shadowOffsetY: 1,
                color: "#5fa4ff",
                label: {
                  position: ["20%", "100%"]
                }
              }
            }
          },
          {
            name: "A",
            type: "lines",
            coordinateSystem: "cartesian2d",

            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              symbol: "arrow",
              color: "rgba(55,155,255,0.5)",
              symbolSize: 6
            },
            lineStyle: {
              normal: {
                color: "#a0a0a0",
                width: 2,
                opacity: 0.4
              }
            },
            data: lines2
          }
        ]
      };

      this.chart.setOption(option);
      this.chart.on("click", p => {});
    }
  },
  mounted() {}
};
</script>

<style scoped>
#liuxiang {
  /* float: left; */
  width: 1000px;
  height: 500px;
}
</style>