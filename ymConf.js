/*
溢米项目配置
 */
export function ymConf() {
  for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }

  if (arg.includes('env')) {
    //返回环境，eg:dev-,sit01-,生产上返回''
    return (location.host.match(/\w+(?:-)/) || [])[0] || ''; // => dev-
  } else if (arg.includes('domain')) {
    //返回主域名,注意是主域,eg: yimifudao.com
    var hostname = location.hostname.split('.');
    if (hostname[2] === 'com' && hostname[3] === 'cn' || hostname[3] === 'com' && hostname[4] === 'cn') {
      return hostname.splice(-3, 3).join('.');
    } else if (hostname[2] === 'com' || hostname[3] === 'com') {
      return hostname.splice(-2, 2).join('.');
    }
  } else if (arg.includes('host')) {
    //返回，完整的
    return location.hostname;
  }
}
export default { ymConf: ymConf };