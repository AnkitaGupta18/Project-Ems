if (window.JCFServerCommon === undefined) {
    window.JCFServerCommon = {
        frames: {}
    }
} else {}

if (typeof JSON !== 'object') {
    JSON = {};
}

// IE console fix
if (!window.console) console = {
    log: function() {}
};

(function() {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function() {

            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function() {
                return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

        // Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

                // If the type is 'object', we might be dealing with an object or an array or
                // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

                // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', {
                '': value
            });
        };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

if (window.getIframeWindow === undefined) {
    function getIframeWindow(iframe_object) {
        var doc;
        if (iframe_object.contentWindow) {
            return iframe_object.contentWindow;
        }
        if (iframe_object.window) {
            return iframe_object.window;
        }
        if (!doc && iframe_object.contentDocument) {
            doc = iframe_object.contentDocument;
        }
        if (!doc && iframe_object.document) {
            doc = iframe_object.document;
        }
        if (doc && doc.defaultView) {
            return doc.defaultView;
        }
        if (doc && doc.parentWindow) {
            return doc.parentWindow;
        }
        return undefined;
    }
}

if (window.getStyle === undefined) {
    function getStyle(el, styleProp) {
        var value, defaultView = (el.ownerDocument || document).defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
            // sanitize property name to css notation
            // (hypen separated words eg. font-Size)
            styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) { // IE
            // sanitize property name to camelCase
            styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            });
            value = el.currentStyle[styleProp];
            // convert other units to pixels on IE
            if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                return (function(value) {
                    var oldLeft = el.style.left,
                        oldRsLeft = el.runtimeStyle.left;
                    el.runtimeStyle.left = el.currentStyle.left;
                    el.style.left = value || 0;
                    value = el.style.pixelLeft + "px";
                    el.style.left = oldLeft;
                    el.runtimeStyle.left = oldRsLeft;
                    return value;
                })(value);
            }
            return value;
        }
    }
}

function widgetFrameLoaded(id) {
    var enableLog = false;

    enableLog && console.log("SERVER: widget frame onload for", id);


    var frameObj = document.getElementById("customFieldFrame_" + id);
    var src = frameObj.src;

    //because we are changing iframe src dynamically
    if (src.match('/form/')) {
        return;
    }

    var refererArr = src.match(/^(ftp:\/\/|https?:\/\/)?(.+@)?([a-zA-Z0-9\.\-]+).*$/);
    var referer = refererArr[1] + refererArr[3];
    // var thisForm = (JotForm.forms[0] == undefined || typeof JotForm.forms[0] == "undefined" ) ? $($$('.jotform-form')[0].id) : JotForm.forms[0];

    var XD = function() {
        var interval_id,
            last_hash,
            cache_bust = 1,
            attached_callback,
            window = this;
        return {
            postMessage: function(message, target_url, target) {
                if (!target_url) {
                    return;
                }
                target = target || parent; // default to parent
                if (window.postMessage) {
                    // the browser supports window.postMessage, so call it with a targetOrigin
                    // set appropriately, based on the target_url parameter.
                    if (!("postMessage" in target)) {
                        //we have a problem, update target
                        target = getIframeWindow(target);
                    }
                    target.postMessage(message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
                } else if (target_url) {
                    // the browser does not support window.postMessage, so use the window.location.hash fragment hack
                    target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
                }
            },
            receiveMessage: function(callback, source_origin) {
                // browser supports window.postMessage
                if (window.postMessage) {
                    // bind the callback to the actual event associated with window.postMessage
                    if (callback) {
                        attached_callback = function(e) {
                            if ((typeof source_origin === 'string' && e.origin !== source_origin) || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
                                return !1;
                            }
                            callback(e);
                        };
                    }
                    if (window['addEventListener']) {
                        window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
                    } else {
                        window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
                    }
                } else {
                    // a polling loop is started & callback is called whenever the location.hash changes
                    interval_id && clearInterval(interval_id);
                    interval_id = null;
                    if (callback) {
                        interval_id = setInterval(function() {
                            var hash = document.location.hash,
                                re = /^#?\d+&/;
                            if (hash !== last_hash && re.test(hash)) {
                                last_hash = hash;
                                callback({
                                    data: hash.replace(re, '')
                                });
                            }
                        }, 100);
                    }
                }
            }
        };
    }();

    // check a valid json string
    function IsValidJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function sendMessage(msg, id) {
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            XD.postMessage(msg, referer, getIframeWindow(window.frames["customFieldFrame_" + id]));
        } else {
            XD.postMessage(msg, referer, window.frames["customFieldFrame_" + id]);
        }
    }

    //note that we are binding receiveMessage on iframe load
    XD.receiveMessage(function(message) {

        // don't parse some unknown text from third party api of widgets like google recapthca
        if ( !IsValidJsonString(message.data) ) {
            return;
        }

        //parse message
        var data = JSON.parse(message.data);

        enableLog && console.log("SERVER: message coming form client type ", data.type);
        //sendSubmit
        if (data.type === "submit") {
            if (typeof data.value === 'number') {
                data.value = data.value + "";
            }
            var required = $(document.getElementById("input_" + data.qid)).hasClassName('widget-required');
            if (!(required)) {
                if (data.valid === false) {
                    document.getElementById("input_" + data.qid).value = "widget not used";
                } else {
                    if (data.value !== undefined) {
                        document.getElementById("input_" + data.qid).value = data.value;
                    } else {
                        document.getElementById("input_" + data.qid).value = "";
                    }
                }
            } else {
                if (data.valid === false) {
                    JotForm.errored(document.getElementById("input_" + data.qid), "Please fill this field");
                } else {
                    JotForm.corrected(document.getElementById("input_" + data.qid));
                    if (data.value !== undefined) {
                        document.getElementById("input_" + data.qid).value = data.value;
                    } else {
                        document.getElementById("input_" + data.qid).value = "";
                    }
                }
            }

            //if no value was set, dont show it to submission data
            if (typeof data.value === 'undefined' || data.value == false) {
                var el = document.getElementById("input_" + data.qid);
                el.value = '';
                el.removeAttribute('name');
            }

            var allInputs = document.getElementsByClassName("widget-required");
            var sendSubmit = true;
            for (var i = -0; i < allInputs.length; i++) {
                if (allInputs[i].value.length === 0) {
                    sendSubmit = false;
                }
            }
            // if(sendSubmit) {
            //     if(JotForm.validateAll()) {
            //         thisForm.submit();
            //     }
            // }             
        }

        //sendData
        if (data.type === "data") {
            document.getElementById("input_" + data.qid).value = data.value;
        }

        //requestFrameSize
        if (data.type === "size") {
            var width = data.width,
                height = data.height;

            enableLog && console.log("SERVER: resizing widget width", width, "height", height);
            if (width !== undefined && width !== null) {
                document.getElementById('customFieldFrame_' + data.qid).style.width = width + "px";
            }
            if (height !== undefined && height !== null) {
                document.getElementById('customFieldFrame_' + data.qid).style.height = height + "px";
            }
        }

    }, document.location.protocol + '//' + frameObj.src.match(/^(ftp:\/\/|https?:\/\/)?(.+@)?([a-zA-Z0-9\.\-]+).*$/)[3]);

    //function that gets the widget settings from data-settings attribute of the iframe
    function getWidgetSettings() {
        var el = document.getElementById('widget_settings_' + id);
        return (el) ? el.value : null;
    }

    //send auto ready message to widget
    var msg = {
        type: "ready",
        qid: id + "",
        background: getAllProperties()["form_background"],
        fontFamily: getAllProperties()["form_font"],
        formID: BuildSource.formID,
        onWizard: true,
        settings: getWidgetSettings()
    };

    // include initial width and height of the widget
    var fwidth = frameObj.readAttribute('data-width') || frameObj.style.width;
    var fheight = frameObj.readAttribute('data-height') || frameObj.style.height;
    msg.width = parseInt(fwidth);
    msg.height = parseInt(fheight);

    sendMessage(JSON.stringify(msg), id + "");

    // Event.observe(thisForm, 'submit', function(e){
    //     // Event.stop(e);
    //     Event.stop(e);
    //     sendMessage(JSON.stringify({type:"submit", qid: id+""}), id + ""); 
    // });     
}


// var JCF_Server = (function(base) {

//     var root = {};

//     var fid = _JCFClientID;

//     function getIframeWindow(iframe_object) {
//         var doc;
//         if (iframe_object.contentWindow) {
//           return iframe_object.contentWindow;
//         }
//         if (iframe_object.window) {
//           return iframe_object.window;
//         } 
//         if (!doc && iframe_object.contentDocument) {
//           doc = iframe_object.contentDocument;
//         } 
//         if (!doc && iframe_object.document) {
//           doc = iframe_object.document;
//         }
//         if (doc && doc.defaultView) {
//          return doc.defaultView;
//         }
//         if (doc && doc.parentWindow) {
//           return doc.parentWindow;
//         }
//         return undefined;
//     }

//     function getStyle(el, styleProp) {
//         var value, defaultView = (el.ownerDocument || document).defaultView;
//         // W3C standard way:
//         if (defaultView && defaultView.getComputedStyle) {
//             // sanitize property name to css notation
//             // (hypen separated words eg. font-Size)
//             styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
//             return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
//         } else if (el.currentStyle) { // IE
//             // sanitize property name to camelCase
//             styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
//                 return letter.toUpperCase();
//             });
//             value = el.currentStyle[styleProp];
//             // convert other units to pixels on IE
//             if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
//                 return (function(value) {
//                     var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
//                     el.runtimeStyle.left = el.currentStyle.left;
//                     el.style.left = value || 0;
//                     value = el.style.pixelLeft + "px";
//                     el.style.left = oldLeft;
//                     el.runtimeStyle.left = oldRsLeft;
//                     return value;
//                 })(value);
//             }
//         return value;
//         }
//     }

//     function removeElement(id){
//         return(EObj=document.getElementById(id))?EObj.parentNode.removeChild(EObj):false;
//     }
//     // run init function per custom field
//     // much easier to control
//     // note that _JCFClient is set in question_definitons.js file
//     function init() {
//         //get frame DOM obj
//         root.frameObj = document.getElementById("customFieldFrame_" + _JCFClientID);
//         console.log("SERVER: widget detected with id ", _JCFClientID);

//         //if it not can be loaded in 5000 ms remove iframe form line
//         var frameLoadTimeout = setTimeout(function(){
//             console.log("widget frame could not load");
//             //remove element from form except hidden input
//             removeElement("label_" + _JCFClientID);
//             removeElement("id_" + _JCFClientID);
//             //set hidden input value
//             // document.getElementById("input_" + _JCFClientID).value="Custom Field Broken";
//         }, 7500);

//         root.thisForm = (JotForm.forms[0] == undefined || typeof JotForm.forms[0] == "undefined" ) ? $($$('.jotform-form')[0].id) : JotForm.forms[0];

//         //TODO: IE8 check
//         root.frameObj.onload = function(e){

//             console.log("SERVER calling frame load event");

//             clearTimeout(frameLoadTimeout);

//             var id = this.getAttribute("id").replace("customFieldFrame_", "");
//             var src = this.src;
//             var referer = 'http://'+ src.match(/^(ftp:\/\/|https?:\/\/)?(.+@)?([a-zA-Z0-9\.\-]+).*$/)[3]

//             var XD = function() {
//                 var interval_id,
//                     last_hash,
//                     cache_bust = 1,
//                     attached_callback,
//                     window = this;
//                 return {
//                     postMessage : function(message, target_url, target) {
//                         if (!target_url) {
//                             return;
//                         }
//                         target = target || parent;  // default to parent
//                         if (window.postMessage) {
//                             // the browser supports window.postMessage, so call it with a targetOrigin
//                             // set appropriately, based on the target_url parameter.
//                             target.postMessage(message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1' ) );
//                         } else if (target_url) {
//                             // the browser does not support window.postMessage, so use the window.location.hash fragment hack
//                             target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
//                         }
//                     },
//                     receiveMessage : function(callback, source_origin) {
//                         // browser supports window.postMessage
//                         if (window.postMessage) {
//                             // bind the callback to the actual event associated with window.postMessage
//                             if (callback) {
//                                 attached_callback = function(e) {
//                                     if ((typeof source_origin === 'string' && e.origin !== source_origin)
//                                             || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
//                                         return !1;
//                                     }
//                                     callback(e);
//                                 };
//                             }
//                             if (window['addEventListener']) {
//                                 window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
//                             } else {
//                                 window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
//                             }
//                          } else {
//                              // a polling loop is started & callback is called whenever the location.hash changes
//                              interval_id && clearInterval(interval_id);
//                              interval_id = null;
//                              if (callback) {
//                                  interval_id = setInterval(function() {
//                                      var hash = document.location.hash,
//                                      re = /^#?\d+&/;
//                                      if (hash !== last_hash && re.test(hash)) {
//                                          last_hash = hash;
//                                          callback({data: hash.replace(re, '')});
//                                      }
//                                  }, 100);
//                              }
//                          }
//                      }
//                 };
//             }();  

//             function sendMessage(msg, id){
//                 if( navigator.userAgent.indexOf("Firefox")!=-1 ) {
//                     XD.postMessage(msg, referer, getIframeWindow(window.frames["customFieldFrame_" + id]));
//                 } else {
//                     XD.postMessage(msg, referer, window.frames["customFieldFrame_" + id]);
//                 }
//             }

//             //note that we are binding receiveMessage on iframe load
//             XD.receiveMessage(function(message){
//                 //parse message
//                 var data = JSON.parse(message.data);

//                 console.log("SERVER: message coming form client type ", data.type);
//                 //sendSubmit
//                 if(data.type === "submit") {
//                     if(typeof data.value === 'number') {
//                         data.value = data.value + "";
//                     }
//                     var required = $(document.getElementById("input_" + data.qid)).hasClassName('widget-required');
//                     if(!(required)) {
//                         if(data.valid === false) {
//                             document.getElementById("input_" + data.qid).value = "widget not used";
//                         } else {
//                             if(data.value !== undefined) {
//                                 document.getElementById("input_" + data.qid).value = data.value;
//                             } else {
//                                 document.getElementById("input_" + data.qid).value = "";
//                             }
//                         }
//                     } else {
//                         if(data.valid === false) {
//                             JotForm.errored(document.getElementById("input_" + data.qid), "Please fill this field");
//                         } else {
//                             JotForm.corrected(document.getElementById("input_" + data.qid));
//                             if(data.value !== undefined) {
//                                 document.getElementById("input_" + data.qid).value = data.value;
//                             } else {
//                                 document.getElementById("input_" + data.qid).value = "";
//                             }
//                         }
//                     }

//                     //if no value was set, dont show it to submission data
//                     if ( typeof data.value === 'undefined' || data.value == false ) {
//                         var el = document.getElementById("input_" + data.qid);
//                         el.value = ''; el.removeAttribute('name');
//                     }

//                     var allInputs = document.getElementsByClassName("widget-required");
//                     var sendSubmit = true;
//                     for(var i=-0; i<allInputs.length; i++) {
//                         if(allInputs[i].value.length === 0) {
//                             sendSubmit = false;
//                         }
//                     }
//                     if(sendSubmit) {
//                         if(JotForm.validateAll()) {
//                             root.thisForm.submit();
//                         }
//                     }             
//                 }

//                 //sendData
//                 if(data.type === "data") {
//                     document.getElementById("input_" + data.qid).value = data.value;
//                 }

//                 //requestFrameSize
//                 if(data.type === "size") {
//                     var width = data.width
//                         , height = data.height;

//                     console.log("SERVER: resizing widget width", width, "height", height );
//                     if(width !== undefined && width !== null) {
//                         document.getElementById('customFieldFrame_' + data.qid).style.width = width + "px";
//                     }
//                     if(height !== undefined && height !== null) {
//                         document.getElementById('customFieldFrame_' + data.qid).style.height = height + "px";
//                     }
//                 }

//             }, 'http://'+this.src.match(/^(ftp:\/\/|https?:\/\/)?(.+@)?([a-zA-Z0-9\.\-]+).*$/)[3] );

//             //send auto ready message to widget
//             var msg = {
//                 type: "ready",
//                 formId: document.getElementsByName("formID")[0].value, 
//                 qid : id,
//                 background : getStyle(document.body, "background")
//             }
//             sendMessage(JSON.stringify({type:"ready", qid: id+"", formID: document.getElementsByName('formID')[0].value, background : getStyle(document.body, "background")}), id + ""); 

//             Event.observe(root.thisForm, 'submit', function(e){
//                 // Event.stop(e);
//                 Event.stop(e);
//                 sendMessage(JSON.stringify({type:"submit", qid: id+""}), id + ""); 
//             });   
//         }
//     }

//     // init();

//     return root;

// })({});