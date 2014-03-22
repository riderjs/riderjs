/**
 * rider.js
 * verson: 1.0 2014.3.18
 * made by rider (xushaowei)
 *
 ***************** Before Use Configure in html ***********************
 * type one total of 4 steps:
 *    <script src="j/lib/jquery-development.js"></script> // 1
 *    <script> // 2
 *      // plugins's base path
 *      var baseUrl = 'j/plugins/'; // your plugins's path
 *    </script>
 *    <script src="j/rider.js"></script> // 3 load rider.js
 *    use rider.js in your js like this: // 4
 *      rd.use('jump', callback) or
 *      requires('jump'); callback();
 * type two total of 3 steps:
 *    <script> // 1
 *      var baseUrl = 'j/plugins/' // your plugins's path
 *      ,jquerySrc = 'j/lib/jquery-development.js'; // your jquery.js's path and name
 *    </script>
 *    <script src="j/rider.js"></script>// 2
 *    use rider.js in your js like this: //3
 *      rd.ready(function() {
 *        rd.use('jump', callback) or
 *        requires('jump'); callback();
 *      });
 ***************** Use Example **********************
 *
 * use example one: 
 *    for only used once
 *    rd.use(plugins, fun, fun1, ...)
 * use example two:
 *    for repeated use
 *    requires(plugins); fun(); fun1(); ...
 * use example three:
 *    rd.use(['fileName', 'plugins1', 'plugins2&css'], fun1, fun2,...)
 *
 ***************** Params **********************
 *
 * @param plugins {string} js like this:'plugins1, plugins2, ...';
 *    css like this: 'plugins1.css, plugins2.css';
 *    js&css like this: 'plugins1&css';
 *
 * @param plugins {array} like ['fileName', 'plugins1', 'plugins2&css', 'plugins3.css']
 *    if fileName != '', then rider.js will load from the folder which name is fileName
 *
 * @param callback {function} which rely on plugins
 *
**/
////////////////////////////////////////
// rider.js begin
////////////////////////////////////////
(function(global) {
  var rider = global.rider = global.rd = {
    verson: '1.0'
    ,cachePlugins: [] // plugins in cache
    ,baseUrl: null
    ,jq: null
  }

  // init
  rider.init = function() {
    var self = this;
    if (typeof(baseUrl) === 'string') self.baseUrl = baseUrl; 
    else  throw('baseUrl is undefined');
  }
  // load jquery ready
  rider.ready = function(callback) {
    // load jquery.js

    if (typeof(jquerySrc) === 'string') {
      include_js(jquerySrc);
    } else {
      $(document).ready(function() {
        callback();
      });
    }

    function include_js(file) {
      var _doc = document.getElementsByTagName('head')[0];
      var js = document.createElement('script');
      js.setAttribute('type', 'text/javascript');
      js.setAttribute('src', file);
      _doc.appendChild(js);
      // rider.jq = js;
      if (!js.readyState) { //if not IE
        //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
        js.onload = function () {
          callback();
        }
      } else {
        //IE6、IE7 support js.onreadystatechange
        js.onreadystatechange = function () {
          if (js.readyState == 'loaded' || js.readyState == 'complete') {
            callback();
          }
        }
      }
    }
  }
  // use plugins
  window.requires = rider.use = 
  rider.requires = function(plugins) {

    var self = rider, callbacks = [], plugin, sub, callback, 
      i = 0;

    if (typeof plugins === 'string') {
      // tirm blank
      plugins = self.tirm(plugins);
      plugins = plugins.split(',');
      sub = 1;
    } else if (typeof plugins === 'object') {
      self.baseUrl = baseUrl + plugins[0] + '/';
      sub = 0, i = 1;
    } else {
      throw('first params need string like \'plugins1, plugins2\'');
    }

    // load all plugins and plugins.css
    for (var l = plugins.length; i < l; i++) {
      if (arguments[i + sub])
        callbacks.push(arguments[i + sub]);
      plugin = plugins[i];
      // if need load css
      // console.log(plugin);
      if (plugin.split('&css').length > 1) {
        plugin = plugin.replace('&css','');
        if ($.inArray(plugin, self.cachePlugins) > -1)  continue;
        self.loadCss(plugin);
        self.loadScript(plugin);
      } else if (plugin.split('.css').length > 1) {
        plugin = plugin.replace('.css','');
        self.loadCss(plugin);
      } else {
        if ($.inArray(plugin, self.cachePlugins) > -1)  continue;
        self.loadScript(plugin);
      }
    }
    // execute callbacks
    $(callbacks).each(function(){
      callback = this;
      if (typeof(callback) === 'function') {
        setTimeout(function() {
        // console.log(callback)
          callback();
        });
      }
    })
  }

  // load css function
  rider.loadCss = function(plugin) {
    setTimeout(function() {
      $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: rider.baseUrl + plugin + ".css"
        })
        .appendTo("head");
    });
  } 

  // load script function
  rider.loadScript = function(plugin) {
    $.ajax({
      url: rider.baseUrl + plugin + '.js'
      ,dataType: 'script'
      ,cache: true
      ,async: false
      ,success: function() {
        rider.cachePlugins.push(plugin);
        // console.log('load script end');
      }
    });
  }
  // tirm blank
  rider.tirm = function(string) {
    return string.replace(/^\s+|\s+$/g,'').replace(', ', ',');
  }

  rider.init();
  
})(this);
