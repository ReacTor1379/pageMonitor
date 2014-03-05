define(function (){
    var allRule = [
        'ycdn','ycompress', 'ycookiefree', 
        'ycsstop','ydns','ydupes',
        'yemptysrc','yetags','yexpires',
        'yexpressions','yexternal','yfavicon',
        'yimgnoscale','yjsbottom','ymincookie',
        'ymindom','yminify','yno404',
        'ynofilter','ynumreq','yredirects',
        'yxhr','yxhrmethod'];

    var dictionary = {
        'ycdn': {
            error: '该页面未使用CDN',
            succ: '该页面的所有静态文件均已使用CDN'
        },
        'ycompress': {
            error: '该页面有组件未使用Gzip压缩',
            succ: '该页面已使用Gzip压缩所有组件'
        },
        'ycookiefree': {
            error: '该页面未使用cookie-free',
            succ: '该页面已使用cookie-free'
        },
        'ycsstop': {
            error: '该页面未将所有CSS文件置顶',
            succ: '该页面已将所有CSS文件置顶'
        },
        'ydns': {
            error: '该页面的组件被分为超过4个域',
            succ: '该页面已合理减少DNS查找'
        },
        'ydupes': {
            error: '该页面有需要删减的重复的Javascript和CSS',
            succ: '该页面未发现重复的Javascript和CSS'
        },
        'yemptysrc': {
            error: '该页面有空的文件引用或空链接',
            succ: '该页面未发现空文件引用或空链接'
        },
        'yetags': {
            error: '该页面未配置Etags',
            succ: '该页面已配置Etags'
        },
        'yexpires': {
            error: '该页面有组件未添加过期标头',
            succ: '该页面已设置过期标头'
        },
        'yexpressions': {
            error: '该页面使用了CSS表达式',
            succ: '该页面未发现CSS表达式'
        },
        'yexternal': {
            error: '该页面有未外链的Javascript或CSS',
            succ: '该页面全部使用外链Javascript和CSS'
        },
        'yfavicon': {
            error: '该页面有超过2M的图标，且无法缓存',
            succ: '该页面已使用小图标且可缓存'
        },
        'yimgnoscale': {
            error: '发现该页面在HTML中防缩图片',
            succ: '该页面未在HTML中放缩图片'
        },
        'yjsbottom': {
            error: '发现该页面存在未置底的JS文件',
            succ: '该页面全部JS文件已置底'
        },
        'ymincookie': {
            error: '发现该页面Cookie过大，需减小',
            succ: '该页面已尽量减少Cookie大小'
        },
        'ymindom': {
            error: '发现该页面DOM元素过多',
            succ: '该页面已尽量减少DOM元素个数'
        },
        'yminify': {
            error: '发现该页面存在未压缩的Javsscript和CSS文件',
            succ: '该页面已压缩所有Javascript和CSS文件'
        },
        'yno404': {
            error: '发现该页面存在404错误请求',
            succ: '该页面未发现404错误'
        },
        'ynofilter': {
            error: '发现该页面使用AlphaImageLoader filter',
            succ: '该页面未使用AlphaImageLoader filter'
        },
        'ynumreq': {
            error: '发现该页面的HTTP请求较多',
            succ: '该页面已尽量减少HTTP请求'
        },
        'yredirects': {
            error: '发现该页面有过多的URL重定向',
            succ: '该页面已尽量避免URL重定向'
        },
        'yxhr': {
            error: '发现该页面的AJAX请求未缓存',
            succ: '该页面已尽量使得AJAX请求可缓存'
        },
        'yxhrmethod': {
            error: '发现该页面存在大量的已POST方式发送的AJAX请求',
            succ: '该页面已尽量使用GET方式发送AJAX请求'
        }
    };

    var getRule = function(){
        return allRule;
    };
    
    var getDescribe = function(name, flag){
        if(dictionary[name]){
            return dictionary[name][flag];
        }else{
            return '';
        }
        
    };

    return {
        getRule: getRule,
        getDescribe: getDescribe
    };
});
