<template>
  <div class="container">
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<style lang="scss">
// 导入重置样式库的scss文件，其内部导入了别的scss文件
@import '@/lib/reset.scss';
// 如果企业有自己的scss库，使用企业自己的，没有可以选用这个
// 查看lib/classes.scss文件，内含各个函数的使用
// 1rem 100px
html, body, .container {
  @include rect(100%, 100%); // width: 100%; height: 100%;
}
.container {
  @include flexbox(); // display: flex;的兼容写法
  @include flex-direction(column); // flex-direction: column;的兼容写法
  .box {
    @include flex(); // flex: 1;的兼容写法
    @include rect(100%, auto);
    @include flexbox();
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.44rem);
      @include background-color(#f66);
      ul {
        @include rect(100%, 100%);
        @include flexbox();
        @include color(#fff);
        li {
          @include flexbox();
          &:nth-child(1), &:nth-child(3) {
            @include rect(50px, 100%);
            @include flex-direction(column);
            @include justify-content();
            @include align-items();
          }
          &:nth-child(2) {
            @include flex();
            @include background-color(#fff);
            @include color(#666);
            @include margin(8px);
            @include padding(5px 10px);
            @include border-radius(10px);
          }
        }
      }
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      @include overflow(auto); // 产生滚动条
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#efefef);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li {
        @include flex();
        // 内部元素水平垂直居中
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        span {
          @include font-size(0.24rem);
        }
        p {
          // @include color(#333);
          @include font-size(0.12rem);
          @include margin(-3px 0 0 0);
        }
      }
    }
  }
}
</style>
