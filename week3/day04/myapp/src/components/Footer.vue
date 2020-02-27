<template>
  <footer class="footer">
    <ul>
      <!-- router-link默认被渲染为a标签，使用tag标签生成需要的标签 -->
      <router-link to="/home" tag="li">
        <span class="iconfont icon-fonts-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-icon"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </router-link>
      <router-link to="/user" tag="li">
        <span class="iconfont icon-wode"></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<style lang="scss">
@import '@/lib/reset.scss';
.footer {
  ul {
    li {
      &.router-link-exact-active.router-link-active {
        @include text-color(#f66);
      }
    }
  }
}
</style>
