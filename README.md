# React hooks useModel 核心代码

### React core 之 usemodel库，

### 使用太简单了，彻底放弃Reduex，使你的工作效率，成倍的提高，从此告别无意义的加班！

# 安装

```
npm install ymcore 
//或
yarn add ymcore
```

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

##### API只有两个: 
【Model】声明model对象，  
【usemodel】，使用model对象


# Model： 该函数具体使用方法说明：
### 页面执行直接：Model(params);
该函数的入参params说明：为对象object,如：
```
{
  namespace: 'Demo',
  API,
  kk2n: 1,
  getList: 'get /biz/auth/detail/staff',
  reset(){
   this.kk2n=1
  }
}
```

### 说明

【namespace】：命名空间  
【API】：请求方法，如axios,fetch等等  

###### 以上两个为固定值，其他均为【状态】和【方法】  
【kk2n】：值为字符时，为状态的初始值,声明后,该model对象(称为：m)，即可出现 m.kk2n状态和更新状态的方法 m.kk2nUp(newValue)，入参为新值。
  
【getList】：值为"get post"开头的字符时,为异步请求方法，例如："get /db/api","post /db/api",声明后，即可出现m.getList({id:1})方法，参数为请求方法的入参。并且，携带上请求结果：m.getListRes,结果有三个值：data,code,msg对应着接口返回值。  

【reset】：值为函数时，为model的方法，可以在方法改变其他状态。  


### 特别说明：
【第1点】：update：如果同时需要更新多个状态，你可使用
```
m.update({
  kk2n:11,
  kk3n:22
})
```
【第2点】：Model的状态和方法支持跨模块调用，你可以把它视为全局的store。

例如： 
```

//自己的model
let m = useMdel('BPageDemo')
//其他模块的model
let mDemo = useMdel('Demo')

//这样，你就能在B页面使用Demo页面的状态和调用方法了
<a onClick={ () => mDemo.kk2nUp(2) }> { mDemo.kk2n } </a> 

```

###### 但通常不建议这样使用，因为如果你的系统对页面有权限控制，如Demo本权限控制而没有出现，那么B页面就会出现未知错误，请自行组织好您的页面关系，可多使用容器组件和木偶组件的数据传输原则

掌握以上，你就掌握全部...
从此，开始，新的快乐生活吧...



### 【其他文档】

[1.useAPI使用方法 ](https://github.com/kk2n/core)

[2.useAsync使用方法 ](https://github.com/kk2n/core)

[3.useFetch使用方法 ](https://github.com/kk2n/core)

[4.useModel使用方法 ](https://github.com/kk2n/core)

[5.useToggle使用方法 ](https://github.com/kk2n/core)

[6.createModel使用方法 ](https://github.com/kk2n/core)
