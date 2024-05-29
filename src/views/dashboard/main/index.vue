<template>
  <section id="main-container">
    <div class="flex-row space-between header-title">
      <h1 class="font-24 font-bold">Swan Provider Overview</h1>
      <!-- <div class="font-18">
        Use this status page to check an Swan Provider information and status.
        <br> This list is refreshed every 5 minutes. Below snapshot taken at
        <span class="color">{{gmtTime}}</span>
      </div> -->

      <a :href="system.$explorerLink" target="_blank" class="flex-row font-18">
        Swan Proxima Chain explorer
        <i></i>
      </a>
    </div>

    <div class="providers-overview">
      <el-row :gutter="42">
        <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13" class="flex-row baseline">
          <div class="module-container">
            <div class="title flex-row">
              <i class="icon icon-figures"></i>
              <span class="font-16 weight-4">Provider Figures</span>
            </div>

            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane name="Overview">
                <template #label>
                  <span class="font-14">Overview Data</span>
                </template>
                <el-row :gutter="18">
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Active FCP Number</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Active ECP numbers</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total ZK tasks</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Applications</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total GPU hours</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total ZK rewards (SWAN)</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="span font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="FCP">
                <template #label>
                  <span class="font-14">FCP Summary</span>
                </template>
                <el-row :gutter="18">
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Active FCP Number</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Active Applications</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Deployments</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total jobs</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total running jobs</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total GPU hours</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total CPU hours</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="ECP">
                <template #label>
                  <span class="font-14">ECP Summary</span>
                </template>
                <el-row :gutter="18">
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Active ECP Number</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total ZK rewards (SWAN)</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total ZK tasks</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">GPU ZK task</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">CPU ZK task</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Verified ZK task</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center flex-row nowrap">
                        <el-select v-model="AvgZKRewards.value" placeholder="Select" size="small">
                          <el-option v-for="item in AvgZKRewards.options" :key="item.value" :label="item.value" :value="item.value">
                            <div class="font-14">{{item.value}}</div>
                          </el-option>
                        </el-select>
                        Avg ZK rewards
                      </h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="Swan">
                <template #label>
                  <span class="font-14">Swan Proxima Chain</span>
                </template>
                <el-row :gutter="18">
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Addresses</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Contracts(24H)</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                      <h6 class="font-12 weight-4 text-right t">24h change</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Transactions Today</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Transactions</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                    <div class="grid-content">
                      <h6 class="font-12 weight-4 text-center">Total Accounts</h6>
                      <b v-loading="providersLoad" class="flex-row center font-30 weight-4 text-center">
                        {{providerBody.totalData.smart_contracts?system.$commonFun.replaceFormat(providerBody.totalData.smart_contracts):'-'}}
                      </b>
                      <h6 class="font-22 weight-4 text-right t" :class="{'up': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h>=0,'down': providerBody.totalData.new_smart_contracts_24h&&providerBody.totalData.new_smart_contracts_24h<0}">{{providerBody.totalData.new_smart_contracts_24h?providerBody.totalData.new_smart_contracts_24h>=0?'+':'-':''}}{{system.$commonFun.replaceFormat(providerBody.totalData.new_smart_contracts_24h)}}</h6>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11" class="flex-row baseline">
          <div class="module-container world">
            <div class="title flex-row">
              <i class="icon icon-world"></i>
              <span class="font-16 weight-4">Location Overview</span>
            </div>
            <div class='chart-world' id='chart-world' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="module-container">
            <div class="title flex-row">
              <i class="icon icon-gpu"></i>
              <span class="font-16 weight-4">GPU</span>
            </div>
            <div class='chart-trends' id='chart-GPU' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
              <i class="icon icon-provider"></i>
              <span class="font-16 weight-4">Fog Computing Provider</span>
            </div>
            <div class='chart-trends' id='chart-Fog' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
              <i class="icon icon-resource"></i>
              <span class="font-16 weight-4">Resource</span>
            </div>
            <div class='chart-trends' id='chart-Resource' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
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
              <i class="icon icon-provider"></i>
              <span class="font-16 weight-4">Edge Computing Provider</span>
            </div>
            <div class='chart-trends' id='chart-Edge' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
            <div class="date">
              <el-select v-model="weekList.value" placeholder="Select" size="small">
                <el-option v-for="item in weekList.options" :key="item.value" :label="item.label" :value="item.value">
                  <div class="font-14">{{item.label}}</div>
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="m">
          <div class="module-container font-16">
            <div class="title flex-row space-between">
              <div class="flex-row">
                <i class="icon icon-provider"></i>
                <span class="font-16 weight-4">FCP List</span>
              </div>
              <router-link :to="{name: 'rankingsFCP'}" class="font-13 flex-row">more &nbsp;
                <small>&gt;&gt;</small>
              </router-link>
            </div>
            <el-table :data="providersData" empty-text="No Data" v-loading="providersTableLoad">
              <el-table-column type="index" width="70">
                <template #header>
                  <div class="font-18 weight-4">Ranking</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" min-width="120">
                <template #header>
                  <div class="font-18 weight-4">Name</div>
                </template>
                <template #default="scope">
                  <div class="name-style" @click="handleCP(scope.row)">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="computer_provider.active_deployment" sortable min-width="170">
                <template #header>
                  <div class="font-18 weight-4">Active deployment</div>
                </template>
              </el-table-column>
              <el-table-column prop="computer_provider.score" width="80">
                <template #header>
                  <div class="font-18 weight-4">Score</div>
                </template>
              </el-table-column>
              <el-table-column prop="uptime" width="80">
                <template #header>
                  <div class="font-18 weight-4">Uptime</div>
                </template>
                <template #default="scope">
                  <div>
                    {{system.$commonFun.unifyNumber(scope.row.uptime)}}%
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="m">
          <div class="module-container font-16">
            <div class="title flex-row space-between">
              <div class="flex-row">
                <i class="icon icon-provider"></i>
                <span class="font-16 weight-4">ECP List</span>
              </div>
              <router-link :to="{name: 'rankingsECP'}" class="font-13 flex-row">more &nbsp;
                <small>&gt;&gt;</small>
              </router-link>
            </div>
            <!-- providerBody.ubiTableData -->
            <el-table :data="providersData" empty-text="No Data" v-loading="providersTableLoad">
              <el-table-column type="index" width="70">
                <template #header>
                  <div class="font-18 weight-4">Ranking</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" min-width="120">
                <template #header>
                  <div class="font-18 weight-4">Name</div>
                </template>
                <template #default="scope">
                  <div class="name-style" @click="handleCP(scope.row)">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="status" min-width="90" column-key="status" filterable :filters="[
                      { text: 'Online', value: 'Online' },
                      { text: 'Suspended', value: 'Suspended' },
                      { text: 'Offline', value: 'Offline' }
                    ]" filter-placement="bottom-end" :filter-multiple="false">
                <template #header>
                  <div class="font-18 weight-4">status</div>
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
              <el-table-column prop="task" width="120">
                <template #header>
                  <div class="font-18 weight-4">Completed(%)</div>
                </template>
                <template #default="scope">
                  <div>
                    {{system.$commonFun.fixedformat(scope.row.completion_rate,10000)}}%
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, onActivated, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  CircleCheck, DocumentCopy, Avatar
} from '@element-plus/icons-vue'
import * as echarts from "echarts"
import worldGeoJSON from '@/assets/js/world.json'

export default defineComponent({
  components: {
    CircleCheck, DocumentCopy, Avatar
  },
  setup () {
    const store = useStore()
    const metaAddress = computed(() => (store.state.metaAddress))
    const accessToken = computed(() => (store.state.accessToken))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const gmtTime = new Date().toGMTString()
    const providersLoad = ref(false)
    const providersTableLoad = ref(false)
    const providersData = ref([])
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
    const providerBody = reactive({
      data: {},
      ubiData: {},
      ubiTableData: {},
      totalData: {
        gas_used_today: '',
        total_addresses: '',
        total_blocks: '',
        total_gas_used: '',
        total_transactions: '',
        transactions_today: '',
        smart_contracts: '',
        new_smart_contracts_24h: ''
      },
      storageData: {},
      providerData: {},
      generalData: {},
      collapse: {
        general: true,
        zk: true,
        total: true,
        provider: true
      }
    })
    const networkInput = ref('')
    const networkZK = reactive({
      owner_addr: '',
      node_id: ''
    })
    const small = ref(false)
    const background = ref(false)
    const dataArr = ref([])
    const expands = ref([])
    const activeName = ref('Overview')
    const cpLoad = ref(false)
    const AvgZKRewards = reactive({
      value: 'Daily',
      options: [
        {
          value: 'Daily'
        },
        {
          value: 'Weekly'
        },
        {
          value: 'Monthly'
        },
        {
          value: 'Yearly'
        }]
    })
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
      providersTableLoad.value = false
    }
    async function getUBITable () {
      providersTableLoad.value = true
      const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
      const params = {
        page_size: paginZK.pageSize,
        page_no: page,
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
    async function getUBITotal () {
      const statsRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_UBI}stats`, 'get')
      if (statsRes && statsRes.code === 0) {
        providerBody.ubiData = statsRes.data || {}
      } else providerBody.ubiData = {}
    }
    async function getTotal () {
      const statsRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_STATS}v2/stats`, 'get')
      if (statsRes) {
        providerBody.totalData.gas_used_today = statsRes.gas_used_today || ''
        providerBody.totalData.total_addresses = statsRes.total_addresses || ''
        providerBody.totalData.total_blocks = statsRes.total_blocks || ''
        // providerBody.totalData.total_gas_used = statsRes.total_gas_used || ''
        providerBody.totalData.total_transactions = statsRes.total_transactions || ''
        providerBody.totalData.transactions_today = statsRes.transactions_today || ''
      }
    }
    async function getCounters () {
      const statsRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_STATS}v2/smart-contracts/counters`, 'get')
      if (statsRes) {
        providerBody.totalData.new_smart_contracts_24h = statsRes.new_smart_contracts_24h || ''
        providerBody.totalData.smart_contracts = statsRes.smart_contracts || ''
      }
    }
    async function getOverview () {
      providersLoad.value = true
      const overviewRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}cp/overview`, 'get')
      if (overviewRes && overviewRes.status === 'success') {
        pagin.total_deployments = overviewRes.data.total_deployments
        pagin.active_applications = overviewRes.data.active_applications
        providerBody.data = overviewRes.data || {}
        dataArr.value = overviewRes.data.map_info
        drawChart(dataArr.value)
        changetype()
      }
      providersLoad.value = false
    }
    async function getStorageStats () {
      const storageRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_FILSWANSTATS}stats/storage`, 'get')
      if (storageRes && storageRes.status === "success") providerBody.storageData = storageRes.data || {}
    }
    async function getProviderStats () {
      const providerRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_FILSWANSTATS}stats/provider`, 'get')
      if (providerRes && providerRes.status === "success") providerBody.providerData = providerRes.data || {}
    }
    async function getGeneralStats () {
      const generalRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}stats/general`, 'get')
      if (generalRes && generalRes.status === "success") providerBody.generalData = generalRes.data || {}
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
      networkInput.value = ''
      networkZK.owner_addr = ''
      networkZK.node_id = ''
      if (activeName.value === 'ZK-CP') {
        paginZK.pageNo = 1
        getUBITable()
      } else {
        pagin.pageSize = 10
        pagin.pageNo = 1
        init()
      }
    }
    function expandChange (row, expandedRows) {
      // console.log(row, expandedRows)
      if (expandedRows.length) {
        expands.value = [];
        if (row) expands.value.push(row.node_id);
      } else expands.value = [];
    }
    let getRowKeys = (row) => {
      return row.node_id;
    }
    function reset (type) {
      pagin.total = 0
      pagin.total_deployments = 0
      pagin.active_applications = 0
      pagin.pageSize = 10
      pagin.pageNo = 1
      providersData.value = []
      providerBody.ubiTableData = []
      providersLoad.value = false
      providersTableLoad.value = false
      networkInput.value = ''
      networkZK.owner_addr = ''
      networkZK.node_id = ''
      if (type) init()
      getOverview()
      getUBITotal()
      getUBITable()
      getTotal()
      getCounters()
      getStorageStats()
      getProviderStats()
      getGeneralStats()
    }
    function drawChart (dataArr) {
      let chart = echarts.init(document.getElementById('chart-world'))
      window.addEventListener('resize', function () {
        chart.resize()
      })
      chart.setOption({
        roam: true,
        grid: {
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        toolbox: {
          orient: 'vertical',
          top: '2%',
          right: '2%',
          feature: {
            dataZoom: { show: false },
            restore: {
              show: true,
              textStyle: {
                color: 'transparent' // 文字颜色设置为透明
              },
              iconStyle: {
                borderColor: '#fff', // 边框颜色
                borderWidth: 2, // 边框宽度
                color: 'transparent' // 填充颜色
              },
              emphasis: {
                iconStyle: {
                  borderColor: '#fff', // 边框颜色
                  borderWidth: 2, // 边框宽度
                  color: 'transparent' // 填充颜色
                }
              }
            },
          },
          textStyle: {
            color: '#fff',
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function (val) {
            if (val.data && val.data.city) return val.data.city
            else return val.name
          },
          // show: false,
          padding: 5,
          textStyle: {
            fontSize: 8,
            lineHeight: 10,
            align: "left"
          }
        },
        legend: {
          orient: 'vertical',
          left: '0',
          bottom: '0',
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
          icon: 'roundRect',
          // 图例标签的格式器，可以定制文本
          // formatter: function (name) {
          //     return echarts.format.truncateText(name, 50);
          // },
          // 图例文本样式
          textStyle: {
            color: '#fff',
            fontSize: 11,
            fontFamily: 'HELVETICA-ROMAN',
            // lineHeight: 14,
            rich: {
              a: {
                verticalAlign: 'middle',
              },
            },
            padding: [0, 0, -2, -1]
          }
        },
        geo: {
          show: true,
          map: 'worldHq',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // aspectScale: 0.75,
          // roam: true, // 开启拖拽和缩放
          // zoom: 1.2,
          toolbox: {
            show: true,
            feature: {
              // 启用缩放工具
              dataZoom: {
                yAxisIndex: 'none'
              },
              // 启用还原工具
              restore: {},
              // 启用拖拽平移工具
              move: {}
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#b6ceff',
              borderColor: '#9bbbff'
            },
            // emphasis: {
            //   areaColor: '#a467d1',
            //   label: {
            //     show: false
            //   }
            // }
          },
          emphasis: {
            focus: 'none'
          },
          silent: true
          // left: '5%',
          // right: '5%'
        },
        series: [
          {
            name: 'FCP',
            type: 'scatter',
            coordinateSystem: 'geo',
            itemStyle: {
              // borderWidth: 1,
              // borderColor: '#fff',
              // color: 'rgba(89, 152, 14, 1)',
              color: '#9a5aff',
              shadowBlur: 2,
              shadowColor: '#7ca3fb'
            },
            data: [
              {
                "city": "阿尔及利亚",
                "value": [
                  -178.535,
                  35.8639
                ]
              },
              {
                "city": "阿尔及利亚111",
                "value": [
                  78.535,
                  -35.8639
                ]
              }],
            roam: true,
            symbolSize: 8,
            zlevel: 1
          },
          {
            name: 'ECP',
            type: 'scatter',
            coordinateSystem: 'geo',
            itemStyle: {
              // borderWidth: 1,
              // borderColor: '#fff',
              // color: 'rgba(89, 152, 14, 1)',
              color: '#bbff00',
              shadowBlur: 2,
              shadowColor: '#7ca3fb'
            },
            data: dataArr,
            roam: true,
            symbolSize: 8,
            zlevel: 1
          },
          // {
          //   name: 'world',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   itemStyle: {
          //     // borderWidth: 1,
          //     // borderColor: '#fff',
          //     // color: 'rgba(89, 152, 14, 1)',
          //     color: '#cf3cc9',
          //     shadowBlur: 2,
          //     shadowColor: '#7ca3fb'
          //   },
          //   data: [{
          //       "name": "阿尔及利亚",
          //       "value": 8441.537
          //   },
          //   {
          //       "name": "阿根廷",
          //       "value": 40374.224
          //   }],
          //   roam: true,
          //   symbolSize: 8,
          //   zlevel: 1
          // }
        ]
      })
    }
    const changetype = () => {
      const machart_resource = echarts.init(document.getElementById("chart-Resource"));
      const machart_fog = echarts.init(document.getElementById("chart-Fog"));
      const machart_gpu = echarts.init(document.getElementById("chart-GPU"));
      const machart_edge = echarts.init(document.getElementById("chart-Edge"));
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
          data: ['CPU', 'Memory', 'Storage'],
          left: document.documentElement.clientWidth >= 1280 ? '150px' : 'auto',
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
          left: '0',
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
          interval: 50
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [10, 13, 11, 34, 90, 30, 20],
            color: '#699bff'
          },
          {
            name: 'Memory',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [20, 12, 19, 24, 29, 33, 31],
            color: '#52ce7c'
          },
          {
            name: 'Storage',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [15, 23, 20, 15, 19, 30, 41],
            color: '#0046b7'
          }
        ]
      }
      const option2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
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
              result += colorDot + item.seriesName + ': ' + item.value + '<br/>'; // 系列名和对应的值
            });
            return result;
          }
        },
        grid: {
          left: '0',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['FCP', 'Delta'],
          right: document.documentElement.clientWidth >= 1280 ? '150px' : 'auto',
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
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: 'FCP',
            // min: 0,
            // max: 240,
            // interval: 80,
            // axisLabel: {
            //   formatter: '{value}'
            // }
            minInterval: 150
          },
          {
            type: 'value',
            // name: 'Changes',
            // min: 0,
            // max: 24,
            // interval: 8,
            // axisLabel: {
            //   formatter: '{value}'
            // }
          }
        ],
        series: [
          {
            name: 'FCP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              color: 'rgba(105,155,255,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(105,155,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(105,155,255,0.3)'
                }
              ])
            },
            data: [220, 172, 141, 94, 120, 130, 110]
          },
          {
            name: 'Delta',
            type: 'line',
            smooth: true,
            showSymbol: false,
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' °C';
            //   }
            // },
            color: '#52ce7c',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      const option3 = {
        // title: {
        //   left: '2%',
        //   text: 'GPU',
        //   textStyle: {
        //     color: '#000',
        //     fontStyle: 'normal',
        //     fontWeight: '400',
        //     fontFamily: 'HELVETICA-ROMAN',
        //     fontSize: 15
        //   }
        // },
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
              result += colorDot + item.seriesName + ' 23Used 26Free' + '<br/>'; // 系列名和对应的值
            });
            return result;
          }
        },
        legend: {
          data: ['GPU'],
          left: document.documentElement.clientWidth >= 1280 ? '150px' : 'auto',
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
          left: '0',
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
            name: 'GPU',
            type: 'line',
            showSymbol: false,
            color: '#93c605',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      const option4 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
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
              result += colorDot + item.seriesName + ': ' + item.value + '<br/>'; // 系列名和对应的值
            });
            return result;
          }
        },
        grid: {
          left: '0',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['ECP', 'Delta'],
          right: document.documentElement.clientWidth >= 1280 ? '150px' : 'auto',
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
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: 'ECP',
            // min: 0,
            // max: 1500,
            // interval: 750,
            // axisLabel: {
            //   formatter: '{value}'
            // }
            minInterval: 150
          },
          {
            type: 'value',
            // name: 'Changes',
            // min: 0,
            // max: 150,
            // interval: 75,
            // axisLabel: {
            //   formatter: '{value}'
            // }
          }
        ],
        series: [
          {
            name: 'ECP',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              color: 'rgba(147,198,5,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(147,198,5,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(147,198,5,0.3)'
                }
              ])
            },
            data: [220, 172, 141, 94, 120, 130, 110]
          },
          {
            name: 'Delta',
            type: 'line',
            smooth: true,
            showSymbol: false,
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' °C';
            //   }
            // },
            color: '#0046b7',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      machart_resource.setOption(option1);
      machart_fog.setOption(option2);
      machart_gpu.setOption(option3);
      machart_edge.setOption(option4);
      window.addEventListener("resize", function () {
        machart_resource.resize();
        machart_fog.resize();
        machart_gpu.resize();
        machart_edge.resize();
      })
      cpLoad.value = false
    }
    const handleClick = async (tab, event) => {
      // activeName.value = tab.props.name || 'CP'
      // cpLoad.value = true
      // await system.$commonFun.timeout(500)
    }
    function handleCP (row) {
      router.push({ name: 'accountInfo' })
    }
    onActivated(async () => {
      echarts.registerMap('worldHq', worldGeoJSON)
      reset('init')
    })
    return {
      system,
      route,
      metaAddress,
      gmtTime,
      providersLoad,
      providersTableLoad,
      providersData,
      networkInput,
      networkZK,
      pagin,
      paginZK,
      small,
      background,
      providerBody,
      accessToken, expands, activeName, cpLoad, AvgZKRewards, weekList,
      handleSizeChange, handleCurrentChange, handleZKCurrentChange, searchProvider, searchZKProvider, clearProvider,
      expandChange, getRowKeys, handleClick, handleCP
    }
  }
})
</script>

<style lang="less" scoped>
#main-container {
  padding: 0 0 0.4rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .header-title {
    padding: 0.1rem 0;
    border-bottom: 1px solid #858586;
    line-height: 1.15;
    h1 {
      margin: 0 0.3rem 0 0;
    }
    a {
      padding: 0.07rem 0.1rem;
      margin: 0 0 0 0.1rem;
      color: @theme-color;
      i {
        width: 0.25rem;
        height: 0.25rem;
        margin: 0 0 0 0.12rem;
        background: url(../../../assets/images/icons/icon-01.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  :deep(.el-button) {
    border: 0;
    border-radius: 0.08rem;
    background: linear-gradient(45deg, #025bd5, #3c73ec);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-family: inherit;
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview) {
    padding: 0;
    .title {
      width: 100%;
      margin: 0 0 0.1rem;
      a {
        margin: 0 0 0 0.1rem;
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
        margin: 0.22rem 0;
        &.flex-row {
          display: flex;
        }
        &.m {
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
            .icon {
              width: 0.24rem;
              height: 0.24rem;
              margin: 0 0.09rem 0 0;
              &.icon-world {
                background: url(../../../assets/images/icons/icon-05.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-figures {
                background: url(../../../assets/images/icons/icon-04.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-gpu {
                background: url(../../../assets/images/icons/icon-08.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-resource {
                background: url(../../../assets/images/icons/icon-06.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-provider {
                background: url(../../../assets/images/icons/icon-07.png)
                  no-repeat;
                background-size: 100%;
              }
              &.icon-list {
                background: url(../../../assets/images/icons/icon-09.png)
                  no-repeat;
                background-size: 100%;
              }
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
          height: calc(100% - 0.3rem);
          padding: 0.18rem 0.14rem 0.12rem;
          background: @white-color;
          border-radius: 0.18rem;
          // box-shadow: 0 0 12px #e6e7eb;
        }
        h6 {
          width: 100%;
          line-height: 1.2;
          text-transform: capitalize;
          color: #7c889b;
          &.t {
            width: auto;
            padding: 0.03rem 0.16rem 0;
          }
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
          padding: 0.1rem 0 0;
          margin: 0;
          line-height: 1;
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
        .el-table {
          width: 100%;
          margin: 0.24rem auto 0.2rem;
          background-color: transparent;
          font-size: inherit;
          border-radius: 0.1rem;
          border: 1px solid #e3e7ee;
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
              border-color: #e3e7ee;
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
        .chart-trends {
          width: 100%;
          margin: -0.3rem auto 0;
          height: 2.3rem;
          @media screen and (max-width: 768px) {
            height: 300px;
          }
        }
        .chart-world {
          width: 100%;
          margin: 0 auto;
          height: 3.15rem;
          @media screen and (max-width: 768px) {
            height: 300px;
          }
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
          width: 100%;
          .el-tabs__header {
            padding: 0.22rem 0 0;
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
    }
    .search-body {
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0.24rem 0 0;
      .el-input {
        width: 50%;
        margin: 0 0.2rem 0 0;
        &.zk-input {
          width: 30%;
        }
        .el-input__wrapper {
          background-color: rgb(21, 23, 28);
          border: 1px solid rgb(38, 39, 47);
          border-radius: 0.1rem;
          box-shadow: none;
          .el-input__inner {
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #d1d1d1;
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
        font-family: inherit;
        &.el-button--primary {
          background-color: #7405ff;
          border-color: #7405ff;
        }
        &:hover,
        &.is-disabled {
          opacity: 0.9;
        }
      }
    }
    .el-table {
      margin: 0.24rem auto;
      background-color: transparent;
      border-radius: 0.1rem;
      border: 1px solid rgb(30, 32, 39);
      tr {
        background-color: transparent;
        th {
          word-break: break-word;
          padding: 0.1rem 0;
          background-color: @primary-color;
          border: 0;
          .cell {
            color: @text-color;
            word-break: break-word;
            @media screen and (max-width: 540px) {
              font-size: 12px;
              line-height: 1.1;
            }
          }
        }
        td {
          padding: 0.16rem 0;
          background-color: @primary-color;
          color: rgb(181, 183, 200);
          border-color: rgb(38, 39, 47);
          @media screen and (max-width: 540px) {
            font-size: 12px;
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
      justify-content: flex-end;
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
