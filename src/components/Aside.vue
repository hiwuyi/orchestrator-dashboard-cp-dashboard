<template>
  <div class="aside">
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect" background-color="transparent" text-color="#fff">
      <el-menu-item index="overview">
        <i class="icon icon-Overview"></i>
        <span class="font-22">Overview</span>
      </el-menu-item>
      <el-menu-item index="rankings">
        <i class="icon icon-Rankings"></i>
        <span class="font-22">Rankings</span>
      </el-menu-item>
      <el-menu-item index="accountInfo" v-if="metaAddress && accessToken">
        <i class="icon icon-AccountInfo"></i>
        <span class="font-22">CP Profile</span>
      </el-menu-item>
      <el-menu-item index="resource">
        <i class="icon icon-Resource"></i>
        <span class="font-22">Resource</span>
      </el-menu-item>
      <el-sub-menu index="aar">
        <template #title>
          <i class="icon icon-AAR"></i>
          <span class="font-17">Atom Accelerator Race
            <i class="icon icon-new"></i>
          </span>
        </template>
        <el-menu-item index="aar-fcp">FCP Ranking</el-menu-item>
        <el-menu-item index="aar-ecp">ECP Ranking</el-menu-item>
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

    const handleSelect = (key, keyPath) => {
      // console.log('handleOpen', key)
      if (key === 'overview') router.push({ path: '/overview' })
      else if (key === 'rankings') router.push({ name: 'rankings', params: { type: 'FCP' } })
      else if (key === 'aar-fcp') router.push({ name: 'aarFCP' })
      else if (key === 'aar-ecp') router.push({ name: 'aarECP' })
      else if (key === 'accountInfo') router.push({ name: 'accountInfo', params: { type: 'FCP' } })
      else if (key === 'resource') router.push({ name: 'resource' })
    }
    async function activeMenu (row) {
      const nameMenu = row || route.name
      const nameType = route.params.type || ''
      if (nameMenu.indexOf('overview') > -1 || nameMenu.indexOf('dashboard') > -1) activeIndex.value = 'overview'
      else if (nameMenu.indexOf('rankings') > -1) activeIndex.value = 'rankings'
      else if (nameMenu.indexOf('aarFCP') > -1 || nameMenu.indexOf('aar/FCP') > -1) activeIndex.value = 'aar-fcp'
      else if (nameMenu.indexOf('aarECP') > -1 || nameMenu.indexOf('aar/ECP') > -1) activeIndex.value = 'aar-ecp'
      else if (nameMenu.indexOf('accountInfo') > -1) activeIndex.value = 'accountInfo'
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
  :deep(.el-menu) {
    border: 0;
    .el-menu-item,
    .el-sub-menu .el-sub-menu__title {
      height: auto;
      padding: 0.1rem 0.12rem;
      margin: 0 0 0.28rem;
      border-left: 0.05rem solid transparent;
      border-top-right-radius: 0.12rem;
      border-bottom-right-radius: 0.12rem;
      white-space: normal;
      line-height: 1;
      &.is-active,
      &:hover {
        background-color: @white-color-opacity;
        border-color: @white-color;
        color: @white-color;
      }
      span {
        width: calc(100% - 0.33rem - 7px);
      }
      .icon {
        width: 0.23rem;
        height: 0.23rem;
        margin: 0 0.1rem 0 0;
        &.icon-Overview {
          background: url(../assets/images/menu-01.png) no-repeat;
          background-size: 100%;
        }
        &.icon-Rankings {
          background: url(../assets/images/menu-02.png) no-repeat;
          background-size: 100%;
        }
        &.icon-AccountInfo {
          background: url(../assets/images/menu-03.png) no-repeat;
          background-size: 100%;
        }
        &.icon-Resource {
          background: url(../assets/images/menu-04.png) no-repeat;
          background-size: 100%;
        }
        &.icon-AAR {
          background: url(../assets/images/menu-05.png) no-repeat;
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
    }
    .el-sub-menu {
      .el-menu {
        margin: -0.1rem 0 0.1rem;
        .el-menu-item {
          margin: 0 0 0 0.4rem;
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