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
import state from"./state.js";const ACROBAT_ICON_CLASS="acrobat-icon",ACROBAT_LISTENER_ADDED="acrobat-listener-added",ACROBAT_CONTENT_SCRIPT_DISCONNECT_START="acrobatContentScriptDisconnectStart",LIST_VIEW="LIST_VIEW",createAcrobatIconElement=()=>{const e=document.createElement("img");return e.setAttribute("src",state?.iconURL),e.setAttribute("class","acrobat-icon"),e},getElementBasedOnSelector=(e,t,n)=>{if(e){const r=state?.gmailConfig?.selectors,l=r&&r[n]&&r[n][t];for(let t=0;t<l?.length;t++){let n=e.querySelector(l[t]);if(n)return n}}return null},getClosestElementBasedOnSelector=(e,t,n)=>{if(e){const r=state?.gmailConfig?.selectors,l=r&&r[n]&&r[n][t];for(let t=0;t<l?.length;t++){let n=e.closest(l[t]);if(n)return n}}return null},getArrayElementBasedOnSelector=(e,t,n)=>{if(e){const r=state?.gmailConfig?.selectors,l=r&&r[n]&&r[n][t];for(let t=0;t<l?.length;t++)if(e?.querySelector(l[t])){const n=e?.querySelectorAll(l[t]);if(n&&n.length>0)return n}}return null},getFileDetailsElementInNativeViewer=()=>getElementBasedOnSelector(document,"lightBoxViewerFileDetails","nativeViewer"),isOrphanContentScript=()=>!chrome?.runtime?.id,eventStringSet=new Set,sendAnalyticsOnce=e=>{eventStringSet.has(e)||(eventStringSet.add(e),sendAnalytics([e]))},sendAnalytics=e=>{try{chrome.runtime.sendMessage({main_op:"analytics",analytics:e})}catch(e){}},createURLForAttachment=(e,t,n)=>{let r=e?.replace("disp=safe","disp=inline");return t&&(r=r+"&acrobatPromotionSource="+t),state?.viewerURLPrefix&&(r=`${state.viewerURLPrefix}?pdfurl=${encodeURIComponent(r)}`,n&&(r=r+"&pdffilename="+encodeURIComponent(n))),r};sendAnalytics([["DCBrowserExt:Gmail:PromotionFeature:Enable"]]);export{ACROBAT_CONTENT_SCRIPT_DISCONNECT_START,ACROBAT_LISTENER_ADDED,LIST_VIEW,sendAnalytics,sendAnalyticsOnce,getFileDetailsElementInNativeViewer,getArrayElementBasedOnSelector,getElementBasedOnSelector,getClosestElementBasedOnSelector,createAcrobatIconElement,isOrphanContentScript,createURLForAttachment};