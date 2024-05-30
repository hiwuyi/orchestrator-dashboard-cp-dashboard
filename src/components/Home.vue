<template>
  <div class="wrapper" id="wrapper" ref="area">
    <el-container class="container font-18">
      <el-header>
        <v-head></v-head>
      </el-header>
      <el-container>
        <el-aside>
          <v-aside></v-aside>
        </el-aside>
        <el-main>
          <div class="content">
            <router-view v-slot="{ Component }">
              <transition name="move" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
            <el-backtop :right="20" :bottom="120" />
          </div>
        </el-main>
      </el-container>
      <el-footer>
        <v-foot></v-foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vFoot from './Footer.vue'
import vAside from './Aside.vue'
import { defineComponent, computed, onMounted, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth < 992)
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()

    onMounted(() => { })
    return {}
  },
  components: {
    vHead, vFoot, vAside
  }
})
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  .content {
    .el-backtop {
      background-color: @theme-color;
      color: #fff;
    }
  }
  .container {
    min-height: 100vh;
    padding: 0;
    overflow: hidden;
    .el-header,
    .el-footer {
      height: auto;
      padding: 0.2rem 0.5rem;
      background-color: @white-color;
      &.el-header {
        background-color: @theme-color;
      }
    }
    .el-container {
      // height: calc(100vh - 1rem);
      .el-aside {
        width: auto;
        // min-width: 180px;
        padding: 0.25rem 0.15rem;
        background-color: @white-color;
        @media screen and (max-width: 768px) {
          display: none;
          width: 0;
        }
      }
      .el-main {
        padding: 0.2rem 0.5rem;
      }
    }
  }
}
</style>

<style lang="less">
.el-loading-mask {
  .el-loading-spinner .path {
    stroke: @theme-color;
  }
}

.wrongNet {
  .el-loading-mask {
    background-color: rgba(255, 255, 255, 0.9);
  }
}

.mt-border {
  margin: 0.3rem auto;
  border-top: 2px solid #868688;
}

.el-popper {
  .el-table-filter__list {
    .el-table-filter__list-item {
      color: #000;
      &.is-active {
        color: #fff;
      }
    }
  }
}
</style>

