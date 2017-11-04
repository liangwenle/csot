<template>
  <div id="mainChart">
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { gdJson } from "@/assets/data";

export default {
  name: "MainChart",
  components: {},
  computed: {},

  data() {
    return {};
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),

    mapTest() {
      let option = {
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [120.13066322374, 30.240018034923],
          // 百度地图缩放
          zoom: 14,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {
            style: "midnight"
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

      let myChart = echarts.init(document.getElementById("mainChart"));
      myChart.setOption(option);
      // 获取百度地图实例，使用百度地图自带的控件
      let bmap = myChart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    },
    echartTest() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainChart"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    mapTestB() {
      function area(name, color) {
        var a = {
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
      var geodata = [
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
      var geodata1 = [
        {
          name: "深圳市",
          value: [114.07, 22.62]
        }
      ];

      echarts.registerMap("广东", gdJson);

      let option = {
        backgroundColor: "#181b3a",
        geo: {
          map: "广东",
          label: {
            emphasis: {
              show: false
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
              areaColor: "#031525"
            }
          },
          regions: [
            area("深圳市", "#694d9f"),
            area("东莞市", "#45224a"),
            area("佛山市", "#45224a"),
            area("广州市", "#45224a"),
            area("中山市", "#45224a"),
            area("江门市", "#45224a"),
            area("阳江市", "#45224a"),
            area("茂名市", "#45224a"),
            area("湛江市", "#45224a")
          ]
        },
        series: [
          {
            type: "lines",
            coordinateSystem: "geo",
            //polyline:true,
            symbol: ["none", "triangle"],
            zlevel: 2,
            effect: {
              show: true,
              symbol: "roundRect",
              period: 2,
              delay: 100,
              trailLength: 0.6,
              symbolSize: 6
            },
            lineStyle: {
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
                      color: "#ed1941"
                    },
                    {
                      offset: 1,
                      color: "#ffce7b"
                    }
                  ],
                  globalCoord: false
                },
                width: 1,
                opacity: 0.8,
                //type: 'dotted',
                curveness: 0.2
              }
            },
            data: [
              {
                coords: [
                  //sz-东莞
                  [114.07, 22.62],
                  [113.85, 23.01]
                ]
              },
              {
                coords: [
                  //dg-广州
                  [113.85, 23.01],
                  [113.43, 23.26]
                ]
              },
              {
                coords: [
                  //sz-中山
                  [114.07, 22.62],
                  [113.38, 22.52]
                ]
              },
              {
                coords: [
                  //gz-佛山
                  [113.43, 23.26],
                  [112.98, 23.01]
                ]
              },
              {
                coords: [
                  //fs-江门
                  [112.98, 23.01],
                  [112.7, 22.31]
                ]
              },
              {
                coords: [
                  //zs-江门
                  [113.38, 22.52],
                  [112.7, 22.31]
                ]
              },
              {
                coords: [
                  //jm-阳江
                  [112.7, 22.31],
                  [111.9, 21.95]
                ]
              },
              {
                coords: [
                  //yj-茂名
                  [111.9, 21.95],
                  [110.99, 21.68]
                ]
              },
              {
                coords: [
                  //mm-湛江
                  [110.99, 21.68],
                  [110.24, 21.25]
                ]
              }
            ]
          },
          {
            type: "lines",
            coordinateSystem: "geo",
            //polyline:true,
            symbol: ["none", "triangle"],
            zlevel: 2,
            effect: {
              show: true,
              symbol: "roundRect",
              period: 1.5,
              delay: 100,
              trailLength: 0.6,
              symbolSize: 6
            },
            lineStyle: {
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
                      color: "#ed1941"
                    },
                    {
                      offset: 1,
                      color: "#ffce7b"
                    }
                  ],
                  globalCoord: false
                },
                width: 1,
                opacity: 0.8,
                //type: 'dotted',
                curveness: 0.2
              }
            },
            data: [
              {
                coords: [
                  //jm-阳江
                  [112.7, 22.31],
                  [111.9, 21.95]
                ]
              },
              {
                coords: [
                  //yj-茂名
                  [111.9, 21.95],
                  [110.99, 21.68]
                ]
              },
              {
                coords: [
                  //mm-湛江
                  [110.99, 21.68],
                  [110.24, 21.25]
                ]
              }
            ]
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            zlevel: 3,
            symbol: "circle",
            symbolSize: 5,
            rippleEffect: {
              brushType: "stroke",
              period: 5,
              scale: 7
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                offset: [1, 6],
                show: true,
                textStyle: {
                  color: "yellow"
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: "yellow"
              }
            },
            data: geodata
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            zlevel: 3,
            symbol: "circle",
            symbolSize: 7,
            rippleEffect: {
              brushType: "stroke",
              period: 2,
              scale: 10
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                //offset: [1, -3],
                show: true,
                textStyle: {
                  color: "yellow"
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: "yellow"
              }
            },
            data: geodata1
          }
        ]
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainChart"));
      // 绘制图表
      myChart.setOption(option);
    }
  },
  mounted() {
    this.mapTestB();
  }
};
</script>

<style scoped>
#mainChart {
  background: #444;
  width: 100%;
  height: 100%;
}
</style>