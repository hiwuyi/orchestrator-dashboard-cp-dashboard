<template>
  <div class="aside">
    <div @click="isCollapse = !isCollapse" class="flex-row center collapse-button" :class="{'flex-end': !isCollapse}">
      <i class="icon icon-collapse"></i>
    </div>
    <el-menu :default-active="activeIndex" :collapse="isCollapse" :collapse-transition="false" class="el-menu-vertical-demo" @select="handleSelect" background-color="#fff" text-color="#000">
      <el-menu-item index="overview">
        <i class="icon icon-Overview"></i>
        <template #title>
          <span class="font-16">Overview</span>
        </template>
      </el-menu-item>
      <el-menu-item index="rankings-fcp">
        <i class="icon icon-Rankings-fcp"></i>
        <template #title>
          <span class="font-16">FCP List</span>
        </template>
      </el-menu-item>
      <el-menu-item index="rankings-ecp">
        <i class="icon icon-Rankings-ecp"></i>
        <template #title>
          <span class="font-16">ECP List</span>
        </template>
      </el-menu-item>
      <el-menu-item index="accountInfo" v-if="metaAddress && accessToken">
        <i class="icon icon-AccountInfo"></i>
        <template #title>
          <span class="font-16">CP Profile</span>
        </template>
      </el-menu-item>
      <el-menu-item index="resource">
        <i class="icon icon-Resource"></i>
        <template #title>
          <span class="font-16">Resource</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="aar">
        <template #title>
          <i class="icon icon-AAR"></i>
          <span class="font-16">Atom Accelerator Race
            <i class="icon icon-new"></i>
          </span>
        </template>
        <el-menu-item index="aar-fcp">
          <span class="font-16">FCP Ranking</span>
        </el-menu-item>
        <el-menu-item index="aar-ecp">
          <span class="font-16">ECP Ranking</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script>
import { defineComponent, computed, onMounted, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth < 992)
    const system = getCurrentInstance().appContext.config.globalProperties
    const metaAddress = computed(() => (store.state.metaAddress))
    const accessToken = computed(() => (store.state.accessToken))
    const route = useRoute()
    const router = useRouter()
    const activeIndex = ref('overview')
    const isCollapse = ref(false)

    const handleSelect = (key, keyPath) => {
      // console.log('handleOpen', key)
      if (key === 'overview') router.push({ path: '/overview' })
      else if (key === 'rankings-fcp') router.push({ name: 'rankingsFCP' })
      else if (key === 'rankings-ecp') router.push({ name: 'rankingsECP' })
      else if (key === 'aar-fcp') router.push({ name: 'aarFCP' })
      else if (key === 'aar-ecp') router.push({ name: 'aarECP' })
      else if (key === 'accountInfo') router.push({ name: 'accountInfo', params: { type: 'FCP' } })
      else if (key === 'resource') router.push({ name: 'resource' })
    }
    async function activeMenu (row) {
      const nameMenu = row || route.name
      const nameType = route.params.type || ''
      if (nameMenu.indexOf('overview') > -1 || nameMenu.indexOf('dashboard') > -1) activeIndex.value = 'overview'
      else if (nameMenu.indexOf('rankingsFCP') > -1 || nameMenu.indexOf('rankings/FCP') > -1) activeIndex.value = 'rankings-fcp'
      else if (nameMenu.indexOf('rankingsECP') > -1 || nameMenu.indexOf('rankings/ECP') > -1) activeIndex.value = 'rankings-ecp'
      else if (nameMenu.indexOf('aarFCP') > -1 || nameMenu.indexOf('aar/FCP') > -1) activeIndex.value = 'aar-fcp'
      else if (nameMenu.indexOf('aarECP') > -1 || nameMenu.indexOf('aar/ECP') > -1) activeIndex.value = 'aar-ecp'
      else if (nameMenu.indexOf('accountInfo') > -1 || nameMenu.indexOf('cp-profile') > -1) activeIndex.value = 'accountInfo'
      else if (nameMenu.indexOf('resource') > -1) activeIndex.value = 'resource'
      else activeIndex.value = nameMenu

      // const chainId = await system.$commonFun.web3Init.eth.net.getId()
      // const { unit, name, url } = await system.$commonFun.getUnit(chainId)
      // info.network = name || `Chain ID: ${chainId}`
      // info.unit = unit
      // info.url = url || ''
      // console.log(activeIndex.value, nameMenu)
    }
    onMounted(() => {
      activeMenu()
    })
    watch(route, (to, from) => {
      activeMenu(to.path)
      window.scrollTo(0, 0)
    })
    return {
      activeIndex,
      metaAddress,
      accessToken,
      isCollapse,
      handleSelect
    }
  },
  components: {}
})
</script>
<style  lang="less" scoped>
.aside {
  position: relative;
  line-height: 1.2;
  .icon {
    width: 0.24rem;
    height: 0.24rem;
    &.icon-collapse {
      background: url(../assets/images/menu-collapse.png) no-repeat;
      background-size: 100%;
    }
    &.icon-Overview {
      background: url(../assets/images/menu-01.png) no-repeat;
      background-size: 100%;
    }
    &.icon-Rankings-fcp {
      background: url(../assets/images/menu-03.png) no-repeat;
      background-size: 100%;
    }
    &.icon-Rankings-ecp {
      background: url(../assets/images/menu-02.png) no-repeat;
      background-size: 100%;
    }
    &.icon-AccountInfo {
      background: url(../assets/images/menu-04.png) no-repeat;
      background-size: 100%;
    }
    &.icon-Resource {
      background: url(../assets/images/menu-05.png) no-repeat;
      background-size: 100%;
    }
    &.icon-AAR {
      background: url(../assets/images/menu-06.png) no-repeat;
      background-size: 100%;
    }
    &.icon-new {
      display: inline-block;
      width: 0.35rem;
      height: 0.15rem;
      margin: 0.03rem 0 0;
      background: url(../assets/images/new.png) no-repeat center;
      background-size: auto 100%;
    }
  }
  .collapse-button {
    margin: 0.1rem 0 0.4rem;
    cursor: pointer;
  }
  :deep(.el-menu) {
    border: 0;
    &.el-menu--collapse {
      width: 0.45rem;
      .el-menu-item,
      .el-sub-menu .el-sub-menu__title {
        padding: 0.09rem 0;
        border: 0;
        border-radius: 0.12rem;
        // span {
        //   display: none;
        // }
        // .icon {
        //   margin: auto;
        // }
        .el-tooltip__trigger {
          position: relative;
          display: flex;
          padding: 0;
          justify-content: center;
        }
      }
      .el-sub-menu {
        border-radius: 0.12rem;
        &.is-active {
          background-color: #edf2ff;
          border-color: @theme-color;
          color: @theme-color;
        }
        .el-tooltip__trigger {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .el-sub-menu__icon-arrow,
        span {
          display: none;
        }
      }
    }
    .el-menu-item,
    .el-sub-menu .el-sub-menu__title {
      max-width: 160px;
      height: auto;
      padding: 0.1rem 0.12rem;
      margin: 0 0 0.18rem;
      border-left: 0.05rem solid transparent;
      border-top-right-radius: 0.12rem;
      border-bottom-right-radius: 0.12rem;
      white-space: normal;
      line-height: 1;
      &.is-active,
      &:hover {
        background-color: #edf2ff;
        border-color: @theme-color;
        color: @theme-color;
      }
      span {
        width: calc(100% - 0.33rem - 7px);
        margin: 0 0 0 0.1rem;
      }
    }
    .el-sub-menu {
      .el-menu {
        margin: -0.1rem 0 0.1rem;
        .el-menu-item {
          margin: 0 0 0 0.24rem;
        }
      }
      .el-sub-menu__icon-arrow {
        right: 0;
        font-size: 16px;
      }
    }
  }
}
</style>