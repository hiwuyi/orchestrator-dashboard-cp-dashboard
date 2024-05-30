<template>
  <div class="landing">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="less">
@import "./assets/css/style.css";

.mt-border {
  margin: 30px auto;
  border-top: 1px solid #8c878d;
}
.m-button {
  margin: 0 0 0 0.1rem;
}
.lang-max {
  width: 70%;
  max-width: 1340px;
  padding: 0;
  margin: auto;
  overflow: hidden;
  @media screen and (min-width: 2160px) {
    width: 100%;
    max-width: 1480px;
  }
  @media screen and (min-width: 2664px) {
    max-width: 1680px;
  }
  @media screen and (min-width: 4090px) {
    max-width: 1920px;
  }
  @media screen and (min-width: 5120px) {
    max-width: 2160px;
  }
  @media screen and (max-width: 1200px) {
    width: calc(100% - 64px);
    padding: 0 32px;
  }
}
.font-79 {
  font-size: 0.79rem;
}
.font-72 {
  font-size: 0.72rem;
}
.font-68 {
  font-size: 0.68rem;
}
.font-64 {
  font-size: 0.64rem;
}
.font-50 {
  font-size: 0.5rem;
}
.font-48 {
  font-size: 0.48rem;
}
.font-46 {
  font-size: 0.46rem;
}
.font-42 {
  font-size: 0.42rem;
}
.font-38 {
  font-size: 0.38rem;
}
.font-33 {
  font-size: 0.33rem;
}
.font-32 {
  font-size: 0.32rem;
}
.font-30 {
  font-size: 0.3rem;
}
.font-27 {
  font-size: 0.27rem;
}
.font-25 {
  font-size: 0.25rem;
}
.font-24 {
  font-size: 0.24rem;
}
.font-23 {
  font-size: 0.23rem;
}
.font-22 {
  font-size: 0.22rem;
}
.font-20 {
  font-size: 0.2rem;
}
.font-18 {
  font-size: 0.18rem;
}
.font-17 {
  font-size: 0.17rem;
}
.font-16 {
  font-size: 0.16rem;
}
.font-14 {
  font-size: 0.14rem;
}
.font-13 {
  font-size: 0.13rem;
}
.font-12 {
  font-size: 0.12rem;
}

.font-bold {
  font-weight: bold;
  // font-family: "HELVETICA-bold";
}

.weight-3 {
  font-weight: 300;
}
.weight-4 {
  font-weight: 400;
}
.weight-5 {
  font-weight: 500;
}
.weight-6 {
  font-weight: 600;
}
.weight-7 {
  font-weight: 700;
}
.weight-8 {
  font-weight: 800;
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-capitalize {
  text-transform: capitalize;
}

.text-white {
  white-space: nowrap;
}

.flex-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &.space-between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.nowrap {
    flex-wrap: nowrap;
  }
  &.baseline {
    align-items: baseline;
    align-content: baseline;
  }
  &.align-end {
    align-items: flex-end;
  }
}

.width-icon {
  display: block;
  width: 24px;
  height: 24px;
  color: @theme-color;
  fill: @theme-color;
  &.small {
    width: 20px;
    height: 20px;
  }
  &.min-small {
    width: 16px !important;
    height: 16px;
  }
  &.minimum-small {
    width: 14px;
    height: 14px;
  }
  &.big {
    width: 35px;
    height: 35px;
  }
  svg {
    width: inherit;
    height: inherit;
  }
}

.button-shadow {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.button {
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  border-radius: 100px;
  &:hover {
    background-color: @theme-color-opacity2;
  }
  svg,
  path {
    display: block;
    fill: @theme-color;
    cursor: inherit;
  }
}

.el-button--primary {
  background-color: @theme-color !important;
  border-color: @theme-color !important;
}

.is-disabled {
  cursor: no-drop;
}

.img {
  display: block;
  width: 100%;
}

.width {
  width: 100%;
}

.picture-mit {
  max-width: 170px;
  margin: auto;
}

.menu-width-mit {
  width: calc(100% - 230px);
  @media screen and (max-width: 540px) {
    width: calc(100% - 200px);
  }
}

.uptime-ul {
  margin: 0 0.12rem 0 0;
  li {
    width: 0.05rem;
    height: 0.16rem;
    margin: 0 0.03rem 0 0;
    background-color: #7c889b;
    &.active {
      background-color: @theme-color;
    }
  }
}

.el-loading-spinner {
  position: relative !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &.loading-style {
    top: auto !important;
    margin: 0 !important;
  }
  .path {
    stroke: @theme-color;
  }
  .circular {
    @media screen and (max-width: 540px) {
      width: 35px !important;
      height: 35px !important;
    }
  }
  .el-loading-text {
    width: 100%;
    margin: 8px 0 0 !important;
    font-size: inherit !important;
    color: @theme-color;
    @media screen and (max-width: 540px) {
      margin: 38px 0 0 !important;
    }
  }
}

.el-popper {
  .el-select-dropdown__wrap,
  .el-select-dropdown__list,
  .el-select-dropdown__item {
    font-size: 0.14rem;
    li {
      @media screen and (max-width: 768px) {
        height: auto;
        line-height: 1.2;
      }
    }
  }
  .el-menu--vertical {
    .el-menu {
      .el-menu-item {
        height: auto;
        padding: 0.15rem 0.2rem;
        line-height: 1;
        &.is-active,
        &:hover {
          background-color: #edf2ff;
          color: @theme-color;
        }
      }
    }
  }
}
body {
  .el-popper.popper_style {
    width: 400px !important;
    padding: 24px;
  }
}
</style>
