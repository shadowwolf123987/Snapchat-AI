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
import{util as n}from"../js/content-util.js";import{dcLocalStorage as t}from"../../common/local-storage.js";import{COOLDOWN_FOR_DOWNLOAD_BANNER as e}from"../../common/constant.js";import{events as o}from"../../common/analytics.js";var s=null;const a=async()=>s||new Promise((n=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){s=t[0],n(t[0])}))}));$(document).ready((()=>{n.translateElements(".translate"),$("#turnOnButton").click((()=>{t.setWithTTL("downloadBanner",!0,e),n.sendAnalytics(o.DOWNLOAD_BANNER_TURN_ON_CLICKED),a().then((e=>{n.openExtensionSettingsInWindow(e,(function(){chrome.tabs.sendMessage(e.id,{content_op:"dismissBanner"})})),t.setItem("lastOpenTabId",e.id)}))})),$("#tripleDotMenu").click((()=>{const t=document.getElementById("menuList");t.style.display&&"none"!==t.style.display?t.style.display="none":(n.sendAnalytics(o.DOWNLOAD_BANNER_MENU_SHOWN),t.style.top=$("#tripleDotMenu").offset().top-110+"px",t.style.display="block")})),$("#closeButton").click((()=>{n.sendAnalytics(o.DOWNLOAD_BANNER_CLOSE_CLICKED),a().then((n=>{chrome.tabs.sendMessage(n.id,{content_op:"dismissBanner"})}))})),$("#doNotShowButton").click((()=>{n.sendAnalytics(o.DOWNLOAD_BANNER_DONT_SHOW_AGAIN_CLICKED),a().then((n=>{chrome.tabs.sendMessage(n.id,{content_op:"dismissBanner"});const e=t.getItem("downloadBannerData")||{};e.doNotShow=!0,t.setItem("downloadBannerData",e)}))}))}));