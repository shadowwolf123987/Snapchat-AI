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
export const allowedLogs={};function e(e,r){Object.values(allowedLogs).includes(r)?console.log(`value ${r} already exists.`):allowedLogs[e]=r}e("DCBrowserExt:Viewer:ExtnViewerPdfOpened","1"),e("DCBrowserExt:Viewer:PDFOpenedinMimeViewer","2"),e("DCBrowserExt:Viewer:Processing:LocalPDFFile","3"),e("DCBrowserExt:Viewer:Error:FallbackToNative:Preview:Failed","4"),e("DCBrowserExt:Viewer:Iframe:Creation:Failed","5"),e("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed","6"),e("DCBrowserExt:Viewer:Error:Handshake:TimedOut","7"),e("DCBrowserExt:Viewer:FallbackToNative:Failed","8"),e("Viewer Iframe created","9"),e("indexeddb could not be opened","10"),e("Error in transaction","11"),e("Error in updating buffer","12"),e("Error in getting buffer","13"),e("Error in deleting buffer","14"),e("DCEdgeExt:Viewer:ExtnViewerPdfOpened","15"),e("DCEdgeExt:Viewer:PDFOpenedinMimeViewer","16"),e("DCEdgeExt:Viewer:Processing:LocalPDFFile","17"),e("DCEdgeExt:Viewer:Error:FallbackToNative:Preview:Failed","18"),e("DCEdgeExt:Viewer:Iframe:Creation:Failed","19"),e("DCEdgeExt:Viewer:Error:Linearization:InitialBuffer:Failed","20"),e("DCEdgeExt:Viewer:Error:FallbackToNative:FileDownload:Failed","21"),e("DCEdgeExt:Viewer:Error:Handshake:TimedOut","22"),e("DCEdgeExt:Viewer:FallbackToNative:Failed","23"),e("DCBrowserExt:Extension:Installed:Admin:Op","24"),e("DCEdgeExt:Extension:Installed:Admin:Op","25"),e("Error in reopening tab","26"),e("DCBrowserExt:Gdrive:UserId:NotFound","27"),e("DCBrowserExt:Gdrive:FileId:NotFound","28"),e("DCEdgeExt:Gdrive:UserId:NotFound","29"),e("DCEdgeExt:Gdrive:FileId:NotFound","30"),e("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin","31"),e("DCEdgeExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin","32");