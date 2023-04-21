<div class="loader">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
</div>

<style>
/* Animation Loader 3: https://codepen.io/Manoz/pen/kyWvQw */

.line {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #fff;
}

.loader .line:nth-last-child(1) {
  animation: loadingC 0.6s 0.1s linear infinite;
}
.loader .line:nth-last-child(2) {
  animation: loadingC 0.6s 0.2s linear infinite;
}
.loader .line:nth-last-child(3) {
  animation: loadingC 0.6s 0.3s linear infinite;
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>