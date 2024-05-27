<template>
  <div class="flex-row center">
    <el-drawer v-model="props.centerDrawerVisible" direction="rtl" size="50%" :show-close="false" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="drawer-body">
      <div class="drawer-content font-18" v-if="props.list.type === 'FCP'">
        <div class="flex-row space-between name-title">
          <b class="font-27 font-bold">{{props.list.name}}</b>
          <router-link v-if="route.name !== 'accountInfo'" :to="{name:'accountInfo', params: {type: 'FCP'}}" class="font-17" @click="closeHandle()">View CP Profile</router-link>
        </div>
        <el-row class="font-18 note">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Contract Address:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex-row baseline">
            <p class="color">{{props.list.owner_addr || props.list.name || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Active Deployment:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color" v-if="props.list.computer_provider">{{props.list.computer_provider.active_deployment || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Region:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{props.list.region || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Score:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color" v-if="props.list.computer_provider">{{props.list.computer_provider.score || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Uptime:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{system.$commonFun.unifyNumber(props.list.uptime)}}%</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>GPU:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex-row baseline">
            <div class="badge flex-row">
              <div class="flex-row machines-style">
                <span v-for="(gpu, g) in props.list.gpu_list" :key="g">
                  {{gpu}}
                </span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="flex-row space-between name-title" v-if="props.list.computer_provider">
          <b class="font-27 font-bold">Machine Amount：{{props.list.computer_provider.machines.length}}</b>
        </div>
        <div class="font-18 note b" v-if="props.list.computer_provider" v-for="(machines, m) in props.list.computer_provider.machines" :key="m">
          <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex-row baseline">
              <p>MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex-row baseline">
              <p class="color text-right" v-if="machines.specs">{{machines.machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex-row baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex-row baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="green">{{system.$commonFun.replaceFormat(machines.specs.cpu.free)}}</span> free
                <span class="green">{{system.$commonFun.replaceFormat(machines.specs.cpu.total)}}</span> total
                <span class="green">{{system.$commonFun.replaceFormat(machines.specs.cpu.used)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex-row baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex-row baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="orange">{{machines.specs.memory.free}}</span> free
                <span class="orange">{{machines.specs.memory.total}}</span> total
                <span class="orange">{{machines.specs.memory.used}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" class="flex-row baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="flex-row baseline">
              <p class="color text-right" v-if="machines.specs">
                <span class="blue">{{machines.specs.storage.free}}</span> free
                <span class="blue">{{machines.specs.storage.total}}</span> total
                <span class="blue">{{machines.specs.storage.used}}</span> used
              </p>
            </el-col>
            <el-col v-show="machines.MachineShow" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
              <div class="grid-content">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              </div>
            </el-col>
          </el-row>
          <div v-show="machines.MachineShow" class="flex-row space-between name-title">
            <b class="font-22">GPU Source</b>
          </div>
          <el-table v-show="machines.MachineShow && machines.specs && machines.specs.gpu" :data="machines.specs.gpu.details" style="width: 100%" empty-text="No Data">
            <el-table-column type="product_name" min-width="70">
              <template #header>
                <div class="font-20 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.product_name}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="70" column-key="status" filterable :filters="[
              { text: 'Occupied', value: 'Occupied' },
              { text: 'Available', value: 'Available' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
              <template #header>
                <div class="font-20 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.status}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.free" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Free</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.fb_memory_usage.free}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.total" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Total</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.fb_memory_usage.total}}</div>
              </template>
            </el-table-column>
            <el-table-column type="fb_memory_usage.used" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Used</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.fb_memory_usage.used}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex-row center">
            <el-button @click="machines.MachineShow = !machines.MachineShow">{{machines.MachineShow?'Fold':'Unfold'}}</el-button>
          </div>
        </div>
      </div>

      <div class="drawer-content font-18" v-if="props.list.type === 'ECP'">
        <div class="flex-row space-between name-title">
          <b class="font-27 font-bold">{{props.list.name}}</b>
          <router-link v-if="route.name !== 'accountInfo'" :to="{name:'accountInfo', params: {type: 'FCP'}}" class="font-17" @click="closeHandle()">View CP Profile</router-link>
        </div>
        <el-row class="font-18 note">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Contract Address:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex-row baseline">
            <p class="color">{{props.list.owner_addr || props.list.name || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Status:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{props.list.status}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Total Task:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{props.list.task?props.list.task.total : ''}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Completed(%):</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{system.$commonFun.fixedformat(props.list.completion_rate,10000)}}%</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>Region:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p class="color">{{props.list.region || '-'}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
            <p>GPU:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="18" :xl="18" class="flex-row baseline">
            <div class="badge flex-row">
              <div class="flex-row machines-style">
                <span v-for="(gpu, g) in props.list.gpu_tags" :key="g">
                  {{gpu}}
                </span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="flex-row space-between name-title" v-if="props.list.resources">
          <b class="font-27 font-bold">Machine Amount：{{props.list.resources.length}}</b>
        </div>
        <div class="font-18 note b" v-if="props.list.resources" v-for="(machinesECP, mECP) in props.list.resources" :key="mECP">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>MachineID: </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right">{{machinesECP.machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right">
                <span class="green">{{system.$commonFun.replaceFormat(machinesECP.cpu.free)}}</span> free
                <span class="green">{{system.$commonFun.replaceFormat(machinesECP.cpu.total)}}</span> total
                <span class="green">{{system.$commonFun.replaceFormat(machinesECP.cpu.total-machinesECP.cpu.free)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right">
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.memory.free))}}</span> free
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.memory.total))}}</span> total
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.memory.total-props.list.resources[0].memory.free))}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right">
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.storage.free))}}</span> free
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.storage.total))}}</span> total
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(machinesECP.storage.total-machinesECP.storage.free))}}</span> used
              </p>
            </el-col>
            <el-col v-show="machinesECP.MachineShow" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
              <div class="grid-content">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              </div>
            </el-col>
          </el-row>
          <div v-show="machinesECP.MachineShow" class="flex-row space-between name-title">
            <b class="font-22">GPU Source</b>
          </div>
          <el-table v-show="machinesECP.MachineShow && machinesECP.gpu" :data="machinesECP.gpu.gpus" style="width: 100%" empty-text="No Data">
            <el-table-column type="model" min-width="70">
              <template #header>
                <div class="font-20 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.model}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="70" column-key="status" filterable :filters="[
              { text: 'Occupied', value: 'Occupied' },
              { text: 'Available', value: 'Available' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
              <template #header>
                <div class="font-20 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.status}}</div>
              </template>
            </el-table-column>
            <el-table-column type="free" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Free</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.free}}</div>
              </template>
            </el-table-column>
            <el-table-column type="total" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Total</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.total}}</div>
              </template>
            </el-table-column>
            <el-table-column type="used" min-width="70">
              <template #header>
                <div class="font-20 weight-4">Used</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.total-scope.row.free}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex-row center">
            <el-button @click="machinesECP.MachineShow = !machinesECP.MachineShow">{{machinesECP.MachineShow?'Fold':'Unfold'}}</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  onActivated,
  onDeactivated,
  watch,
  ref,
  reactive,
  getCurrentInstance,
  toRefs,
  nextTick
} from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  Warning
} from '@element-plus/icons-vue'
import * as echarts from "echarts"
export default defineComponent({
  name: 'Popup',
  components: {
    Warning
  },
  props: {
    centerDrawerVisible: { type: Boolean, default: false },
    list: {
      type: Object,
      default: {
        type: 'stop',
        public_ipv4: ''
      }
    }
  },
  setup (props, context) {
    const store = useStore()
    const system = getCurrentInstance().appContext.config.globalProperties
    const cpLoad = ref(false)
    const route = useRoute()

    function closeHandle (type) {
      context.emit('hardClose', false, type)
    }
    const changetype = () => {
      cpLoad.value = true
      const machart_name = echarts.init(document.getElementById("chart-name"));
      const option1 = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(111, 111, 111, 0.95)',
          color: '#fff',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'Gilroy-Medium'
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
            data: [10, 13, 11, 34, 90, 30, 20],
            color: '#7ecf51'
          },
          {
            name: 'Memory',
            type: 'line',
            data: [20, 12, 19, 24, 29, 33, 31],
            color: '#ff9413'
          },
          {
            name: 'Storage',
            type: 'line',
            data: [15, 23, 20, 15, 19, 30, 41],
            color: '#6067f5'
          }
        ]
      }
      machart_name.setOption(option1);
      window.addEventListener("resize", function () {
        machart_name.resize();
      })
      cpLoad.value = false
    }
    onMounted(async () => {
      await system.$commonFun.timeout(500)
      changetype()
    })
    return {
      route,
      system,
      props,
      cpLoad,
      closeHandle
    }
  }
})
</script>

<style lang="less">
.el-overlay {
  .drawer-body {
    width: 50%;
    max-width: 900px;
    min-width: 300px;
    border-radius: 6px;
    word-break: break-word;
    color: #6c6f72;
    .el-drawer__header {
      display: none;
      padding: 0;
    }
    .el-drawer__body {
      .drawer-content {
        padding: 0.12rem 0.2rem;
        line-height: 1.4;
        cursor: text;
        .name-title {
          color: #000;
          text-transform: capitalize;
          cursor: text;
          a {
            padding: 0.08rem 0.06rem;
            background-color: @theme-color;
            border-radius: 0.08rem;
            color: @white-color;
            line-height: 1;
          }
        }
        .note {
          padding: 0.12rem 0.25rem;
          margin: 0.27rem 0;
          border: 1px solid @border-color;
          border-radius: 0.1rem;
          &.b {
            border-radius: 0.2rem;
          }
          .el-col {
            margin: 0.08rem 0;
            p {
              color: #000;
              &.color {
                color: @border-color;
                .green {
                  color: #8dd565;
                }
                .orange {
                  color: #ff9413;
                }
                .blue {
                  color: #6067f5;
                }
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
            .chart-trends {
              width: 100%;
              margin: 0 auto 0.24rem;
              height: 2.3rem;
              @media screen and (max-width: 540px) {
                height: 300px;
              }
            }
          }
          .el-table {
            width: 100%;
            margin: 0.2rem auto;
            background-color: transparent;
            font-size: inherit;
            border-radius: 0.1rem;
            border: 1px solid #c6cddc;
            tr {
              background-color: transparent;
              th {
                word-break: break-word;
                padding: 0.18rem 0;
                background-color: @theme-color;
                font-size: inherit;
                border: 0;
                &.ascending {
                  .cell {
                    .caret-wrapper {
                      .sort-caret {
                        &.ascending {
                          border-bottom-color: #fff;
                        }
                        &.descending {
                          border-top-color: #d0dcf9;
                        }
                      }
                    }
                  }
                }
                &.descending {
                  .cell {
                    .caret-wrapper {
                      .sort-caret {
                        &.ascending {
                          border-bottom-color: #d0dcf9;
                        }
                        &.descending {
                          border-top-color: #fff;
                        }
                      }
                    }
                  }
                }
                .cell {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: @white-color;
                  word-break: break-word;
                  text-transform: capitalize;
                  text-align: center;
                  line-height: 1.1;
                  @media screen and (max-width: 540px) {
                    font-size: 12px;
                  }
                  .el-table__column-filter-trigger {
                    i {
                      margin: 0 0 0 4px;
                      color: @white-color;
                    }
                  }
                  .caret-wrapper {
                    .sort-caret {
                      &.ascending {
                        border-bottom-color: #d0dcf9;
                      }
                      &.descending {
                        border-top-color: #d0dcf9;
                      }
                    }
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
                  .img {
                    width: 0.23rem;
                    height: 0.23rem;
                    margin-right: 0.15rem;
                    @media screen and (max-width: 1260px) {
                      width: 20px;
                      height: 20px;
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
        }
      }
    }
    .el-drawer__footer {
      padding: 0;
      .drawer-footer {
      }
    }
  }
}
</style>
