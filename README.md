# React hooks useModel 核心代码

### React core 之 usemodel库，

### 使用太简单了，彻底放弃Reduex，使你的工作效率，成倍的提高，从此告别无意义的加班！

# 基本用法

```
//引入依赖
import React from 'react'
import API from '../../utils/axios'
import { model, useModel } from 'ymcore/useModel'

//声明model对象，指定声明空间为Demo
model({
  API,
  namespace: 'Demo',
  kk2n: 1,
  getList: 'get /biz/auth/detail/staff',
})

//使用方法
export default function Demo() {
  let m = useModel('Demo')
  return (
    <div>
      同步数据：{m.kk2n}
      <br />
      异步数据：{m.getListRes?.data?.staffRealName}
      <br />
      <button onClick={ () => m.kk2nUp(2) }>
        同步数据更新
      </button>
      <br />
      <button onClick={() => m.getList({ kk: 'ss' }) } >
        异步数据更新
      </button>
    </div>
  )
}
```

# API只有两个: 【Model】声明model对象，【usemodel】，使用model对象

# Model： 该函数具体使用方法说明：
### 页面执行直接：Model(params);
该函数的入参params说明：为对象object,如：
```
{
  namespace: 'Demo',
  API,
  kk2n: 1,
  getList: 'get /biz/auth/detail/staff',
}
```
namespace：命名空间
API：请求方法，如axios,fetch等等
kk2n：为该空间内的变量，也就是在这设置页面上状态的初始值，一旦声明，该model对象(称为：m)，即可出现 m.kk2n状态和 m.kk2nUp(newValue)更新该状态的方法，入参为新的值。
getList：为该空间内的异步请求方法，通常值以"get /db/api","post /db/api","请求方法 请求url"，一旦声明，即可出现m.getList({id:1})方法，参数为该请求方法的请求入参，以及，该方法请求后的请求结果：m.getListRes,该对象有三个值：data,code,msg，也就是接口返回结果

