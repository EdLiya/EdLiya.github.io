Event.Publisher=Class.create(),Object.extend(Event.Publisher,{_ls_event_targets:null,_event_source_id:null,_fl_trace_events:!1,getEventSourceId:function(){return"function"==typeof this._event_source_id?this._event_source_id():this._event_source_id},getEventTarget:function(a){return this._ls_event_targets||(this._ls_event_targets=new Array),this._ls_event_targets[a]||document.body.appendChild(this._ls_event_targets[a]=document.createElement("A")),this._ls_event_targets[a]},addEventListener:function(a,b,c){var d=this.getEventTarget(a);if(Event.observe(d,"click",b,c),this._fl_trace_events){var e={publisher:this.getEventSourceId(),event_name:a,listener:b,capturing:c,event_source_proxy:d};this.dispatchEvent("eventListenerAdded",e,!0,!0)}},removeEventListener:function(a,b,c){var d=this.getEventTarget(a);if(Event.stopObserving(d,"click",b,c),this._fl_trace_events){var e={publisher:this.getEventSourceId(),event_name:a,listener:b,capturing:c,event_source_proxy:d};this.dispatchEvent("eventListenerRemoved",e,!0,!0)}},dispatchEvent:function(a,b,c,d){var e=this.getEventTarget(a),f={event_name:a,event_target:this,data:b?b:null};c||(c=!1),d||(d=!1);var g=Event.create(f,c,d,!0,e);if(this._fl_trace_events){if(a.match(/event(?:ListenerAdded|ListenerRemoved|Dispatched|Received)/))return;var b={publisher:this.getEventSourceId(),event_name:a,event_data:f,can_bubble:c,cancelable:d,event_source_proxy:e,result:g};this.dispatchEvent("eventDispatched",b,!0,!0)}},toggleEventsTrace:function(){var a=Event.Tracer.findTracer();return a&&this._fl_trace_events?(this._fl_trace_events=!1,a&&a.unregisterPublisher(this)):(this._fl_trace_events=!0,a=Event.Tracer.startTrace(),a.registerPublisher(this)),this._fl_trace_events},isEventsTraceActive:function(){return this._fl_trace_events}}),Event.Listener=Class.create(),Object.extend(Event.Listener,{_listens:null,getEventHandlerName:function(a){var b=a.split(/[ _]/).join("-").camelize();return"on"+b.charAt(0).toUpperCase()+b.substr(1)},listenForEvent:function(a,b,c,d){d||(d=this.getEventHandlerName(b)),this._listens||(this._listens=new Array);var e=this[d];"function"==typeof d&&(e=d);var f=function(a){a.event_data&&e.bindAsEventListener(this)(a)}.bindAsEventListener(this);this._listens.push([a,b,c,d,f]),a.addEventListener(b,f,c)},stopListeningForEvent:function(a,b,c,d){if(!this._listens)return!1;d||(d=this.getEventHandlerName(b));var e=-1,f=this._listens.detect(function(f,g){return f[0]==a&&f[1]==b&&f[2]==c&&f[3]==d?(e=g,!0):void 0});return e>=0?(this._listens.splice(e,1),a.removeEventListener(b,f[4],c),!0):!1}}),Object.extend(Event,{create:function(a,b,c,d,e){var f;return document.createEvent?(b||(b=!1),c||(c=!1),/Konqueror|Safari|KHTML/.test(navigator.userAgent)?(f=document.createEvent("HTMLEvents"),f.initEvent("click",b,c)):(f=document.createEvent("MouseEvents"),f.initMouseEvent("click",b,c,window,0,0,0,0,0,!1,!1,!1,!1,0,null))):(f=document.createEventObject(),f.event_type="onclick"),f.event_data=a,d&&Event.dispatch(e,f),f},dispatch:function(a,b){return document.createEvent?a.dispatchEvent(b):a.fireEvent("undefined"!=typeof b.event_type?b.event_type:"onclick",b)}});