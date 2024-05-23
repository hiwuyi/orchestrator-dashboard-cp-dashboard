<template>
  <div class="flex-row center">
    <el-dialog v-model="props.centerDrawerVisible" :title="`${props.list.type} Collateral`" :show-close="true" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="dialog-body">
      <div class="dialog-content font-18">
        <el-row class="font-18 note">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>Available Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>0.9984 sETH</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>{{props.list.type}} Collateral Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>0.9984 sETH</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>{{props.list.type}} Locked Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex-row baseline">
            <p>0.9984 sETH</p>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <div class="dialog-footer flex-row flex-end font-18">
          <el-button @click="closeHandle()">Cancel</el-button>
          <el-button @click="closeHandle()" type="primary">OK</el-button>
        </div>
      </template>
    </el-dialog>
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
    })
    return {
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
  .dialog-body {
    width: 35%;
    max-width: 900px;
    min-width: 300px;
    border-radius: 6px;
    word-break: break-word;
    color: #6c6f72;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      .dialog-content {
        padding: 0.12rem 0;
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
          margin: 0.16rem 0;
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
                &.descending {
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
    .el-dialog__footer {
      padding: 0;
      .dialog-footer {
      }
    }
  }
}
</style>
