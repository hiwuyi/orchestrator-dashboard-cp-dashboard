<template>
  <div class="flex-row center">
    <el-drawer v-model="props.centerDrawerVisible" direction="rtl" size="50%" :show-close="false" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="drawer-body">
      <div class="drawer-content font-18">
        <div class="flex-row space-between name-title">
          <b class="font-27 font-bold">{{props.list.type === 'FCP' ? 'FCPname1' : 'ECPname1'}}</b>
          <router-link :to="{name:'accountInfo', params: {type: 'Space'}}" class="font-17" @click="closeHandle()">View CP Profile</router-link>
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

        <div class="flex-row space-between name-title">
          <b class="font-27 font-bold">Machine Amount：3</b>
        </div>
        <div class="font-18 note b">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>MachineID:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right" v-if="props.list.resources">{{props.list.resources[0].machine_id}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current CPU usage:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right" v-if="props.list.resources">
                <span class="green">{{system.$commonFun.replaceFormat(props.list.resources[0].cpu.free)}}</span> free
                <span class="green">{{system.$commonFun.replaceFormat(props.list.resources[0].cpu.total)}}</span> total
                <span class="green">{{system.$commonFun.replaceFormat(props.list.resources[0].cpu.total-props.list.resources[0].cpu.free)}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current Memory usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right" v-if="props.list.resources">
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].memory.free))}}</span> free
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].memory.total))}}</span> total
                <span class="orange">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].memory.total-props.list.resources[0].memory.free))}}</span> used
              </p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p>Current Storage usage(GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
              <p class="color text-right" v-if="props.list.resources">
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].storage.free))}}</span> free
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].storage.total))}}</span> total
                <span class="blue">{{system.$commonFun.replaceFormat(system.$commonFun.byteStorage(props.list.resources[0].storage.total-props.list.resources[0].storage.free))}}</span> used
              </p>
            </el-col>
            <el-col v-show="collapse.MachineShow" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
              <div class="grid-content">
                <div class='chart-trends' id='chart-name' v-loading="cpLoad" element-loading-background="rgba(0, 0, 0, 0)"></div>
              </div>
            </el-col>
          </el-row>
          <div v-show="collapse.MachineShow" class="flex-row space-between name-title">
            <b class="font-22">GPU Source</b>
          </div>
          <el-table v-show="collapse.MachineShow" :data="gpuListData" style="width: 100%" empty-text="No Data">
            <el-table-column type="model" min-width="70">
              <template #header>
                <div class="font-20 weight-4">GPU</div>
              </template>
              <template #default="scope">
                <div>{{scope.row.model}}</div>
              </template>
            </el-table-column>
            <el-table-column type="status" min-width="70">
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
                <div>{{scope.row.used}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex-row center">
            <el-button @click="collapse.MachineShow = !collapse.MachineShow">{{collapse.MachineShow?'Fold':'Unfold'}}</el-button>
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
import { ElIcon, ElDialog, ElButton, ElCheckbox } from "element-plus"
import * as echarts from "echarts"
export default defineComponent({
  name: 'Popup',
  components: {
    Warning, ElIcon, ElDialog, ElButton, ElCheckbox
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
    const gpuListData = ref([])
    const collapse = reactive({
      MachineShow: true
    })

    function closeHandle (type) {
      context.emit('hardClose', false, type)
    }
    const changetype = () => {
      cpLoad.value = true
      const machart_name = echarts.init(document.getElementById("chart-name"));
      const option1 = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(149, 163, 189, 0.7)',
          color: '#fff',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'Gilroy-Medium'
          },
          icon: 'roundRect',
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
          type: 'value'
        },
        series: [
          {
            name: 'VCPU',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
            color: '#7ecf51'
          },
          {
            name: 'Memory',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
            color: '#ff9413'
          },
          {
            name: 'Storage',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
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
      if (props.list.resources && props.list.resources[0].gpu) gpuListData.value = props.list.resources[0].gpu.gpus || []
    })
    return {
      system,
      props,
      cpLoad,
      gpuListData,
      collapse,
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
        padding: 0.18rem 0.3rem;
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
