/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{OFFSCREEN_DOCUMENT_PATH as e}from"../common/constant.js";import{dcLocalStorage as t}from"../common/local-storage.js";import{common as o}from"./common.js";import{communicate as n}from"./communicate.js";import{Proxy as r}from"./proxy.js";import{util as s}from"./util.js";let i=null;i||(i=new function(){this.proxy=r.proxy.bind(this),this.getDocState=function(e){const o=t.getItem("filesData")||{};if(o.filePath)try{const t=new Map(JSON.parse(o.filePath));if(!t.has(e))return;return t.get(e)}catch(e){}},this.setupWorkerOffscreen=async function(n){if(t.getItem("rrv")){const r=o.getEnv(),i=`${e}?env=${r}&rrv=true`;if(await s.setupOffscreenDocument({path:i,reasons:[chrome.offscreen.Reason.IFRAME_SCRIPTING],justification:"Load iframe in offscreen document"}),t.getItem("lrrv")&&n&&!n.startup&&n.acceptRanges&&n.pdfSize>0){const e=this.getDocState(n.pdfURL)||{};chrome.runtime.sendMessage({main_op:"getLinearizedRendition",target:"offscreen",tabId:n.tabId,pdfURL:decodeURIComponent(n.pdfURL),pdfSize:n.pdfSize,docLastOpenState:e})}}},this.closeOffscreenDocument=function(){chrome.offscreen.closeDocument()},this.rapidRenditionResponse=function(e){delete e.main_op,e.content_op="rapidRenditionResponse",chrome.tabs.sendMessage(e.tabId,e)},this.rapidRenditionError=function(e){delete e.main_op,e.content_op="rapidRenditionError",chrome.tabs.sendMessage(e.tabId,e)}}),n.registerHandlers({setupWorkerOffscreen:i.proxy(i.setupWorkerOffscreen),closeOffscreenDocument:i.proxy(i.closeOffscreenDocument),rapidRenditionResponse:i.proxy(i.rapidRenditionResponse),rapidRenditionError:i.proxy(i.rapidRenditionError)});export const offscreenActions=i;