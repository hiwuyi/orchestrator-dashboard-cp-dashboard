<template>
  <div id="payment">
    <div class="payment-history container-landing font-16">
      <el-row class="search-container font-18">
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <div class="flex-row nowrap child">
            <span class="font-22">Task ID: </span>
            <el-input class="zk-input" v-model="networkZK.owner_addr" placeholder="please enter Task ID" @chang="searchZKProvider" @input="searchZKProvider" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <div class="flex-row nowrap child">
            <span class="font-22">NodeID: </span>
            <el-input class="zk-input" v-model="networkZK.node_id" placeholder="please enter NodeID" @chang="searchZKProvider" @input="searchZKProvider" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
          <div class="flex-row nowrap child">
            <el-button type="info" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
            <el-button type="primary" :disabled="!networkZK.contract_address && !networkZK.owner_addr && !networkZK.node_id ? true:false" round @click="searchZKProvider">
              <el-icon>
                <Search />
              </el-icon>
              Search
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-table v-loading="paymentLoad" :data="paymentData" stripe style="width: 100%">
        <el-table-column prop="task_id" width="90">
          <template #header>
            <div class="font-18 weight-4">Task ID</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" column-key="type" filterable :filters="[
            { text: 'CPU', value: 'CPU' },
            { text: 'GPU', value: 'GPU' }
          ]" filter-placement="bottom-end" :filter-multiple="false" min-width="90">
          <template #header>
            <div class="font-18 weight-4">Task Type</div>
          </template>
          <template #default="scope">
            <span>{{scope.row.type === 0 ? 'CPU': 'GPU'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="node_id" min-width="100">
          <template #header>
            <div class="font-18 weight-4">NODE ID</div>
          </template>
          <template #default="scope">
            <div class="flex-row center copy-style" @click="system.$commonFun.copyContent(scope.row.node_id, 'Copied')">
              {{system.$commonFun.hiddAddress(scope.row.node_id)}}
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.957 1.822V1.8a1.2 1.2 0 00-1.2-1.2H2.2A1.2 1.2 0 001 1.8v6.557a1.2 1.2 0 001.2 1.2h.021" stroke="currentColor" stroke-width="1.2"></path>
                <rect width="8.957" height="8.957" rx="1.2" transform="matrix(-1 0 0 1 12.4 3.043)" stroke="currentColor" stroke-width="1.2"></rect>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zk_type" min-width="110">
          <template #header>
            <div class="font-18 weight-4">ZK Type</div>
          </template>
        </el-table-column>
        <el-table-column prop="started_at" min-width="135">
          <template #header>
            <div class="font-18 weight-4">Start Time</div>
          </template>
          <template #default="scope">
            <span>{{system.$commonFun.momentFun(scope.row.started_at)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ended_at" min-width="135">
          <template #header>
            <div class="font-18 weight-4">End Time</div>
          </template>
          <template #default="scope">
            <span>{{system.$commonFun.momentFun(scope.row.ended_at)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tx_hash" min-width="120">
          <template #header>
            <div class="font-18 weight-4">Reward TX Hash</div>
          </template>
          <template #default="scope">
            <a :href="`${scope.row.url_tx}${scope.row.tx_hash}`" target="_blank">{{scope.row.tx_hash}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="amount">
          <template #header>
            <div class="font-18 weight-4">reward</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex-row center pagination-style">
        Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + paymentLoad.length : 0 + paymentLoad.length }} /&nbsp;
        <!-- hide-on-single-page -->
        <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="system.$commonFun.paginationWidth ? 'total, sizes, prev, pager, next, jumper' : 'total, prev, pager, next'"
          :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, onMounted, onActivated, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {
  Search
} from '@element-plus/icons-vue'
export default defineComponent({
  name: 'Payment History',
  components: {
    Search
  },
  setup () {
    const store = useStore()
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const paymentData = ref([])
    const paymentLoad = ref(false)
    const prevType = ref(true)
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0
    })
    const networkZK = reactive({
      contract_address: '',
      owner_addr: '',
      node_id: ''
    })
    const small = ref(false)
    const background = ref(false)

    async function handleSizeChange (val) {
      // console.log('handleSizeChange:', val)
    }
    async function handleCurrentChange (currentPage) {
      // console.log('handleCurrentChange:', currentPage)
      pagin.pageNo = currentPage
      init()
    }
    async function init (params) {
      paymentLoad.value = true
      const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
      const paramsCont = {
        "owner_addr": store.state.metaAddress,
        // "owner_addr": '0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373',
        "page_no": page,
        "page_size": pagin.pageSize
      }
      const paymentsRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_UBI}rewards?${system.$Qs.stringify(paramsCont)}`, 'get') //?public_address=${store.state.metaAddress}
      if (paymentsRes && paymentsRes.code === 0) {
        for (let p = 0; p < paymentsRes.data.list.length; p++) {
          let { url_tx } = await system.$commonFun.getUnit(parseInt(paymentsRes.data.list[p].chain_id), 16)
          paymentsRes.data.list[p].url_tx = url_tx
          const amount = Number(paymentsRes.data.list[p].amount).toFixed(2)
          paymentsRes.data.list[p].amount = amount
        }
        pagin.total = paymentsRes.data.total
        paymentData.value = paymentsRes.data.list || []
      } else {
        pagin.total = 0
        paymentData.value = []
      }
      paymentLoad.value = false
    }
    const searchZKProvider = system.$commonFun.debounce(async function () {
      pagin.pageNo = 1
      getUBITable()
    }, 700)
    function clearProvider () {
      networkZK.contract_address = ''
      networkZK.owner_addr = ''
      networkZK.node_id = ''
      pagin.pageSize = 10
      pagin.pageNo = 1
      // init()
    }
    // onMounted(async () => init())
    // watch(route, (to, from) => {
    //   if (to.name === "UBIHistory") init()
    // })
    return {
      paymentData,
      paymentLoad,
      system,
      route,
      router,
      pagin, background, small, networkZK,
      handleSizeChange, handleCurrentChange, searchZKProvider, clearProvider
    }
  },
})
</script>
<style  lang="less" scoped>
#payment {
  width: 100%;
  :deep(.payment-history) {
    height: calc(100% - 1.2rem);
    margin: 0 auto;
    box-sizing: border-box;
    word-break: break-word;
    text-align: left;
    .title {
      margin: 0 0 0.4rem;
      font-weight: bold;
      font-size: 0.24rem;
      color: @white-color;
      text-transform: capitalize;
    }
    .search-container {
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0;
      padding: 0 0 0.2rem;
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
              background: url(../assets/images/icons/icon-03.png) no-repeat
                center;
              background-size: 100%;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .child {
        height: 100%;
        span {
          white-space: nowrap;
        }
      }
      .el-input {
        width: 100%;
        // max-width: 250px;
        // min-width: 150px;
        margin: 0 0.16rem 0 0.1rem;
        font-size: inherit;
        .el-input__wrapper {
          background-color: @white-color;
          border: 1px solid @border-color;
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
      margin: 0 auto 0.24rem;
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
            padding: 0;
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
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding: 0 6px;
            line-height: 1.5;
            word-break: break-word;
            text-align: center;
            a {
              color: inherit;
              &:hover {
                text-decoration: underline;
              }
            }
            .el-button {
              height: auto;
              padding: 6px 0.1rem;
              background-color: transparent;
              font-family: inherit;
              font-size: inherit;
              border-color: @theme-color;
              border-radius: 1rem;
              line-height: 1;
              color: @theme-color;
              &:hover {
                background-color: @theme-color;
                color: @white-color;
              }
            }
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
    .pagination-style {
      color: rgb(181, 183, 200);
    }
    .el-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      font-size: inherit;
      .el-select__wrapper,
      .el-input,
      .el-input__inner,
      .el-pager {
        font-family: 'HELVETICA-ROMAN';
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
          background-color: #f9fafb;
          border-color: @border-color;
          color: #606060;
        }
        &:not(.disabled):hover {
        }
      }
    }
  }
}
</style>