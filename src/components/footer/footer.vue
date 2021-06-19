<template>
  <div class='footer'>
      <div class="container">
          <div class="footer-content">
            <div class="menu">
                <ul class="unstyled">
                    <li><a href="">Terms</a></li>
                    <li><a href="">Privacy</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
            <div class="social">
                <img class="mr-1" src="@/assets/img/google.svg">
                <img class="mr-1" src="@/assets/img/linkedin.svg">
                <img class="mr-1" src="@/assets/img/tweeter.svg">
                <img src="@/assets/img/facebook.svg">
            </div>
          </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.footer{
    padding: 10px 0;
    background-color: #fff;
    .footer-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .menu ul{
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
            li{
                margin-left: 15px;
                &:first-child{
                    margin-left: 0;
                }
                a{
                    text-decoration: none;
                    color: #333;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>