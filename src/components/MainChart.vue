<template>
 <div style="width: 100%;height: 100%;">
    <div v-show="show==0" id="mainChart"></div>
    <div v-show="show==1" id="chart"></div>
    <div v-show="show==2" id="bmapchart"></div>
    <div v-show="show==3" id="mapchart"></div>
    <div v-show="show==4" id="glchart"></div>
 </div>
  
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import echarts from "echarts";
import lxtData from "@/assets/lxtData";

import "echarts-gl";
import "echarts/extension/bmap/bmap";
import "echarts/map/js/china";
import "echarts/map/js/province/guangdong";

export default {
  name: "MainChart",
  components: {},
  computed: {},
  data() {
    return {
      show: null,
      domIds: ["mainChart", "chart", "bmapchart", "mapchart", "glchart"],
      mainChart: null,
      chart: null,
      bmapchart: null,
      mapchart: null,
      glchart: null
    };
  },
  computed: {
    ...mapGetters(["chartType"])
  },
  watch: {
    show(n, o) {
      /*  this.chart.clear();
      console.log(this.chart.isDisposed());
      console.log(this.chart.getOption()); */
      this.$nextTick(() => {
        switch (n) {
          case 0:
            this.drowMainChart();
            // this.chart.resize();
            break;
          case 1:
            this.drowChart();
            // this.chart.resize();
            break;
          case 2:
            this.drowBMapChart();
            this.setLX_Bmap();
            break;
          case 3:
            this.drowMapChart();
            break;
          case 4:
            this.drowGLChart();
            break;
          case 5:
            break;
          case 6:
            break;
          default:
            break;
        }
      });

      /* if (n == 1) {
        this.show = 1;
        this.$nextTick(() => {
          this.mapTest();
          this.chart.resize();
        });
      } else if (n == 2) {
        this.show = 1;
        this.$nextTick(() => {
          this.mapTestB();
        });
      } else if (n == 0) {
        this.show = 2;
        this.$nextTick(() => {
          this.testGl();
          this.chart.resize();
        });
      } */
    },
    chartType(n, o) {
      this.show = n + 1;
    }
  },
  methods: {
    ...mapActions(["setChartType"]),

    guangDongMapFormJS() {
      this.chart.setOption({
        series: [
          {
            type: "map3D",
            map: "广东"
          }
        ]
      });
    },

    setLX_Bmap() {
      let data = lxtData;
      let hStep = 300 / (data.length - 1);
      let busLines = [].concat.apply(
        [],
        data.map(function(busLine, idx) {
          return {
            coords: busLine,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL(
                  "#5A94DF",
                  Math.round(hStep * idx)
                )
              }
            }
          };
        })
      );
      let option = {
        series: [
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              normal: {
                opacity: 0.3,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 100
          },
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            lineStyle: {
              normal: {
                width: 0.02
              }
            },
            effect: {
              constantSpeed: 40,
              show: true,
              trailLength: 0.02,
              symbolSize: 2
            },
            zlevel: 1
          },
          {
            name: "浙A95527",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 4;
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "浙A95527-告警",
                value: [120.102281, 30.281876, 50]
              }
            ]
          },
          {
            name: "浙AGH2352",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 4;
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#ff2200",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "浙AGH2352-故障",
                value: [120.155575, 30.314324, 70]
              }
            ]
          }
        ]
      };
      this.bmapchart.setOption(option);
    },

    initChart(name) {
      let dom = document.getElementById(name);
      let existInstance = echarts.getInstanceByDom(dom);
      if (existInstance) {
        return false;
        echarts.dispose(existInstance);
      }
      this[name] = echarts.init(dom);
    },
    drowMainChart() {
      let domId = "mainChart";
      this.initChart(domId);
    },
    drowChart() {
      let domId = "chart";
      this.initChart(domId);
    },
    drowBMapChart() {
      let domId = "bmapchart";
      this.initChart(domId);

      let option = {
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [120.184158, 30.28849],
          // 百度地图缩放
          zoom: 12,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          // mapStyle: {
          //   style: "midnight"
          // }
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "point",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  color: "#93c47d",
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            type: "scatter",
            // 使用百度地图坐标系
            coordinateSystem: "bmap",
            // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [[120, 30, 1]]
          }
        ]
      };

      // let myChart = echarts.init(document.getElementById("mainChart"));
      this[domId].setOption(option, { notMerge: true });
      // 获取百度地图实例，使用百度地图自带的控件
      let bmap = this[domId]
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    },
    drowMapChart() {
      let domId = "mapchart";
      this.initChart(domId);
      function area(name, color) {
        let a = {
          name: name,
          selected: true,
          itemStyle: {
            emphasis: {
              areaColor: color,
              borderColor: "#f47920",
              borderWidth: 1
            }
          }
        };
        return a;
      }
      let geodata = [
        {
          name: "广州市",
          value: [113.43, 23.26]
        },
        {
          name: "佛山市",
          value: [112.98, 23.01]
        },
        {
          name: "东莞市",
          value: [113.85, 23.01]
        },
        {
          name: "中山市",
          value: [113.38, 22.52]
        },
        {
          name: "江门市",
          value: [112.7, 22.31]
        },
        {
          name: "阳江市",
          value: [111.9, 21.95]
        },
        {
          name: "茂名市",
          value: [110.99, 21.68]
        },
        {
          name: "湛江市",
          value: [110.24, 21.25]
        }
      ];
      let geodata1 = [
        {
          name: "深圳市",
          value: [114.07, 22.62]
        }
      ];
      let option = {
        backgroundColor: "#181b3a",
        geo: {
          map: "广东",
          label: {
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: true,
          zlevel: 1,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "rgba(233,0,200,0.3)",
              shadowColor: "rgba(222, 121, 0, 0.5)",
              shadowBlur: 10
            }
          },
          regions: [
            area("深圳市", "#694d9f"),
            area("佛山市", "#45224a"),
            area("茂名市", "#45224a")
          ]
        },
        series: []
      };

      this[domId].setOption(option, { notMerge: true });
      this[domId].resize();
    },
    drowGLChart() {
      let domId = "glchart";
      this.initChart(domId);
      this[domId].setOption({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [
          {
            type: "scatter3D",
            symbolSize: 50,
            data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
            itemStyle: {
              opacity: 1
            }
          }
        ]
      });
      this[domId].resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // window.onresize = this.resizeAllChart;
      this.show = 2;
      // this.drowBMapChart();
      // this.drowMapChart();
      // this.drowGLChart();
    });
  }
};
</script>

<style scoped>
#mainChart,
#chart,
#bmapchart,
#mapchart,
#glchart {
  background: #444;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>