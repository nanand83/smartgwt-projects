<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%
    Config iscConfig = Config.getGlobal();

    boolean hosted = "1".equals(request.getParameter("hosted"));

    String isomorphicURI = (String)request.getAttribute("isomorphicURI");
    if (isomorphicURI == null) isomorphicURI = "../../isomorphic/";

    String vbt_version = (String)request.getAttribute("vbt_version");
    String vbt_deploymentType = (String)request.getAttribute("vbt_deploymentType");
    String vbt_orgUrlFragment = (String)request.getAttribute("vbt_orgUrlFragment");
    String vbt_deploymentName = (String)request.getAttribute("vbt_deploymentName");
    Map deploymentRecord = (Map)request.getAttribute("vbt_deploymentRecord");

    String shareId = request.getParameter("shareId");
    if (shareId == null) shareId = (String)request.getAttribute("vbd_shareId");

    boolean isDeployment = request.getAttribute("vbt_isDeployment") != null;
    boolean isRun = "true".equals((String)request.getAttribute("vbd_isRun"));
    boolean isShared = shareId != null;

    String projectIsomorphicURI = (String)request.getAttribute("projectIsomorphicURI");
    if (projectIsomorphicURI == null) projectIsomorphicURI = isomorphicURI;
    /*
    if (isDeployment) {
        // vbt_version is subbed in by SandboxFilter
        projectIsomorphicURI = "/vbt/"+vbt_version+"/"+vbt_deploymentType+"/"+vbt_orgUrlFragment
            +"/"+vbt_deploymentName+"/isomorphic/";
    }
    */


    String vbRootURL = isomorphicURI+"../tools/visualBuilder/";

    RequestContext context = RequestContext.instance(this, request, response, out); 
    AuthenticatedUser user = (AuthenticatedUser)Authentication.getUser(context);       
    String webRoot = iscConfig.getPath("webRoot");
    String toolsDir = iscConfig.getPath("toolsDir");

    String locale = request.getParameter("locale");
    String viewType = isDeployment ? "project" : request.getParameter("type");
    String screenName = request.getParameter("screen");
    String projectName = request.getParameter("project");
    String ownerId = request.getParameter("ownerId");
    if (ownerId == null) ownerId = request.getRemoteUser();
    if (isDeployment) ownerId = null;

    if (isShared) {
        DSRequest sharedDSRequest = new DSRequest("sharedProjects", "fetch");
        sharedDSRequest.setCriteria(DataTools.buildMap("shareId", shareId));
        DSResponse sharedDSResponse = sharedDSRequest.execute();
        Map record = sharedDSResponse.getRecord();
        if (record == null) throw new Exception("Invalid shareId");
        String paramString = (String)record.get("parameters");
        Map params = ServletTools.parseQueryString(paramString);
        viewType =  (String)params.get("type");
        screenName = (String)params.get("screen");
        projectName = (String)params.get("project");
        ownerId = null;
    } else if (isDeployment) {
        projectName = (String)deploymentRecord.get("sourceProjectName");
    }
    String skin = request.getParameter("skin");
    if (skin == null) skin = "Tahoe";

    String device = request.getParameter("device");
    String density = request.getParameter("density");
    Integer fontIncrease = null;
    Integer sizeIncrease = null;
    if (density != null) {
        switch (density) {
            case "dense":    fontIncrease = 0; sizeIncrease = 0; break;
            case "compact":  fontIncrease = 1; sizeIncrease = 2; break;
            case "medium":   fontIncrease = 2; sizeIncrease = 4; break;
            case "expanded": fontIncrease = 2; sizeIncrease = 6; break;
            case "spacious": fontIncrease = 3; sizeIncrease = 10; break;
        }
    }

    String realTimeUpdates = request.getParameter("realTimeUpdates");

    String modules = "Drawing,Workflow";
    //>Charts
    modules += ",Charts";
    //<Charts
    //>Analytics
    modules += ",Analytics";
    //<Analytics
    //>RealtimeMessaging
    modules += ",RealtimeMessaging";
    //<RealtimeMessaging
    //>PowerFeatures
    if (modules.indexOf("Analytics") < 0) modules += ",?Analytics";
    //<PowerFeatures

    String pageTitle = projectName;
    String frameworkIsomorphicURI = "/isomorphic/";
%>
<HTML><HEAD><TITLE><%=pageTitle%></TITLE>

<!--CSS for loading message at application start-->
<STYLE type="text/css">
    html, body { overflow:hidden }
    #loadingWrapper {
        position: absolute;
        top: 40%;
        width: 100%;
        text-align: center;
        z-index: 900001;
    }
    #loading {
        margin: 0 auto;
        border: 1px solid #ccc;
        width: 180px;
        padding: 2px;
        text-align: left;
    }
    #loading a {
        color: #225588;
    }
    #loading .loadingIndicator {
        background: white;
        font: bold 13px tahoma, arial, helvetica;
        padding: 10px 5px 10px 10px;
        margin: 0;
        height: auto;
        color: #444;
    }
     #loadingMsg {
        font: normal 10px arial, tahoma, sans-serif;
    }
</STYLE></HEAD><BODY>

<%if (isDeployment) {%>
<!--add loading indicator while the app is being loaded-->
<div id="loadingWrapper">
<div id="loading">
    <div class="loadingIndicator">
        <img src="/tools/visualBuilder/graphics/reifyLoading.gif" width="32" height="32"
             style="margin-right:8px;float:left;vertical-align:top;"/>
        <div id="reifyProjectName"><%=projectName%></div>
        <div id="loadingMsg">Loading Core API...</div>
    </div>
</div>
</div>
<%}%>

<script>
vbRootURL = "<%=vbRootURL%>";

<%if (isDeployment) {%>
// Report Framework API, documentation, and skin loading phases by hooking moduleLoaded event.
// Note that this approach means table is order dependent, as each module reports what's next.
(function showLoadingPhases() {
    var msgs = {
        Core: "UI Components",
        Forms: "Data API",
        DataBinding: "Calendar UI",
//>RealtimeMessaging
        DataBinding: "messaging",
        RealtimeMessaging: "Calendar UI",
//<RealtimeMessaging
        Calendar: "plugin support",
        PluginBridges: "drawing",
        Drawing: "tools",
//>Analytics
        Drawing: "analytics",
        Analytics: "tools",
//<Analytics
        Tools: "doc data",
        DocViewer: "Admin Tools",
        AdminConsole: "skins & styles"
    };
//>Charts
    msgs.Charts = msgs.Drawing, delete msgs.Drawing;
//<Charts
    
    window._isc_moduleLoadedHook = function (target,info) {
        var loadingMsg = msgs[info.moduleName];
        if (loadingMsg) {
            document.getElementById('loadingMsg').innerHTML = 'Loading ' + loadingMsg + '...';
        }
    }
})();

function clearLoadingPhases() {
    var loadingWrapper = document.getElementById('loadingWrapper');
    if (loadingWrapper) isc.Element.clear(loadingWrapper);
};
<%}%>

</script>
<isomorphic:loadISC isomorphicDir="<%=projectIsomorphicURI%>" isomorphicURI="<%=isomorphicURI%>" modulesDir="system/modules/" skin="<%=skin%>" includeModules="<%=modules%>"/>
<SCRIPT>
<%if (isDeployment) {%>
document.getElementById('loadingMsg').innerHTML = 'Loading app...';
<%}%>

// Allow use of Reify graphics as palette node defaults
isc.Page.setAppImgDir(vbRootURL+"graphics/");
isc.Authentication.logOutURL = "/auth/logout.jsp";
<%
if ("handset".equals(device)) out.append("isc.Browser.setIsHandset(true);");
else if ("tablet".equals(device)) out.append("isc.Browser.setIsTablet(true);");
else if ("desktop".equals(device)) out.append("isc.Browser.setIsDesktop(true);");

if (sizeIncrease != null) out.append("isc.Canvas.resizeControls(" + sizeIncrease + ");");
if (fontIncrease != null) out.append("isc.Canvas.resizeFonts(" + fontIncrease + ");");
 
out.append("var realTimeUpdates=" + realTimeUpdates + ";");
%>

<%
if ("screen".equals(viewType)) {
    out.append(Screen.getLoadScript(screenName, ownerId));

} else if ("project".equals(viewType)) {

    ProjectLoadSettings settings = new ProjectLoadSettings();

    String currentScreenName = request.getParameter("currentScreen");
    boolean singleScreenMode = "1".equals(request.getParameter("singleScreenMode"));
    String testUserId = request.getParameter("userId");
    
    settings.setSingleScreenMode(singleScreenMode);
    settings.setCurrentScreenName(currentScreenName);
    settings.setOwnerId(ownerId);
    settings.setLocale(locale);
    settings.setShareId(shareId);
    settings.setTestUserId(testUserId);

    if (isDeployment) {
        settings.setCurrentUser(user);
        settings.setCallbackJS("clearLoadingPhases();");
    }

    out.append(Project.getLoadScript(projectName, settings));

} else {
    throw new Exception("Invalid viewType: " + viewType);
}
%>

if (realTimeUpdates && isc.Messaging) {
    var liveUpdates = isc.Class.create({
        inactivityDelay: 20 * 60 * 1000,    // 20 minutes
        inactivityMessage: "Auto-refreshing has been turned off due to inactivity.",
        reconnectTitle: "Re-connect",

        connect : function () {
            var _this = this;
            isc.Messaging.subscribe(realTimeUpdates, function (data) {
                // Refresh page
                window.location.reload();
            });
            this.refreshInactivityTimer();
        },

        refreshInactivityTimer : function () {
            // Dismiss outstanding message if showing
            if (this._currentMessageID) {
                isc.Notify.dismissMessage(this._currentMessageID);
                delete this._currentMessageID;
            }

            // Cancel previous timer
            if (this.inactivityTimer != null) isc.Timer.clearTimeout(this.inactivityTimer);

            var _this = this;
            this.inactivityTimer = isc.Timer.setTimeout(function () {
                isc.Messaging.unsubscribe(realTimeUpdates);
                _this._currentMessageID = isc.Notify.addMessage (_this.inactivityMessage, [
                    { title: _this.reconnectTitle, target: liveUpdates, methodName: "connect" }
                ], "warn", {
                    position: "TR",
                    canDismiss: true,
                    duration: 0    // don't auto-dismiss
                })
            }, this.inactivityDelay);
        }
    });

    liveUpdates.connect();
}

</SCRIPT>

</BODY>
</HTML>
<%!
public String isc_getShortURI(HttpServletRequest request) {
    String uri = request.getRequestURI();
    int slashIndex = uri.lastIndexOf("/");
    if(slashIndex != -1) uri = uri.substring(slashIndex+1);
    return uri;
}
%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>

<%@ page import="com.isomorphic.base.*" %>
<%@ page import="com.isomorphic.auth.*" %>
<%@ page import="com.isomorphic.util.*" %>
<%@ page import="com.isomorphic.js.*" %>
<%@ page import="com.isomorphic.xml.Project" %>
<%@ page import="com.isomorphic.xml.ProjectLoadSettings" %>
<%@ page import="com.isomorphic.xml.Screen" %>
<%@ page import="com.isomorphic.servlet.RequestContext" %>
<%@ page import="com.isomorphic.servlet.ServletTools" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%@ page import="com.isomorphic.io.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.tools.*" %>
<%@ page import="com.isomorphic.log.*" %>
<%@ page import="com.isomorphic.collections.*" %>

