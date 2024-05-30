<template>
  <section id="resource-container">
    <div class="flex-row header-title">
      <h1 class="font-24 font-bold">Resources</h1>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex-row baseline">
            <div class="title flex-row">
              <i class="icon icon-use"></i>
              <span class="font-16 weight-4">Current Resource Use</span>
            </div>
            <el-row class="width">
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex-row baseline">
                <div class="grid-content small-spacing">
                  <p class="font-12 text-center">GPU Usage</p>
                  <div class='chart-trends' id='chart-gpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
                  <p class="font-12 text-center desc">
                    <span class="color-gpu">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex-row baseline">
                <div class="grid-content small-spacing">
                  <p class="font-12 text-center">CPU Usage</p>
                  <div class='chart-trends' id='chart-cpu' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
                  <p class="font-12 text-center desc">
                    <span class="color-cpu">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex-row baseline">
                <div class="grid-content small-spacing">
                  <p class="font-12 text-center">Memory Usage (GB)</p>
                  <div class='chart-trends' id='chart-memory' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
                  <p class="font-12 text-center desc">
                    <span class="color-memory">41</span> Used 240 Free</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="flex-row baseline">
                <div class="grid-content small-spacing">
                  <p class="font-12 text-center">Storage Usage (TB)</p>
                  <div class='chart-trends' id='chart-storage' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
                  <p class="font-12 text-center desc">
                    <span class="color-storage">41</span> Used 240 Free</p>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="flex-row baseline">
            <div class="grid-content">
              <div class='chart-trends big' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div><div class="date">
              <el-select v-model="weekList.value" placeholder="Select" size="small">
                <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="providers-overview">
      <el-row :gutter="50">
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="flex-row baseline">
          <div class="usage-style flex-row font-24 font-bold">
            <label>Total Available GPUs: </label>
            <div class="progress flex-row space-between nowrap">
              <el-progress :percentage="60" color="#76b900" :stroke-width="16" />
              <div class="text">
                <span>68</span> /291</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="providers-network font-14">
      <div class="providers-cp">
        <div class="search-body flex-row font-14">
          <span class="font-14">Chipset: </span>
          <el-select v-model="chipsetList.value" @change="handleClick" placeholder="Select" size="small">
            <el-option v-for="item in chipsetList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="font-14">{{item.label}}</div>
            </el-option>
          </el-select>
          <span class="font-14">vRAM: </span>
          <el-select v-model="vRAMList.value" @change="handleClick" placeholder="Select" size="small">
            <el-option v-for="item in vRAMList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="font-14">{{item.label}}</div>
            </el-option>
          </el-select>
          <span class="font-14">Interface: </span>
          <el-select v-model="interfaceList.value" @change="handleClick" placeholder="Select" size="small">
            <el-option v-for="item in interfaceList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="font-14">{{item.label}}</div>
            </el-option>
          </el-select>
          <span class="font-14">Price from </span>
          <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" @chang="searchProvider" @input="searchProvider" />
          <span class="font-14">to </span>
          <el-input v-model="networkInput" placeholder=" " class="font-14 small-spacing" @chang="searchProvider" @input="searchProvider" />
          <span class="font-14">$ &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button type="info" :disabled="!networkInput ? true:false" round @click="clearProvider">Clear</el-button>
          <el-button type="primary" :disabled="!networkInput ? true:false" round @click="searchProvider">
            <el-icon>
              <Search />
            </el-icon>
            Search
          </el-button>
        </div>

        <el-row :gutter="34" class="small-row">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-for="gpu in gpuList" :key="gpu">
            <div class="grid-content">
              <div class="top flex-row space-between">
                <div class="left flex-row font-20">
                  <i class="icon icon-gpu"></i>
                  {{gpu.name}}
                </div>
                <div class="right flex-row baseline font-20">
                  <div class="text">
                    <span>{{gpu.used}}</span>/{{gpu.total}}</div>
                  <span class="small-text font-14">{{gpu.available ?'Available':'Occupied'}}</span>
                </div>
              </div>
              <el-row :gutter="24" class="content">
                <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                  <el-row class="font-14 note">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p>vRAM:</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p class="color">{{gpu.vRAM}}</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p>Interface:</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p class="color">{{gpu.Interface}}</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p>Price:</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
                      <p class="color">{{gpu.Price}}</p>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="flex-row flex-end align-end">
                  <a :href="gpu.rentnow ? 'javascript:void(0);' : 'https://lagrangedao.org/'" target="_blank" class="font-14" :class="{'is-disabled': gpu.rentnow}">RENT NOW</a>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, onActivated, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

export default defineComponent({
  components: {
    Search
  },
  setup () {
    const store = useStore()
    const metaAddress = computed(() => (store.state.metaAddress))
    const accessToken = computed(() => (store.state.accessToken))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const chipsetList = reactive({
      value: 'A100',
      options: [
        {
          value: 'A100',
          label: 'A100'
        }]
    })
    const vRAMList = reactive({
      value: '80Gi',
      options: [
        {
          value: '80Gi',
          label: '80Gi'
        }]
    })
    const interfaceList = reactive({
      value: 'A100',
      options: [
        {
          value: 'A100',
          label: 'A100'
        }]
    })
    const networkInput = ref('')
    const gpuList = ref([
      {
        name: '100',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'RTX 3090Ti',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'T4',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: true
      },
      {
        name: '100',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'RTX 3090Ti',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: false
      },
      {
        name: 'T4',
        total: 54,
        used: 40,
        available: true,
        vRAM: '80Gi',
        Interface: 'PCIe',
        Price: '$1.2 ～1.4',
        tip: 'tip',
        rentnow: true
      }
    ])
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const weekList = reactive({
      value: 'Week',
      options: [
        {
          value: 'Week',
          label: '1 Week'
        },
        {
          value: 'Month',
          label: '1 Month'
        },
        {
          value: 'Year',
          label: '1 Year'
        }]
    })

    async function init () {
      providersLoad.value = true
      const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
      const params = {
        limit: pagin.pageSize,
        offset: page * pagin.pageSize,
        search_string: networkInput.value
      }
      const providerRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}cp/cplist?${system.$Qs.stringify(params)}`, 'get')
      if (providerRes && providerRes.status === 'success') {
        pagin.total = providerRes.data.list_providers_cnt || 0
        providersData.value = await getList(providerRes.data.providers)
      } else {
        providersData.value = []
        if (providerRes.status) system.$commonFun.messageTip(providerRes.status, providerRes.message)
      }
      providersLoad.value = false
    }
    async function getUBITable () {
      providersTableLoad.value = true
      const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
      const params = {
        page_size: paginZK.pageSize,
        page_no: page,
        contract_address: networkZK.contract_address,
        owner_addr: networkZK.owner_addr,
        node_id: networkZK.node_id
      }
      const providerRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_UBI}providers?${system.$Qs.stringify(params)}`, 'get')
      if (providerRes && providerRes.code === 0) {
        paginZK.total = providerRes.data.total || 0
        providerBody.ubiTableData = providerRes.data.list || []
      } else {
        providerBody.ubiTableData = []
        if (providerRes.msg) system.$commonFun.messageTip('error', providerRes.msg)
      }
      providersTableLoad.value = false
    }
    async function getList (list) {
      let l = list || []
      l.forEach((element) => {
        element.gpu_list = []
        try {
          if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
            element.computer_provider.machines.forEach((machines) => {
              if (machines.specs.gpu.details && machines.specs.gpu.details.length > 0) {
                machines.specs.gpu.details.forEach((gpu) => {
                  if (element.gpu_list.indexOf(gpu.product_name) < 0) element.gpu_list.push(gpu.product_name)
                })
              }
            })
          }
        } catch{ }
      })
      return l
    }
    const searchProvider = system.$commonFun.debounce(async function () {
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }, 700)
    function clearProvider () {
      networkInput.value = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      init()
    }
    function reset (type) {
      networkInput.value = ''
      chipsetList.value = 'A100'
      vRAMList.value = '80Gi'
      interfaceList.value = 'A100'
    }
    const changetype = () => {
      const machart_resource = echarts.init(document.getElementById("chart-Resource"));
      const option1 = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          color: '#fff',
          borderWidth: 0,
          borderRadius: 9,
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'HELVETICA-ROMAN'
          },
          icon: 'roundRect',
          formatter: function (params) {
            // params 是一个数组，包含了每个系列的数据信息
            var result = params[0].name + '<br/>'; // X轴的值
            params.forEach(function (item) {
              // 遍历每个系列的数据
              var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; // 获取数据点的颜色
              let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
              result += colorDot + item.seriesName + ' Usage: ' + item.value + '% 11/11 GiB' + '<br/>'; // 系列名和对应的值
            });
            return result;
          }
        },
        legend: {
          data: ['CPU', 'Memory', 'Storage', 'GPU'],
          right: document.documentElement.clientWidth >= 1280 ? '120px' : 'auto',
          top: document.documentElement.clientWidth >= 1280 ? '2%' : '25px',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: '#95a3bd',
            fontSize: 11,
            fontFamily: 'HELVETICA-ROMAN',
            // lineHeight: 14,
            rich: {
              a: {
                verticalAlign: 'middle',
              },
            },
            padding: [0, 0, -2, 2]
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // 使用 formatter 函数格式化标签
            formatter: '{value}%'
          },
          minInterval: 50
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            data: [10, 13, 11, 34, 50, 90, 20],
            color: '#699bff',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'Memory',
            type: 'line',
            data: [35, 12, 59, 24, 29, 83, 31],
            color: '#52ce7c',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'Storage',
            type: 'line',
            data: [6, 23, 20, 75, 59, 30, 41],
            color: '#0046b7',
            showSymbol: false,
            smooth: true
          },
          {
            name: 'GPU',
            type: 'line',
            data: [26, 63, 30, 85, 50, 10, 21],
            color: '#93c605',
            showSymbol: false,
            smooth: true
          }
        ]
      }
      machart_resource.setOption(option1);
      window.addEventListener("resize", function () {
        machart_resource.resize();
      })
    }
    const changePietype = () => {
      const machart_gpu = echarts.init(document.getElementById("chart-gpu"));
      const machart_cpu = echarts.init(document.getElementById("chart-cpu"));
      const machart_memory = echarts.init(document.getElementById("chart-memory"));
      const machart_storage = echarts.init(document.getElementById("chart-storage"));
      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'none'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: '2%',
        //   bottom: '0',
        //   itemGap: 5,
        //   itemWidth: 10,
        //   itemHeight: 10,
        //   icon: 'roundRect',
        //   // 图例标签的格式器，可以定制文本
        //   // formatter: function (name) {
        //   //     return echarts.format.truncateText(name, 50);
        //   // },
        //   // 图例文本样式
        //   textStyle: {
        //     color: '#000',
        //     fontSize: 11,
        //     fontFamily: 'HELVETICA-ROMAN',
        //     // lineHeight: 14,
        //     rich: {
        //       a: {
        //         verticalAlign: 'middle',
        //       },
        //     },
        //     padding: [0, 0, -2, -1]
        //   }
        // },
        color: ['#93c605', '#7c889b'],
        series: [
          {
            name: 'Total',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: 'transparent',
              borderWidth: 0
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 9,
                borderColor: 'transparent',
                color: '#000'
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      }
      const option2 = JSON.parse(JSON.stringify(option))
      const option3 = JSON.parse(JSON.stringify(option))
      const option4 = JSON.parse(JSON.stringify(option))
      const option5 = JSON.parse(JSON.stringify(option))
      option3.color[0] = '#699bff'
      option4.color[0] = '#52ce7c'
      option5.color[0] = '#0046b7'
      option2.series[0].data = [
        { value: 16, name: `16 Used` },
        { value: 26, name: `26 Free` },
      ]
      option3.series[0].data = [
        { value: 1648, name: `1648 Used` },
        { value: 2000, name: `2000 Free` },
      ]
      option4.series[0].data = [
        { value: 1.21, name: `1.21 TB Used` },
        { value: 22, name: `22 TB Free` },
      ]
      option5.series[0].data = [
        { value: 16.45, name: `16.45 TB Used` },
        { value: 80.12, name: `80.12 TB Free` },
      ]
      machart_gpu.setOption(option2);
      machart_cpu.setOption(option3);
      machart_memory.setOption(option4);
      machart_storage.setOption(option5);
      window.addEventListener("resize", function () {
        machart_gpu.resize();
        machart_cpu.resize();
        machart_memory.resize();
        machart_storage.resize();
      })
    }
    const handleClick = () => { }
    onActivated(async () => {
      // reset('init')
      changetype()
      changePietype()
    })
    return {
      system,
      route,
      metaAddress,
      networkInput, chipsetList, vRAMList, interfaceList, gpuList, providersLoad, providersTableLoad,weekList,
      searchProvider, clearProvider, handleClick
    }
  }
})
</script>

<style lang="less" scoped>
#resource-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  :deep(.header-title) {
    padding: 0.15rem 0 0.2rem;
    margin: 0 0 0.07rem;
    border-bottom: 1px solid #858586;
    line-height: 1.15;
    h1 {
      margin: 0 0.3rem 0 0;
    }
    .el-select {
      width: auto;
      margin: 0 0.3rem 0 0;
      font-size: inherit;
      .el-tooltip__trigger {
        margin: 0;
        width: auto;
        height: auto;
        padding: 0.06rem 0.22rem;
        font-size: inherit;
        font-family: inherit;
        border: 1px solid #b6c0d1;
        border-radius: 0.07rem;
        box-shadow: none;
        .el-select__selected-item {
          position: relative;
          top: auto;
          margin: 0 0.16rem 0 0;
          transform: translateY(0px);
          line-height: 1.2;
          color: @theme-color;
          &.is-hidden {
            display: none;
          }
        }
        .el-select__suffix {
          .el-select__icon {
            background: url(../../../assets/images/icons/icon-03.png) no-repeat
              center;
            background-size: 100%;
            svg {
              display: none;
            }
          }
        }
      }
    }
  }
  :deep(.el-button) {
    border: 0;
    border-radius: 0.06rem;
    background: @theme-color;
    color: white;
    // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    font-family: inherit;
  }
  .color {
    color: #3c85ff;
  }
  .providers-container {
    position: relative;
    width: calc(100% - 0.64rem);
    padding: 0.25rem 0.32rem;
    margin: 0.3rem 0;
    background-color: @white-color;
    border-radius: 0.14rem;
    .title {
      margin: 0;
      .icon {
        width: 0.24rem;
        height: 0.24rem;
        margin: 0 0.09rem 0 0;
        &.icon-use {
          background: url(../../../assets/images/icons/icon-06.png) no-repeat;
          background-size: 100%;
        }
      }
    }
    .el-col {
      margin: 0 !important;
    }
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0 0 0.17rem;
      a {
        padding: 0.07rem 0.1rem;
        margin: 0 0 0 0.1rem;
        background-color: @white-color;
        border: 1px solid #c1c9d8;
        border-radius: 0.07rem;
        color: @theme-color;
        i {
          width: 0.25rem;
          height: 0.25rem;
          margin: 0 0 0 0.07rem;
          background: url(../../../assets/images/icons/icon-01.png) no-repeat;
          background-size: 100%;
        }
      }
    }
    .el-row {
      .el-col {
        margin: 0.3rem 0 0.06rem;
        &.flex-row {
          display: flex;
        }
        .title-link {
          margin: auto;
          line-height: 1;
        }
        .grid-content {
          position: relative;
          width: calc(100% - 0.48rem);
          height: calc(100% - 0.36rem);
          padding: 0.18rem 0.24rem;
          background: @white-color;
          border-radius: 0.18rem;
          // box-shadow: 0 0 12px #e6e7eb;
          &.small-spacing {
            width: calc(100% - 0.1rem);
            padding: 0.18rem 0.05rem;
          }
          .el-col {
            margin: 0.1rem 0 0;
          }
          .top {
            margin: 0;
            .left {
              .icon {
                width: 0.4rem;
                height: 0.4rem;
                margin: 0 0.07rem 0 0;
                &.icon-gpu {
                  background: url(../../../assets/images/icons/icon-gpu.png)
                    no-repeat center;
                  background-size: 100%;
                }
              }
            }
            .right {
              .text {
                margin: 0 0 0 0.2rem;
                white-space: nowrap;
                line-height: 1;
                span {
                  color: #76b900;
                }
              }
              .small-text {
                margin: 0 0 0 0.14rem;
                color: @border-color;
              }
            }
          }
          .content {
            a {
              padding: 0.08rem 0.15rem;
              background-color: #edf2ff;
              border: 1px solid #a8c2ff;
              border-radius: 0.5rem;
              color: @theme-color;
              line-height: 1;
              cursor: pointer;
              &.is-disabled {
                background-color: #f3f4f8;
                border-color: #c6cedc;
                color: #000;
                cursor: no-drop;
              }
            }
          }
          .desc {
            color: #7c889b;
            .color-gpu {
              color: #93c605;
            }
            .color-cpu {
              color: #699bff;
            }
            .color-memory {
              color: #52ce7c;
            }
            .color-storage {
              color: #0046b7;
            }
          }
        }
        .date {
          position: absolute;
          right: calc(0.14rem + 2%);
          top: 0.18rem;
          width: 90px;
          .el-select {
            .el-select__wrapper {
              width: 85px;
              border: 1px solid #c9d0dd;
              border-radius: 0.5rem;
              box-shadow: none;
              .el-select__placeholder {
                color: #95a3bd;
              }
              .el-select__suffix {
                .el-select__icon {
                  background: url(../../../assets/images/icons/icon-03.png)
                    no-repeat center;
                  background-size: 8px;
                  svg {
                    display: none;
                  }
                }
              }
            }
          }
        }
        .usage-style {
          width: 100%;
          margin: 0 0 0.08rem;
          color: #000000;
          label {
            width: 3.1rem;
            margin: 0 0.1rem 0 0;
            line-height: 1.1;
          }
          .progress {
            width: calc(85% - 3.2rem);
            .el-progress {
              width: 100%;
              .el-progress__text {
                display: none;
              }
              .el-progress-bar__outer {
                background-color: @border-color;
              }
            }
            .text {
              margin: 0 0 0 0.2rem;
              white-space: nowrap;
              line-height: 1;
              span {
                color: #76b900;
              }
            }
          }
        }
        .chart-trends {
          width: 100%;
          margin: 0 auto;
          height: 1.3rem;
          @media screen and (max-width: 768px) {
            height: 150px;
          }
          &.big {
            height: 2rem;
            @media screen and (max-width: 768px) {
              height: 280px;
            }
          }
        }
        .chart-world {
          width: 100%;
          margin: 0 auto;
          height: 3.15rem;
          background-color: @theme-color;
          border-radius: 0.2rem;
          @media screen and (max-width: 540px) {
            height: 400px;
          }
        }
      }
    }
    .search-body {
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0.3rem 0 0;
      .el-select {
        width: auto;
        margin: 0 0.3rem 0 0.17rem;
        font-size: inherit;
        .el-tooltip__trigger {
          margin: 0;
          width: auto;
          height: auto;
          padding: 0.06rem 0.15rem 0.06rem 0.2rem;
          background-color: transparent;
          font-size: inherit;
          font-family: inherit;
          border: 1px solid #505052;
          border-radius: 0.07rem;
          box-shadow: none;
          .el-select__selected-item {
            position: relative;
            top: auto;
            margin: 0 0.12rem 0 0;
            transform: translateY(0px);
            line-height: 1.2;
            color: #333;
            &.is-hidden {
              display: none;
            }
          }
          .el-select__suffix {
            .el-select__icon {
              width: 9px;
              height: 9px;
              background: url(../../../assets/images/icons/icon-02.png)
                no-repeat center;
              background-size: 100%;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .el-input {
        width: 0.7rem;
        max-width: 250px;
        min-width: 60px;
        margin: 0 0.16rem 0 0.1rem;
        font-size: inherit;
        &.small-spacing {
          margin: 0 0.06rem 0 0.1rem;
        }
        .el-input__wrapper {
          background-color: transparent;
          border: 1px solid #505052;
          border-radius: 0.08rem;
          box-shadow: none;
          .el-input__inner {
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            color: #333;
            @media screen and (max-width: 768px) {
              width: 100%;
            }
            &:hover,
            &:active,
            &:focus {
              border-color: @theme-color;
            }
          }
        }
      }
      .el-button {
        height: 0.3rem;
        padding: 0 0.1rem;
        font-family: inherit;
        font-size: inherit;
        border: 0;
        line-height: 0.3rem;
        .el-icon {
          width: 0.2rem;
          height: 0.2rem;
          margin: 0 0.08rem 0 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
        &.el-button--info {
          background-color: #d0dcf9;
          border-color: #d0dcf9;
          color: @theme-color;
        }
        &:hover,
        &.is-disabled {
          opacity: 0.9;
        }
      }
    }
    .el-table {
      width: 100%;
      margin: 0.24rem auto;
      background-color: transparent;
      font-size: inherit;
      border-radius: 0.1rem;
      border: 1px solid #c6cddc;
      tr {
        background-color: transparent;
        &:hover {
          td {
            background-color: #f3f6ff;
          }
        }
        th {
          word-break: break-word;
          padding: 0.18rem 0;
          background-color: @theme-color;
          font-size: inherit;
          border: 0;
          .cell {
            color: @white-color;
            word-break: break-word;
            text-transform: capitalize;
            text-align: center;
            line-height: 1.1;
            @media screen and (max-width: 540px) {
              font-size: 12px;
            }
          }
        }
        td {
          padding: 0.08rem 0;
          background-color: @white-color;
          font-size: inherit;
          color: #3d3d3d;
          border-color: #c6cddc;
          text-align: center;
          .cell {
            line-height: 1.1;
          }
          i {
            margin-right: 5px;
            color: @text-color;
            font-size: 18px;
            @media screen and (max-width: 1260px) {
              font-size: 16px;
            }
          }
          .service-body {
            padding: 0 0.25rem 0.1rem;
            // color: #333;
            // border-top: rgb(220, 223, 230) 1px solid;
            // border-bottom: rgb(220, 223, 230) 1px solid;
            .tit {
              margin: 0.2rem 0 0;
              font-size: 16px;
              font-weight: 500;
              text-transform: capitalize;
              @media screen and (max-width: 1260px) {
                font-size: 14px;
              }
            }
            .desc {
              padding: 0 0 0.1rem;
              font-size: 14px;
              @media screen and (max-width: 1260px) {
                font-size: 12px;
              }
            }
            .list {
              padding: 0.1rem 0 0;
              .li-title {
                width: 100%;
                padding: 0 0 0.1rem;
                border-bottom: 1px solid #26272f;
              }
              ul {
                display: flex;
                align-items: stretch;
                justify-content: space-between;
                flex-wrap: wrap;
                margin: 0 auto 0.25rem;
                @media screen and (max-width: 768px) {
                  justify-content: flex-start;
                }
                li {
                  width: 27%;
                  margin-right: 6%;
                  @media screen and (max-width: 768px) {
                    width: auto;
                    margin-right: 0.5rem;
                  }
                  &.m-r {
                    margin-right: 0;
                  }
                  .flex-row {
                    flex-wrap: wrap;
                    .li-body {
                      width: 27%;
                      margin-right: 6%;
                      @media screen and (max-width: 768px) {
                        width: auto;
                        margin-right: 0.5rem;
                      }
                    }
                  }
                  .li-body {
                    position: relative;
                    padding: 0.15rem;
                    margin: 0.3rem 0;
                    background-color: #0d0e12;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                    -webkit-backdrop-filter: blur(5px);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 0.1rem;
                    animation: glow 1s ease-in-out infinite alternate;
                    @media screen and (max-width: 768px) {
                      padding: 0.15rem 0.3rem;
                    }
                    p {
                      padding: 3px 0;
                      font-size: 14px;
                      line-height: 1.3;
                      text-align: center;
                      @media screen and (max-width: 1260px) {
                        font-size: 12px;
                      }
                      strong,
                      b {
                        margin-right: 5px;
                        font-size: 17px;
                        @media screen and (max-width: 1260px) {
                          font-size: 15px;
                        }
                        @media screen and (max-width: 540px) {
                          font-size: 13px;
                        }
                      }
                      &.t {
                        text-transform: capitalize; // color: #808290;
                      }
                      &.t-capitalize {
                        text-transform: uppercase;
                      }
                      &:nth-child(2) {
                        strong {
                          color: #4db470;
                        }
                      }
                      &:nth-child(3) {
                        strong {
                          color: #488fc3;
                        }
                      }
                      &:nth-child(4) {
                        strong {
                          color: #9266a9;
                        }
                      }
                    }
                    &.li-gpu {
                      &::before {
                        position: absolute;
                        content: "";
                        right: 0.1rem;
                        top: 0.1rem;
                        width: 7px;
                        height: 7px;
                        background-color: orange;
                        border-radius: 7px;
                      }
                    }
                    &.li-status {
                      &::before {
                        background-color: #8bc34a;
                      }
                    }
                  }
                }
              }
            }
            .el-divider--horizontal {
              margin: 0.1rem 0;
            }
          }
          .name-style {
            color: @theme-color;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .copy-style {
            cursor: pointer;
            flex-wrap: wrap;
            svg {
              margin: 0 0 0 0.05rem;
            }
          }
          .badge {
            display: flex;
            align-items: center;
            white-space: normal;
            word-break: break-word;
            img {
              width: 30px;
              height: 30px;
              margin-right: 5px;
              @media screen and (max-width: 1260px) {
                width: 25px;
                height: 25px;
              }
            }
            .machines-style {
              flex-wrap: wrap;
              span {
                padding: 3px 10px;
                margin: 3px 5px 3px 0;
                background-color: @theme-color;
                font-size: 12px;
                border-radius: 45px;
                word-break: break-word;
                line-height: 1;
                color: @white-color;
              }
            }
          }
          &.el-table__expanded-cell {
            padding: 0.32rem 0.64rem;
            // border: 1px solid @white-color;
            &:hover {
              background-color: @primary-color !important;
            }
          }
        }
        // &.expanded,
        // &:hover {
        //   td {
        //     background-color: rgba(255, 255, 255, 0.85);
        //     color: #000;
        //     i {
        //       color: #000;
        //     }
        //   }
        // }
        &.expanded {
          border: 1px solid @white-color;
          border-collapse: collapse;
        }
      }
    }
    .el-table--border .el-table__inner-wrapper::after,
    .el-table--border::after,
    .el-table--border::before,
    .el-table__inner-wrapper::before {
      background-color: rgb(38, 39, 47);
      height: 0;
    }
    .el-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-select__wrapper,
      .el-input,
      .el-input__inner,
      .el-pager {
        font-family: "HELVETICA-ROMAN";
        font-size: inherit;
        @media screen and (max-width: 996px) {
          height: 26px;
          min-height: 26px;
          line-height: 26px;
        }
      }
      .el-pagination__total {
        color: #878c93;
      }
      .btn-next,
      .btn-prev,
      .el-pager li {
        min-width: 32px;
        margin: 0 4px;
        background-color: transparent;
        font-size: inherit;
        color: #878c93;
        border: 1px solid transparent;
        border-radius: 5px;
        @media screen and (max-width: 996px) {
          width: 26px;
          min-width: 26px;
          height: 26px;
        }
        &:not(.disabled).active,
        &:not(.disabled):hover,
        &.is-active {
          width: 24px;
          min-width: 24px;
          height: 24px;
          line-height: 24px;
          background-color: #f9fafb;
          border-color: @border-color;
          color: #606060;
        }
        &:not(.disabled):hover {
        }
      }
      .el-pager li {
        color: #606060;
      }
      .el-select {
        width: 100px;
      }
      .el-input,
      .el-select__wrapper {
        min-height: 24px;
        height: 24px;
      }
    }
  }
}
</style>

<style lang="less">
.menu-style {
  border-radius: 0.1rem;
  border-top-right-radius: 0.05rem;
  .el-dropdown-menu {
    position: relative;
    border-radius: 0.1rem;
    border-top-right-radius: 0.05rem;
    &:first-child {
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 12px;
        right: 12px;
        height: 1px;
        background-color: #e7e7e7;
      }
    }
    .el-dropdown-menu__item {
      min-width: 170px;
      padding: 5px 12px;
      &:hover,
      &:focus {
        background-color: #fbfbfc;
        color: #000;
        // background-color: rgba(116, 5, 255, 0.1);
        // color: rgba(116, 5, 255, 1);
        .link {
          text-decoration: underline;
        }
      }
      .link {
        padding: 5px 0;
        cursor: pointer;
      }
      .profile {
        width: 100%;
        padding: 5px 0 0;
        margin: 0;
        // &.router-link {
        //   display: block;
        //   width: 100%;
        //   height: auto;
        //   padding: 3px 3px 3px 22px;
        //   &:hover {
        //     text-decoration: underline;
        //   }
        // }
        // &.b {
        // }
        cursor: pointer;
        * {
          cursor: pointer;
        }
        .tit {
          font-size: 12px;
          color: #989898;
          line-height: 1.5;
        }
        .flex-row {
          img {
            margin-right: 7px;
            border-radius: 100%;
          }
          .link {
            padding: 2px 0;
          }
        }
      }
      .set {
        vertical-align: middle;
        * {
          vertical-align: middle;
        }
        .el-button-group > .el-button {
          border-radius: 7px;
          &:first-child {
            padding-left: 10px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        .el-icon {
          margin: auto;
          cursor: pointer;
          svg {
            width: 1em;
            cursor: pointer;
            path {
              cursor: pointer;
            }
          }
        }
        .loginImg {
          cursor: pointer;
          img {
            width: 23px;
            height: 23px;
            margin: 0 5px 0 0;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #b9b9b9;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
