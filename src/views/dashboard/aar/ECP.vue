<template>
  <section id="aarECP-container">
    <div class="flex-row header-title font-32">
      <h1 class="color font-33 font-bold">Atom Accelerator Race</h1>
      <div class="font-18">
        Welcome to the Atom Accelerator Race campaign! You can join the campaign at:
        <br>
        <span class="color link" @click="system.$commonFun.goLink('https://proxima-testnet.swanchain.io')">https://proxima-testnet.swanchain.io</span>
      </div>
    </div>

    <div class="providers-network font-16">
      <div class="title flex-row">
        <b class="font-27 font-bold">ECP Rankings</b>
      </div>

      <div class="providers-cp">
        <el-row class="search-body flex-row font-18">
          <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
            <div class="flex-row nowrap child">
              <span class="font-22">Contract Address: </span>
              <el-input class="zk-input" v-model="networkZK.contract_address" placeholder="Contract Address" @chang="searchZKProvider" @input="searchZKProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
            <div class="flex-row nowrap child">
              <span class="font-22">Name: </span>
              <el-input class="zk-input" v-model="networkZK.owner_addr" placeholder="Owner Addr" @chang="searchZKProvider" @input="searchZKProvider" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="3" :xl="3">
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

        <el-table :data="providerBody.ubiTableData" style="width: 100%" empty-text="No Data" v-loading="providersECPLoad">
          <el-table-column type="index" width="80">
            <template #header>
              <div class="font-18 weight-4">Ranking</div>
            </template>
            <template #default="scope">
              <div class="badge flex-row center">
                <img v-if="scope.$index === 0 && paginZK.pageNo <= 1" :src="badgeIcon01" alt="" class="img">
                <img v-else-if="scope.$index === 1 && paginZK.pageNo <= 1" :src="badgeIcon02" alt="" class="img">
                <img v-else-if="scope.$index === 2 && pagin.pageNo <= 1" :src="badgeIcon03" alt="" class="img">
                <span v-else class="img"></span> {{scope.$index+1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" min-width="120">
            <template #header>
              <div class="font-18 weight-4">Name</div>
            </template>
            <template #default="scope">
              <div class="name-style" @click="handleSelect('ranking', scope.row, 'FCP')">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="owner_addr" min-width="140">
            <template #header>
              <div class="font-18 weight-4">Contract Address</div>
            </template>
            <template #default="scope">
              <div>{{system.$commonFun.hiddAddress(scope.row.owner_addr)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="node_id" min-width="120">
            <template #header>
              <div class="font-18 weight-4">nodeID</div>
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
          <el-table-column prop="task">
            <template #header>
              <div class="font-18 weight-4">Total Task</div>
            </template>
            <template #default="scope">
              <div>
                {{scope.row.task?scope.row.task.total : ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="completion_rate" min-width="100">
            <template #header>
              <div class="font-18 weight-4">Completion Rate</div>
            </template>
          </el-table-column>
          <el-table-column prop="completion_rate" min-width="100">
            <template #header>
              <div class="font-18 weight-4">Contribution Score</div>
            </template>
          </el-table-column>
          <el-table-column prop="completion_rate" min-width="100">
            <template #header>
              <div class="font-18 weight-4">Reward Score</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex-row center pagination-style">
          Showing {{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize : 0 }}-{{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + providerBody.ubiTableData.length : 0 + providerBody.ubiTableData.length }} /&nbsp;
          <!-- hide-on-single-page -->
          <el-pagination :page-size="paginZK.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="paginZK.pageNo" :pager-count="5" :small="small" :background="background" :layout="system.$commonFun.paginationWidth ? 'total, sizes, prev, pager, next, jumper' : 'total, prev, pager, next'"
            :total="paginZK.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
        </div>
      </div>
    </div>

    <vm-drawer v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
  </section>
</template>

<script>
import vmDrawer from "@/components/vmDrawer"
import { defineComponent, computed, onActivated, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

export default defineComponent({
  components: {
    Search, vmDrawer
  },
  setup () {
    const store = useStore()
    const metaAddress = computed(() => (store.state.metaAddress))
    const accessToken = computed(() => (store.state.accessToken))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const badgeIcon01 = require("@/assets/images/icons/badge-1.png")
    const badgeIcon02 = require("@/assets/images/icons/badge-2.png")
    const badgeIcon03 = require("@/assets/images/icons/badge-3.png")
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const providersECPLoad = ref(false)
    const providersData = ref([])
    const providerBody = reactive({
      ubiTableData: []
    })
    const pagin = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0,
      total_deployments: 0,
      active_applications: 0
    })
    const paginZK = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 0,
      total_deployments: 0,
      active_applications: 0
    })
    const small = ref(false)
    const background = ref(false)
    const cpLoad = ref(false)
    const networkInput = reactive({
      contract_address: '',
      name: ''
    })
    const networkZK = reactive({
      contract_address: '',
      owner_addr: '',
      node_id: ''
    })
    const vmOperate = reactive({
      centerDrawerVisible: false,
      row: {}
    })

    function handleSizeChange (val) { }
    async function handleCurrentChange (currentPage) {
      pagin.pageNo = currentPage
      init()
    }
    async function handleZKCurrentChange (currentPage) {
      paginZK.pageNo = currentPage
      getUBITable()
    }
    async function init () {
      providersTableLoad.value = true
      const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
      const params = {
        limit: pagin.pageSize,
        offset: page * pagin.pageSize,
        search_string: networkInput.name
      }
      const providerRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}cp/cplist?${system.$Qs.stringify(params)}`, 'get')
      if (providerRes && providerRes.status === 'success') {
        pagin.total = providerRes.data.list_providers_cnt || 0
        providersData.value = await getList(providerRes.data.providers)
      } else {
        providersData.value = []
        if (providerRes.status) system.$commonFun.messageTip(providerRes.status, providerRes.message)
      }
      providersTableLoad.value = false
    }
    async function getUBITable () {
      providersECPLoad.value = true
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
      providersECPLoad.value = false
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
    const searchZKProvider = system.$commonFun.debounce(async function () {
      paginZK.pageNo = 1
      getUBITable()
    }, 700)
    function clearProvider () {
      networkInput.contract_address = ''
      networkInput.name = ''
      networkZK.owner_addr = ''
      networkZK.contract_address = ''
      networkZK.node_id = ''
        paginZK.pageNo = 1
        getUBITable()
    }
    function reset (type) {
      pagin.total = 0
      pagin.total_deployments = 0
      pagin.active_applications = 0
      pagin.pageSize = 10
      pagin.pageNo = 1
      providersData.value = []
      providersLoad.value = false
      providersTableLoad.value = false
      providersECPLoad.value = false
      networkInput.name = ''
      networkInput.contract_address = ''
      networkZK.owner_addr = ''
      networkZK.contract_address = ''
      networkZK.node_id = ''
      init()
      getUBITable()
    }
    async function handleSelect (key, row, type) {
      // console.log(key, index, row) 
      // switch (key) {
      //   case 'ranking':
      //     vmOperate.row = row
      //     vmOperate.row.type = type
      //     vmOperate.centerDrawerVisible = true
      //     break;
      // }
      router.push({ name: 'accountInfo', params: { type: 'ECP' } })
    }
    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    onActivated(async () => {
      reset('init')
    })
    return {
      system,
      route,
      metaAddress,
      providersLoad,
      providersTableLoad,
      providersECPLoad,
      providersData,
      providerBody,
      networkInput,
      networkZK,
      pagin,
      paginZK,
      small,
      background,
      badgeIcon01,
      badgeIcon02,
      badgeIcon03,
      accessToken, cpLoad, vmOperate,
      handleSizeChange, handleCurrentChange, handleZKCurrentChange, searchProvider, searchZKProvider, clearProvider,
      handleSelect, hardClose
    }
  }
})
</script>

<style lang="less" scoped>
#aarECP-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  :deep(.header-title) {
    padding: 0.1rem 0;
    border-bottom: 2px solid #aaaaac;
    line-height: 1.15;
    h1 {
      margin: 0 0.3rem 0 0;
    }
    .link {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
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
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0.22rem 0 0;
      line-height: 1;
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
        margin: 0.22rem 0 0;
        &.flex-row {
          display: flex;
        }
        &.m {
          margin: 0.22rem 0;
        }
        .title-link {
          margin: auto;
          line-height: 1;
        }
        .grid-content {
          width: 100%;
          height: calc(100% - 0.3rem);
          padding: 0.18rem 0.14rem 0.12rem;
          background: @white-color;
          border-radius: 0.18rem;
          box-shadow: 0 0 12px #e6e7eb;
          h6 {
            width: 100%;
            line-height: 1.2;
            text-transform: capitalize;
            color: @border-color;
            &.t {
              width: auto;
              padding: 0 0.2rem;
            }
            small {
              margin: 0 0 0 5px;
              font-family: "Montserrat-Regular";
              font-weight: normal;
              color: #a0a0a0;
              font-size: 0.13rem;
              @media screen and (min-width: 1800px) {
                font-size: 0.15rem;
              }
              @media screen and (max-width: 768px) {
                font-size: 12px;
              }
            }
            .el-select {
              font-size: inherit;
              .el-tooltip__trigger {
                margin: 0;
                width: 80px;
                padding: 2px 4px;
              }
            }
          }
          b {
            position: relative;
            padding: 6px 0 12px;
            margin: 0 0 2px;
            line-height: 1;
            .span {
              position: absolute;
              bottom: 0;
              right: 0.2rem;
              &.up {
                color: #38a169;
              }
              &.down {
                color: #e53e3e;
              }
              small {
                margin: 0;
                font-family: "Montserrat-Regular";
                font-weight: normal;
                color: #a0a0a0;
                font-size: 0.14rem;
                @media screen and (min-width: 1800px) {
                  font-size: 0.16rem;
                }
                @media screen and (max-width: 768px) {
                  font-size: 13px;
                }
              }
            }
            small {
              margin: 0 0 0 4px;
              font-size: 0.16rem;
              @media screen and (min-width: 1800px) {
                font-size: 0.18rem;
              }
              @media screen and (max-width: 768px) {
                font-size: 15px;
              }
            }
          }
        }
        .usage-style {
          width: 100%;
          margin: 0 0 0.08rem;
          color: #000000;
          label {
            width: 2.8rem;
            margin: 0 0.1rem 0 0;
            line-height: 1.1;
          }
          .progress {
            width: calc(85% - 2.9rem);
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
              width: 100%;
              margin: 3px 0 0;
              line-height: 1;
              color: @border-color;
            }
          }
        }
        .chart-trends {
          width: 100%;
          margin: 0 auto;
          height: 2.3rem;
          @media screen and (max-width: 540px) {
            height: 300px;
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
        .chart {
          width: 100%;
          margin: 0.45rem auto 0;
          height: 500px;
          @media screen and (max-width: 540px) {
            height: 400px;
          }
        }
        .el-tabs {
          .el-tabs__header {
            margin: 0;
            .el-tabs__active-bar,
            .el-tabs__nav-wrap:after {
              display: none;
            }
            .el-tabs__nav {
              .el-tabs__item {
                height: auto;
                padding: 0.1rem 0.18rem;
                margin: 0 0.16rem 0 0;
                border-radius: 0.08rem;
                line-height: 1.1;
                &.is-active {
                  background-color: @theme-color;
                  color: @white-color;
                }
              }
            }
          }
        }
      }
    }
    .search-body {
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0.4rem 0 0;
      .child {
        height: 100%;
        span {
          white-space: nowrap;
        }
      }
      .el-input {
        width: 100%;
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
      margin: 0.24rem auto;
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
            padding: 0;
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
            padding: 0 6px;
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
    .pagination-style {
      color: #878c93;
    }
    .el-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
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
