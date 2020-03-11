<template>
  <div class="appItem">
    <div class="item">
      <img src="../../assets/img/wallet.png" alt="" />
      <span>APP名称</span>
      <div class="mask">
        <ul>
          <li>查看秘钥</li>
          <li>编辑</li>
          <li style="border-bottom:none;color:red">删除</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <img src="../../assets/img/wallet.png" alt="" />
      <span>APP名称</span>
    </div>
    <div class="item">
      <img src="../../assets/img/wallet.png" alt="" />
      <span>APP名称</span>
    </div>
    <div class="item">
      <img src="../../assets/img/wallet.png" alt="" />
      <span>APP名称</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.appItem {
  .item {
    width: 20.666667rem;
    height: 10.666667rem;
    display: flex;
    position: relative;
    overflow: hidden;
    float: left;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    border: 1px solid #ccc;
     &:hover .mask{
        top:0px;
        transition: all .2s ease;
      }
    .mask {
      position: absolute;
      // display: none;
        transition: all .2s ease;
      left: 0;
      top: 10.666667rem;
      width: 20.666667rem;
      height: 10.666667rem;
      background: rgba(204, 204, 204, 0.6);
      ul {
        list-style: none;
        background: #f2f2f2;
        padding: 15px;
        margin-top: 51px;
        box-sizing: border-box;
        li {
          height: 30px;
          text-align: center;
          color: #0079fe;
          line-height: 30px;
          cursor: pointer;
          border-bottom: 1px solid #ccc;
        }
      }
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
