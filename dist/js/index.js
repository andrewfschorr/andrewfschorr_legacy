!function r(e,n,t){function o(u,c){if(!n[u]){if(!e[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var a=n[u]={exports:{}};e[u][0].call(a.exports,function(r){var n=e[u][1][r];return o(n?n:r)},a,a.exports,r,e,n,t)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<t.length;u++)o(t[u]);return o}({1:[function(r,e,n){"use strict";var t=r("./thing"),o=["Hydrogen","Helium","Lithium","Beryl­lium"],i=(o.map(function(r){return r.length}),o.map(function(r){return r.length}));console.log(i),console.log((0,t.square)(11)),console.log((0,t.diag)(4,3))},{"./thing":2}],2:[function(r,e,n){"use strict";function t(r){return r*r}function o(r,e){return i(t(r)+t(e))}Object.defineProperty(n,"__esModule",{value:!0}),n.square=t,n.diag=o;var i=n.sqrt=Math.sqrt;console.log("hiiii")},{}]},{},[1]);