<template>
  <section id="cp-container">
    <div class="flex-row header-title">
      <h1 class="font-24 font-bold">CP Profile</h1>
    </div>

    <div class="providers-network font-16">
      <div class="providers">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
            <div class="providers-cp s font-14">
              <div class="flex-row name-title">
                <b class="font-16 weight-4">Account Info</b>
                <a @click="handleSelect('claimAccount', {}, 'claimAccount')" :class="{'is-disabled': false}">Claim Account</a>
              </div>
              <div class="note b">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="flex-row baseline">
                    <p>CP Contract Address:</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="flex-row baseline">
                    <p>{{system.$commonFun.replaceFormat(pagin.total)}}</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="flex-row baseline">
                    <p>Account type:</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="flex-row baseline">
                    <div class="collateral m b-ecp" :class="{'b-fcp': activeName === 'FCP'}">{{activeName}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="flex-row baseline">
                    <p>Owner Address:</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="flex-row baseline">
                    <div class="flex-row center copy-style">
                      {{system.$commonFun.hiddAddress(ringGraphData.data.cpu_total)}}
                      <svg @click="system.$commonFun.copyContent(ringGraphData.data.cpu_total, 'Copied')" data-v-52e705d9="" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path data-v-52e705d9="" d="M9.957 1.822V1.8a1.2 1.2 0 00-1.2-1.2H2.2A1.2 1.2 0 001 1.8v6.557a1.2 1.2 0 001.2 1.2h.021" stroke="currentColor" stroke-width="1.4"></path>
                        <rect data-v-52e705d9="" width="10.5" height="10.5" rx="1.2" transform="matrix(-1 0 0 1 15.4 4)" stroke="currentColor" stroke-width="1.2"></rect>
                      </svg>
                      <svg @click="system.$commonFun.goLink(`${system.$explorerLink}${ringGraphData.data.cpu_total}`)" t="1716455516372" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2408" width="16" height="16">
                        <path d="M892 928.1H134c-19.9 0-36-16.1-36-36v-758c0-19.9 16.1-36 36-36h314.1c19.9 0 36 16.1 36 36s-16.1 36-36 36H170v686h686V579.6c0-19.9 16.1-36 36-36s36 16.1 36 36v312.5c0 19.9-16.1 36-36 36z" fill="#2c2c2c" p-id="2409"></path>
                        <path d="M927.9 131.6v-0.5c-0.1-1.7-0.4-3.3-0.7-4.9 0-0.1 0-0.2-0.1-0.3-0.4-1.7-0.9-3.3-1.5-4.9v-0.1c-0.6-1.6-1.4-3.1-2.2-4.6 0-0.1-0.1-0.1-0.1-0.2-0.8-1.4-1.7-2.8-2.7-4.1-0.1-0.1-0.2-0.3-0.3-0.4-0.5-0.6-0.9-1.1-1.4-1.7 0-0.1-0.1-0.1-0.1-0.2-0.5-0.6-1-1.1-1.6-1.6l-0.4-0.4c-0.5-0.5-1.1-1-1.6-1.5l-0.1-0.1c-0.6-0.5-1.2-1-1.9-1.4-0.1-0.1-0.3-0.2-0.4-0.3-1.4-1-2.8-1.8-4.3-2.6l-0.1-0.1c-1.6-0.8-3.2-1.5-4.9-2-1.6-0.5-3.3-1-5-1.2-0.1 0-0.2 0-0.3-0.1l-2.4-0.3h-0.3c-0.7-0.1-1.3-0.1-2-0.1H640.1c-19.9 0-36 16.1-36 36s16.1 36 36 36h165L487.6 487.6c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5 9.2 0 18.4-3.5 25.5-10.5L856 221v162.8c0 19.9 16.1 36 36 36s36-16.1 36-36V134.1c0-0.8 0-1.7-0.1-2.5z"
                          fill="#2c2c2c" p-id="2410"></path>
                      </svg>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="flex-row baseline">
                    <p>Worker Address:</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="flex-row baseline">
                    <div class="flex-row center copy-style" @click="system.$commonFun.copyContent(ringGraphData.data.memory_total, 'Copied')">
                      {{system.$commonFun.hiddAddress(ringGraphData.data.memory_total)}}
                      <svg data-v-52e705d9="" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path data-v-52e705d9="" d="M9.957 1.822V1.8a1.2 1.2 0 00-1.2-1.2H2.2A1.2 1.2 0 001 1.8v6.557a1.2 1.2 0 001.2 1.2h.021" stroke="currentColor" stroke-width="1.4"></path>
                        <rect data-v-52e705d9="" width="10.5" height="10.5" rx="1.2" transform="matrix(-1 0 0 1 15.4 4)" stroke="currentColor" stroke-width="1.2"></rect>
                      </svg>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="flex-row baseline">
                    <p>Benefciary Address:</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="flex-row baseline">
                    <div class="flex-row center copy-style" @click="system.$commonFun.copyContent(ringGraphData.data.gpu_total, 'Copied')">
                      {{system.$commonFun.hiddAddress(ringGraphData.data.gpu_total)}}
                      <svg data-v-52e705d9="" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path data-v-52e705d9="" d="M9.957 1.822V1.8a1.2 1.2 0 00-1.2-1.2H2.2A1.2 1.2 0 001 1.8v6.557a1.2 1.2 0 001.2 1.2h.021" stroke="currentColor" stroke-width="1.4"></path>
                        <rect data-v-52e705d9="" width="10.5" height="10.5" rx="1.2" transform="matrix(-1 0 0 1 15.4 4)" stroke="currentColor" stroke-width="1.2"></rect>
                      </svg>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
            <div class="providers-cp s font-14">
              <div class="flex-row space-between name-title">
                <b class="font-16 weight-4">Balance Info</b>
              </div>
              <div class="note b">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
                    <p class="color font-18">Available Balance：0.9984 sETH</p>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline s">
                    <div class="flex-row space-between width">
                      <span>FCP Collateral Balance:</span>
                      <span class="text-right">0.1444 SETH</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline s">
                    <div class="flex-row space-between width">
                      <span>FCP Locked Balance: </span>
                      <span>0.1234 SETH</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
                    <div :class="{'collateral':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'FCP')">FCP Collateral</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline s">
                    <div class="flex-row space-between width">
                      <span>ECP Collateral Balance:</span>
                      <span class="text-right">0.1444 SETH</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline s">
                    <div class="flex-row space-between width">
                      <span>ECP Locked Balance: </span>
                      <span>0.1234 SETH</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex-row baseline">
                    <div :class="{'collateral':true,'is-disabled': !signature}" @click="handleSelect('cpProfile', {}, 'ECP')">ECP Collateral</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="providers">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="module-container">
              <div class="title flex-row">
                <span class="font-16 weight-4">Job completion</span>
                <span class="font-12 subtitle">Job completion total： 101</span>
              </div>
              <div class='chart-trends' id='chart-job' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              <div class="date">
                <el-select v-model="weekList.value" placeholder="Select" size="small">
                  <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                    <div class="font-14">{{item.label}}</div>
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="module-container">
              <div class="title flex-row">
                <span class="font-16 weight-4">Reward claimed</span>
                <span class="font-12 subtitle">Reward claimed total： 87</span>
              </div>
              <div class='chart-trends' id='chart-reward' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
              <div class="date">
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

      <div class="providers-cp">
        <div class="flex-row space-between name-title">
          <b class="font-16 weight-4">Resource List</b>
        </div>
        <div class="font-14 note b">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Total Number Of Node:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{system.$commonFun.replaceFormat(pagin.total)}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Average Score:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{ringGraphData.data.average_score_total || '-'}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Used CPU/Total:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{system.$commonFun.replaceFormat(ringGraphData.data.cpu_total)}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Used Memory/Total (GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{system.$commonFun.replaceFormat(ringGraphData.data.memory_total)}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Used GPU/Total:</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{system.$commonFun.replaceFormat(ringGraphData.data.gpu_total)}}</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>Used Storage/Total (GiB):</p>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="flex-row baseline">
              <p>{{system.$commonFun.replaceFormat(ringGraphData.data.storage_total)}}</p>
            </el-col>
          </el-row>
          <div class="font-14">
            <el-table :data="providersData" style="width: 100%" empty-text="No Data" v-loading="providersTableLoad">
              <el-table-column prop="name" min-width="120">
                <template #header>
                  <div class="font-14 weight-4">Machine ID</div>
                </template>
                <template #default="scope">
                  <div class="badge flex-row center name-style" @click="handleSelect('ranking', scope.row, 'resourceList')">
                    {{scope.row.name}}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="country" label="Country" /> -->
              <el-table-column prop="computer_provider.status" width="120" column-key="status" filterable :filters="[
                { text: 'Online', value: 'Online' },
                { text: 'Suspended', value: 'Suspended' },
                { text: 'Offline', value: 'Offline' }
              ]" filter-placement="bottom-end" :filter-multiple="false">
                <template #header>
                  <div class="font-14 weight-4">status</div>
                </template>
              </el-table-column>
              <el-table-column prop="gpu_list" min-width="140">
                <template #header>
                  <div class="font-14 weight-4">GPU</div>
                </template>
                <template #default="scope">
                  <div class="badge flex-row center">
                    <div class="flex-row center machines-style">
                      <span v-for="(gpu, g) in scope.row.gpu_list" :key="g">
                        {{gpu}}
                      </span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="region" min-width="100">
                <template #header>
                  <div class="font-14 weight-4">Region</div>
                </template>
              </el-table-column>
              <el-table-column prop="task" min-width="140">
                <template #header>
                  <div class="font-14 weight-4">Completed(%)</div>
                </template>
                <template #default="scope">
                  <div v-if="scope.row.type === 'ECP'">
                    {{system.$commonFun.fixedformat(scope.row.completion_rate,10000)}}%
                  </div>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column prop="uptime" min-width="130">
                <template #header>
                  <div class="font-14 weight-4">Uptime</div>
                </template>
                <template #default="scope">
                  <div class="flex-row center nowrap" v-if="scope.row.type === 'FCP'">
                    <ul class="flex-row uptime-ul">
                      <li :class="{'active': scope.row.uptime >= 0.1}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.2}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.3}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.4}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.5}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.6}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.7}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.8}"></li>
                      <li :class="{'active': scope.row.uptime >= 0.9}"></li>
                      <li :class="{'active': scope.row.uptime >= 1}"></li>
                    </ul>
                    {{system.$commonFun.unifyNumber(scope.row.uptime)}}%
                  </div>
                  <span v-else>-</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex-row center pagination-style font-16">
              Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + providersData.length : 0 + providersData.length }} /&nbsp;
              <!-- hide-on-single-page -->
              <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 30, 40]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="system.$commonFun.paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
                :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>
        </div>
      </div>

      <div class="providers-cp">
        <div class="search-body flex-row font-14">
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane name="FCP">
              <template #label>
                <span class="font-14">FCP Reward List</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="ECP">
              <template #label>
                <span class="font-14">ZK Proof List</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="Transaction" disabled>
              <template #label>
                <span class="font-14">Transaction List</span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <payment-history v-if="activeName === 'FCP'"></payment-history>
          <ubi-history v-else-if="activeName === 'ECP'"></ubi-history>
        </div>
      </div>
    </div>

    <vm-drawer v-if="vmOperate.centerDrawerVisible && vmOperate.type === 'drawer'" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-drawer>
    <vm-dialog v-else-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-dialog>
  </section>
</template>

<script>
import vmDrawer from "@/components/vmDrawer"
import vmDialog from "@/components/vmDialog"
import paymentHistory from "@/components/paymentHistory"
import ubiHistory from "@/components/UBIHistory"
import { defineComponent, computed, onActivated, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  Search
} from '@element-plus/icons-vue'
import * as echarts from "echarts"

export default defineComponent({
  components: {
    Search, paymentHistory, ubiHistory, vmDrawer, vmDialog
  },
  setup () {
    const store = useStore()
    const metaAddress = computed(() => (store.state.metaAddress))
    const accessToken = computed(() => (store.state.accessToken))
    const signature = computed(() => (store.state.signature))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
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
    const small = ref(false)
    const background = ref(false)
    const cpLoad = ref(false)
    const networkInput = ref('')
    const activeName = ref('FCP')
    const vmOperate = reactive({
      centerDrawerVisible: false,
      row: {},
      type: 'dialog'
    })
    const ringGraphData = reactive({
      data: {},
      cpScore: {},
      transactionDriveProgram: {},
      providersTotal: {}
    })
    const weekList = reactive({
      value: '7',
      options: [
        {
          value: '7',
          label: '7 DAYS'
        },
        {
          value: '14',
          label: '14 DAYS'
        },
        {
          value: '30',
          label: '30 DAYS'
        }]
    })

    async function handleSelect (key, row, type) {
      switch (key) {
        case 'claimAccount':
          vmOperate.row = row
          vmOperate.row.type = type
          vmOperate.type = 'dialog'
          vmOperate.centerDrawerVisible = true
          break;
        case 'cpProfile':
          vmOperate.row = row
          vmOperate.row.type = type
          vmOperate.type = 'dialog'
          vmOperate.centerDrawerVisible = signature.value === '' ? false : true
          break;
        case 'ranking':
          vmOperate.row = row
          vmOperate.row.type = type
          vmOperate.type = 'drawer'
          vmOperate.centerDrawerVisible = true
          break;
      }
    }
    function hardClose (dialog, type) {
      vmOperate.centerDrawerVisible = dialog
    }
    function reset (type) {
      pagin.total = 0
      pagin.total_deployments = 0
      pagin.active_applications = 0
      pagin.pageSize = 10
      pagin.pageNo = 1
      providersData.value = []
      providerBody.ubiTableData = []
      providersTableLoad.value = false
      providersLoad.value = false
      networkInput.value = ''
      init()
    }
    function handleSizeChange (val) { }
    async function handleCurrentChange (currentPage) {
      pagin.pageNo = currentPage
      init()
    }
    async function getCpscore () {
      providersLoad.value = true
      try {
        let formData = new FormData()
        formData.append('wallet_address', metaAddress.value)
        const cpscoreRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}stats/cpscores`, 'post', formData)
        if (cpscoreRes && cpscoreRes.status === 'success') {
          ringGraphData.cpScore = cpscoreRes.data.providers_program || []
          ringGraphData.transactionDriveProgram = cpscoreRes.data.transaction_drive_program || {}
          ringGraphData.providersTotal = await providersNodeTree(ringGraphData.cpScore)
        } else if (cpscoreRes.message) system.$commonFun.messageTip('error', cpscoreRes.message)
      } catch { }
      providersLoad.value = false
    }
    function providersNodeTree (nodeData) {
      const res = {
        contribution_score: 0,
        task_job_count: 0
      }
      let data = nodeData || []
      let memoryUnit = ''
      let storageUnit = ''
      data.forEach((item) => {
        res.contribution_score += Number(item.contribution_score || 0)
        res.task_job_count += Number(item.task_job_count || 0)
      })
      return res
    }
    async function init () {
      cpLoad.value = true
      providersTableLoad.value = true
      const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
      const params = {
        limit: pagin.pageSize,
        offset: page * pagin.pageSize,
        search_string: networkInput.value,
        // start_time: 1713470000,
        // end_time: 1714077711
      }
      // ?${system.$Qs.stringify(params)}
      // ?${new URLSearchParams(params).toString()}
      const providerRes_test = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}cpdata/${metaAddress.value}`, 'get')
      const providerRes = {
        "data": {
          "list_providers_cnt": 4,
          "providers": [
            {
              "city": "Montreal",
              "computer_provider": {
                "allowed_nodes": null,
                "autobid": 1,
                "city": "Montreal",
                "country": null,
                "created_at": "1709866614",
                "deleted_at": null,
                "job_stats": {
                  "end_time": 1714092141,
                  "failed": 0,
                  "start_time": 1713487341,
                  "submit_failed": 0,
                  "total_submit": 0
                },
                "last_active_at": null,
                "lat": 45.5075,
                "lon": -73.5887,
                "machines": [
                  {
                    "created_at": "1709866624",
                    "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                    "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
                    "specs": {
                      "cpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      },
                      "gpu": {
                        "attached_gpus": 2,
                        "cuda_version": "12020",
                        "details": [
                          {
                            "bar1_memory_usage": {
                              "free": "249 MiB",
                              "total": "256 MiB",
                              "used": "6 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "8745 MiB",
                              "total": "10240 MiB",
                              "used": "1494 MiB"
                            },
                            "product_name": "NVIDIA 3080",
                            "status": "available"
                          },
                          {
                            "bar1_memory_usage": {
                              "free": "254 MiB",
                              "total": "256 MiB",
                              "used": "1 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "24257 MiB",
                              "total": "24576 MiB",
                              "used": "318 MiB"
                            },
                            "product_name": "NVIDIA 3090",
                            "status": "occupied"
                          }
                        ],
                        "driver_version": "535.113.01"
                      },
                      "memory": {
                        "free": "233.00 GiB",
                        "total": "251.00 GiB",
                        "used": "18.00 GiB"
                      },
                      "model": "amd64",
                      "storage": {
                        "free": "375.00 GiB",
                        "total": "410.00 GiB",
                        "used": "35.00 GiB"
                      },
                      "vcpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      }
                    },
                    "updated_at": "1712735774"
                  }
                ],
                "multi_address": "/ip4/38.140.46.60/tcp/8086",
                "name": "cp-2.44-2",
                "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
                "online": false,
                "payment_stats": {
                  "claimed_amount": null,
                  "claimed_count": 0,
                  "end_time": 1714092141,
                  "start_time": 1713487341,
                  "waiting_claim_count": 0
                },
                "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                "region": "Quebec-CA",
                "score": 100,
                "status": "Active",
                "updated_at": "1714061249"
              },
              "country": null,
              "name": "cp-2.44-2",
              "node_id": "04d5fce8dae0f493b35ae3e09aa9ba9fb9981ca8bb8c4c83d43eb23a6ff014e77ebab8e989265385571f2b34df7a6c1131a3aa713c9c9369027a73d57224e8b3c5",
              "region": "Quebec-CA",
              "uptime": 0.9725905402731051
            },
            {
              "city": "Montreal",
              "computer_provider": {
                "allowed_nodes": null,
                "autobid": 1,
                "city": "Montreal",
                "country": null,
                "created_at": "1712053635",
                "deleted_at": null,
                "job_stats": {
                  "end_time": 1714092141,
                  "failed": 0,
                  "start_time": 1713487341,
                  "submit_failed": 0,
                  "total_submit": 0
                },
                "last_active_at": null,
                "lat": 45.5075,
                "lon": -73.5887,
                "machines": [
                  {
                    "created_at": "1712053645",
                    "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                    "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
                    "specs": {
                      "cpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      },
                      "cpu_name": "",
                      "gpu": {
                        "attached_gpus": 2,
                        "cuda_version": "12020",
                        "details": [
                          {
                            "bar1_memory_usage": {
                              "free": "249 MiB",
                              "total": "256 MiB",
                              "used": "6 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "8745 MiB",
                              "total": "10240 MiB",
                              "used": "1494 MiB"
                            },
                            "product_name": "NVIDIA 3080",
                            "status": "available"
                          },
                          {
                            "bar1_memory_usage": {
                              "free": "254 MiB",
                              "total": "256 MiB",
                              "used": "1 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "24257 MiB",
                              "total": "24576 MiB",
                              "used": "318 MiB"
                            },
                            "product_name": "NVIDIA 3090",
                            "status": "occupied"
                          }
                        ],
                        "driver_version": "535.113.01"
                      },
                      "memory": {
                        "free": "233.00 GiB",
                        "total": "251.00 GiB",
                        "used": "18.00 GiB"
                      },
                      "model": "amd64",
                      "storage": {
                        "free": "375.00 GiB",
                        "total": "410.00 GiB",
                        "used": "35.00 GiB"
                      },
                      "vcpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      }
                    },
                    "updated_at": "1712132889"
                  }
                ],
                "multi_address": "/ip4/38.140.46.60/tcp/8086",
                "name": "cp-2.44-2",
                "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
                "online": false,
                "payment_stats": {
                  "claimed_amount": null,
                  "claimed_count": 0,
                  "end_time": 1714092141,
                  "start_time": 1713487341,
                  "waiting_claim_count": 0
                },
                "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                "region": "Quebec-CA",
                "score": 97,
                "status": "Active",
                "updated_at": "1714061249"
              },
              "country": null,
              "name": "cp-2.44-2",
              "node_id": "049d09a536d1ea95e7f863a8f93265913f4115ac4fb4d56cfcde051f3a78c7dc52cb1a6feb48e17690f0e98145e221c69262c0e3e7c3657caeaec7841a8d8104a3",
              "region": "Quebec-CA",
              "uptime": 0.9727884425094003
            },
            {
              "city": "Montreal",
              "computer_provider": {
                "allowed_nodes": null,
                "autobid": 1,
                "city": "Montreal",
                "country": null,
                "created_at": "1712137980",
                "deleted_at": null,
                "job_stats": {
                  "end_time": 1714092141,
                  "failed": 0,
                  "start_time": 1713487341,
                  "submit_failed": 0,
                  "total_submit": 0
                },
                "last_active_at": null,
                "lat": 45.5075,
                "lon": -73.5887,
                "machines": [
                  {
                    "created_at": "1712143229",
                    "machine_id": "70518000-5ab2-11eb-8000-18c04db4a530",
                    "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
                    "specs": {
                      "cpu": {
                        "free": "53",
                        "total": "96",
                        "used": "43"
                      },
                      "cpu_name": "AMD",
                      "gpu": {
                        "attached_gpus": 2,
                        "cuda_version": "12020",
                        "details": [
                          {
                            "bar1_memory_usage": {
                              "free": "249 MiB",
                              "total": "256 MiB",
                              "used": "6 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "8745 MiB",
                              "total": "10240 MiB",
                              "used": "1494 MiB"
                            },
                            "product_name": "NVIDIA 3080",
                            "status": ""
                          },
                          {
                            "bar1_memory_usage": {
                              "free": "254 MiB",
                              "total": "256 MiB",
                              "used": "1 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "24257 MiB",
                              "total": "24576 MiB",
                              "used": "318 MiB"
                            },
                            "product_name": "NVIDIA 3090",
                            "status": ""
                          }
                        ],
                        "driver_version": "535.113.01"
                      },
                      "memory": {
                        "free": "147 GiB",
                        "total": "251 GiB",
                        "used": "9 GiB"
                      },
                      "model": "",
                      "storage": {
                        "free": "128 GiB",
                        "total": "455 GiB",
                        "used": "304 GiB"
                      },
                      "vcpu": {
                        "free": "53",
                        "total": "96",
                        "used": "43"
                      }
                    },
                    "updated_at": "1712735051"
                  }
                ],
                "multi_address": "/ip4/38.140.46.60/tcp/8086",
                "name": "ubi-cp-24",
                "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
                "online": false,
                "payment_stats": {
                  "claimed_amount": null,
                  "claimed_count": 0,
                  "end_time": 1714092141,
                  "start_time": 1713487341,
                  "waiting_claim_count": 0
                },
                "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                "region": "Quebec-CA",
                "score": 98,
                "status": "Active",
                "updated_at": "1714061249"
              },
              "country": null,
              "name": "ubi-cp-24",
              "node_id": "04495c245fff4f0eb99ac3ee3e979af9b974c35d99798e97397afecdc0a495abf146f874ea0164ea2b815e43da4f0daffcf5481cbaface642d161ed1e3f579a484",
              "region": "Quebec-CA",
              "uptime": 0.9726894913912527
            },
            {
              "city": "Montreal",
              "computer_provider": {
                "allowed_nodes": null,
                "autobid": 1,
                "city": "Montreal",
                "country": null,
                "created_at": "1712735800",
                "deleted_at": null,
                "job_stats": {
                  "end_time": 1714092141,
                  "failed": 12,
                  "start_time": 1713487341,
                  "submit_failed": 7,
                  "total_submit": 40
                },
                "last_active_at": "1713938072",
                "lat": 45.5075,
                "lon": -73.5887,
                "machines": [
                  {
                    "created_at": "1712735811",
                    "machine_id": "315ae8c203ec4b3aa9bf7dd9bd96cec0",
                    "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
                    "specs": {
                      "cpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      },
                      "cpu_name": "",
                      "gpu": {
                        "attached_gpus": 2,
                        "cuda_version": "12020",
                        "details": [
                          {
                            "bar1_memory_usage": {
                              "free": "254 MiB",
                              "total": "256 MiB",
                              "used": "1 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "10007 MiB",
                              "total": "10240 MiB",
                              "used": "232 MiB"
                            },
                            "product_name": "NVIDIA 3080",
                            "status": "occupied"
                          },
                          {
                            "bar1_memory_usage": {
                              "free": "254 MiB",
                              "total": "256 MiB",
                              "used": "1 MiB"
                            },
                            "fb_memory_usage": {
                              "free": "24257 MiB",
                              "total": "24576 MiB",
                              "used": "318 MiB"
                            },
                            "product_name": "NVIDIA 3090",
                            "status": "available"
                          }
                        ],
                        "driver_version": "535.113.01"
                      },
                      "memory": {
                        "free": "237.00 GiB",
                        "total": "251.00 GiB",
                        "used": "14.00 GiB"
                      },
                      "storage": {
                        "free": "365.00 GiB",
                        "total": "410.00 GiB",
                        "used": "45.00 GiB"
                      },
                      "vcpu": {
                        "free": "79",
                        "total": "96",
                        "used": "17"
                      }
                    },
                    "updated_at": "1714092133"
                  }
                ],
                "multi_address": "/ip4/38.140.46.60/tcp/8086",
                "name": "cp-2.44-2",
                "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
                "online": true,
                "payment_stats": {
                  "claimed_amount": "246.89306",
                  "claimed_count": 19,
                  "end_time": 1714092141,
                  "start_time": 1713487341,
                  "waiting_claim_count": 7
                },
                "public_address": "0xFbc1d38a2127D81BFe3EA347bec7310a1cfa2373",
                "region": "Quebec-CA",
                "score": 100,
                "status": "Active",
                "updated_at": "1714080093"
              },
              "country": null,
              "name": "cp-2.44-2",
              "node_id": "0478a886cb6e191a0531fb6f8a7da4c0fbf0ec220af6d49e622f7e2da514f0ea205ed77918796c66ae642f0996dbf0ecc4bb7f1dd949705d1306abd1c14b60fb8a",
              "region": "Quebec-CA",
              "uptime": 0.9728793427694744
            }
          ]
        },
        "message": "cp data api returns successfully",
        "status": "success"
      }
      if (providerRes && providerRes.status === 'success') {
        pagin.total = providerRes.data.list_providers_cnt || 0
        providersData.value = await getList(providerRes.data.providers)
        ringGraphData.data = await resolveNodeTree(providerRes)
      } else {
        providersData.value = []
        cpLoad.value = false
        // if (providerRes.status) system.$commonFun.messageTip(providerRes.status, providerRes.message)
      }
      providersTableLoad.value = false
    }
    const changetype = () => {
      const machart_job = echarts.init(document.getElementById("chart-job"));
      const machart_reward = echarts.init(document.getElementById("chart-reward"));
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
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['Job Failed', 'Job Success'],
          right: document.documentElement.clientWidth >= 1280 ? '100px' : 'auto',
          top: document.documentElement.clientWidth >= 1280 ? '4%' : '25px',
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
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Job Failed',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            color: '#699bff'
          },
          {
            name: 'Job Success',
            type: 'bar',
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ],
            color: '#52ce7c'
          }
        ]
      }
      const option2 = {
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
        },
        legend: {
          data: ['Claimed Count', 'Waiting'],
          right: document.documentElement.clientWidth >= 1280 ? '100px' : 'auto',
          top: document.documentElement.clientWidth >= 1280 ? '4%' : '25px',
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
          type: 'value'
        },
        series: [
          {
            name: 'Claimed Count',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [120, 132, 101, 134, 90, 230, 210],
            color: '#699bff'
          },
          {
            name: 'Waiting',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [220, 182, 191, 234, 290, 330, 310],
            color: '#52ce7c'
          }
        ]
      }
      machart_job.setOption(option1);
      machart_reward.setOption(option2);
      window.addEventListener("resize", function () {
        machart_job.resize();
        machart_reward.resize();
      })
    }
    function resolveNodeTree (nodeData) {
      const res = {
        cpu_total: 0,
        gpu_total: 0,
        memory_total: 0,
        storage_total: 0,
        average_score_total: 0, //（所有score 加起来/node总数）
        failed_total: 0, //(job_stats.failed)
        submit_failed_total: 0, //(job_stats.submit_failed)
        total_failed: 0, //(job_stats.total_submit + job_stats.failed)
        total_success: 0, //(job_stats.total_submit - job_stats.failed)
        total_submit: 0, //(job_stats.total_submit + job_stats.submit_failed)
        claimed_count_total: 0, //(payment_stats.claimed_count )
        claimed_amount_total: 0, //(payment_stats.claimed_amount)
        waitng_total: 0, //(payment_stats.waiting_claim_count)
        claim_total: 0 //(payment_stats.claimed_count + payment_stats.waiting_claim_count)
      }
      let data = []
      let list_providers_cnt = 0
      if (nodeData && nodeData.data && nodeData.data.list_providers_cnt > 0) {
        list_providers_cnt = Number(nodeData.data.list_providers_cnt)
        data = nodeData.data.providers || []
      } else {
        return res
      }
      let memoryUnit = ''
      let storageUnit = ''
      data.forEach((item) => {
        if (!item.computer_provider) {
          return
        }
        res.average_score_total += Number(item.computer_provider.score || 0)
        // job_stats
        const job_stats = item.computer_provider.job_stats || {}
        res.failed_total += Number(job_stats.failed || 0)
        res.submit_failed_total += Number(job_stats.submit_failed || 0)
        res.total_failed += Number(job_stats.submit_failed || 0) + Number(job_stats.failed || 0)
        res.total_success += Number(job_stats.total_submit || 0) - Number(job_stats.failed || 0)
        res.total_submit += Number(job_stats.total_submit || 0) + Number(job_stats.submit_failed || 0)
        // payment_stats
        const payment_stats = item.computer_provider.payment_stats || {}
        res.claimed_count_total += Number(payment_stats.claimed_count || 0)
        res.claimed_amount_total += Number(payment_stats.claimed_amount || 0)
        res.waitng_total += Number(payment_stats.waiting_claim_count || 0)
        res.claim_total +=
          Number(payment_stats.claimed_count || 0) + Number(payment_stats.waiting_claim_count || 0)
        // machines
        const machines = item.computer_provider.machines || []
        machines.forEach((machine) => {
          if (!machine.specs) {
            return
          }
          // cpu
          res.cpu_total += machine.specs.cpu ? Number(machine.specs.cpu.total || 0) : 0
          // gpu
          res.gpu_total += machine.specs.gpu ? Number(machine.specs.gpu.attached_gpus || 0) : 0
          // memory
          const memoryList =
            machine.specs.memory && machine.specs.memory.total
              ? machine.specs.memory.total.split(' ')
              : []
          memoryUnit = memoryList[1] ? ` ${memoryList[1]}` : memoryUnit
          res.memory_total += Number(memoryList[0] || 0)
          // storage
          const storageList =
            machine.specs.storage && machine.specs.storage.total
              ? machine.specs.storage.total.split(' ')
              : []
          storageUnit = storageList[1] ? ` ${storageList[1]}` : storageUnit
          res.storage_total += Number(storageList[0] || 0)
        })
      })
      // add memory unit
      //res.memory_total += memoryUnit ? memoryUnit : 0
      // add storage unit
      //res.storage_total += storageUnit ? storageUnit : 0
      res.average_score_total = Number((res.average_score_total / list_providers_cnt).toFixed(2))
      return res
    }
    async function getGraphData (list) {
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
    async function getList (list) {
      let l = list || []
      l.forEach((element) => {
        element.gpu_list = []
        try {
          if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
            element.computer_provider.machines.forEach((machines) => {
              machines.MachineShow = true
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
    onActivated(async () => {
      reset('init')
      changetype()
      // getCpscore()
    })
    return {
      system,
      route,
      metaAddress,
      signature,
      providersLoad,
      providersTableLoad,
      providersData,
      providerBody,
      networkInput,
      pagin,
      small,
      background,
      accessToken, cpLoad, activeName, vmOperate, ringGraphData, weekList,
      handleSizeChange, handleCurrentChange, searchProvider, handleSelect,
      hardClose
    }
  }
})
</script>

<style lang="less" scoped>
#cp-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .copy-style {
    cursor: pointer;
    flex-wrap: wrap;
    svg {
      margin: 0 0 0 0.05rem;
    }
  }
  :deep(.header-title) {
    padding: 0.15rem 0 0.2rem;
    margin: 0 0 0.07rem;
    border-bottom: 1px solid #858586;
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
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .s {
      height: calc(100% - 0.4rem) !important;
      margin: 0 !important;
    }
    .providers {
      margin: 0.08rem 0 0.18rem;
    }
    .providers-cp {
      height: calc(100% - 0.8rem);
      padding: 0.3rem 0.35rem 0.1rem;
      margin: 0.4rem 0 0;
      background-color: @white-color;
      border-radius: 0.2rem;
      .name-title {
        color: #000;
        text-transform: capitalize;
        cursor: text;
        a {
          padding: 0.07rem 0.14rem;
          margin: 0 0 0 0.14rem;
          background-color: @theme-color;
          border-radius: 0.5rem;
          color: @white-color;
          line-height: 1;
        }
        .is-disabled {
          opacity: 0.8;
          cursor: no-drop;
        }
      }
      .note {
        .el-row {
          margin: 0.1rem 0;
          .el-col {
            margin: 0.08rem 0;
            p {
              color: #000;
              &.color {
                color: @theme-color;
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
            .collateral {
              padding: 0.05rem 0.12rem 0.03rem;
              margin: 0 0 0.1rem;
              background-color: @theme-color;
              border-radius: 0.2rem;
              color: @white-color;
              line-height: 1;
              cursor: pointer;
              &.m {
                margin: 0;
              }
              &.is-disabled {
                opacity: 0.8;
                cursor: no-drop;
              }
              &.b-ecp,
              &.b-fcp {
                margin: 0;
                background-color: #52ce7c;
                border-radius: 0.04rem;
                &.b-fcp {
                  background-color: #699bff;
                }
              }
            }
          }
        }
      }
    }
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
        .module-container {
          position: relative;
          width: calc(100% - 0.64rem);
          height: calc(100% - 0.5rem);
          padding: 0.25rem 0.32rem;
          background-color: @white-color;
          border-radius: 0.14rem;
          &.world {
            background-color: @theme-color;
            .title {
              color: @white-color;
            }
          }
          .el-col {
            margin: 0;
          }
          .title {
            margin: 0;
            .subtitle {
              margin: 0 0 0 0.35rem;
              color: #7c889b;
            }
          }
          .grid-content {
            height: calc(100% - 0.53rem);
            margin: 0.23rem 0 0;
            background: #edf2ff;
          }
        }
        .title-link {
          margin: auto;
          line-height: 1;
        }
        .grid-content {
          position: relative;
          width: calc(100% - 0.28rem);
          height: calc(100% - 0.3rem);
          padding: 0.18rem 0.14rem 0.12rem;
          background: @white-color;
          border-radius: 0.18rem;
          // box-shadow: 0 0 12px #e6e7eb;
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
        .chart-trends {
          width: 100%;
          margin: -0.3rem auto 0;
          height: 2.3rem;
          @media screen and (max-width: 768px) {
            height: 300px;
          }
        }
      }
    }
    .search-body {
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0 0 0.2rem;
      .el-tabs {
        width: 100%;
        .el-tabs__header {
          padding: 0;
          margin: 0;
          .el-tabs__active-bar,
          .el-tabs__nav-wrap:after {
            display: none;
          }
          .el-tabs__nav {
            .el-tabs__item {
              height: auto;
              padding: 0.08rem 0.13rem;
              margin: 0 0.15rem 0 0;
              background-color: #f3f4f8;
              border: 1px solid #ced4e1;
              border-radius: 0.5rem;
              color: #313132;
              line-height: 1.1;
              &.is-active {
                background-color: #edf2ff;
                border-color: #8eb0ff;
                color: @theme-color;
              }
            }
          }
          .el-tabs__nav-next,
          .el-tabs__nav-prev {
            line-height: 24px;
          }
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
      margin: 0;
      font-size: inherit;
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
