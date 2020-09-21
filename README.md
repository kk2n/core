# React hooks useModel 核心代码

### React core 之 usemodel库，

### 使用太简单了，彻底放弃Reduex，使你的工作效率，成倍的提高，从此告别无意义的加班！

# 基本用法

```
//引入依赖
import { model, useModel } from 'ymcore/useModel'

//声明model对象，指定声明空间为Demo
model({
  API,
  namespace: 'Demo',
  kk2n: 1,
  getList: 'get /biz/auth/detail/staff',
})

//使用方法
function Demo() {
  let m = useModel('Demo')
  return (
    <div>
      同步数据：{m.kk2n}
      <br />
      <button onClick={ () => m.kk2nUp(22) }>
        同步数据更新
      </button>
      <br />


      异步数据：{m.getListRes?.data?.staffRealName}
      <br />
      <button onClick={() => m.getList({ kk: 'ss' }) } >
        异步数据更新
      </button>
    </div>
  )
}

export default Demo
