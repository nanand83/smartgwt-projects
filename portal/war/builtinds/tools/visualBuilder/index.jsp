<% 

%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%@ page import="com.isomorphic.base.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.auth.*" %>
<%@ page import="com.isomorphic.servlet.*" %>
<%@ page import="java.util.*" %>
<%
    RequestContext requestContext = RequestContext.instance(this, request, response, out);
    String username = requestContext.request.getRemoteUser();
    boolean authenticated = username != null;
%>
<%!

    private Config baseConfig;
    private boolean allowAnyRPC = false;
    private final Set enabledBuiltinMethods = new HashSet();
    private boolean useIDACall = false;

    private final boolean isBuiltinMethodEnabled(String methodName) {
        return (allowAnyRPC || enabledBuiltinMethods.contains(methodName));
    }

    private final boolean isPrefixEnabled(String methodName, String prefix) {
        try {
            BuiltinRPC.validateFileDir(prefix, methodName);
        } catch (Exception nope) {
            return false;
        }
        return true; 
    }
%>

<%
    // Lets get the path of the current page and replace index.jsp with vbOperations.jsp
    final String vbOperationsPath = request.getRequestURI().replace("/index.jsp", "/vbOperations.jsp");
    // Now we can fetch the vbOperations.jsp resource, if null it's not there.
    final boolean vbOperationsDoesNotExist = application.getResource(vbOperationsPath) == null;

    ISCInit.go(getClass().getName());
    baseConfig = Config.getGlobal();

    enabledBuiltinMethods.addAll(baseConfig.getList("RPCManager.enabledBuiltinMethods"));
    allowAnyRPC = enabledBuiltinMethods.contains("*");

    // Use IDACall if the server is explicitly configured to use it or if vbOperations.jsp does not exist.
    useIDACall = baseConfig.getBoolean("VisualBuilder.useIDACall", false) || vbOperationsDoesNotExist;

    // if currentScreen param has been provided, it will override normal screen selection logic
    final String initialScreen = request.getParameter("currentScreen");

    // If the mockups param is present, and is anything but "0" or (case-insensitive) "no", then
    // consider it be a request to run VB in Mockup Mode
    String mockups = request.getParameter("mockups");
    final boolean mockupMode = mockups != null && !"0".equals(mockups) && 
                                       !"no".equalsIgnoreCase(mockups);

    final String title = (mockupMode ? "SmartMockups" : "SmartClient Visual Builder");
%>
<!DOCTYPE html>
<HTML>
<HEAD>
<TITLE><%=title%></TITLE>
<link href="/favicon.ico?isc_version=v12.1p_2020-05-06.ico" rel="shortcut icon" type="image/x-icon" />
<LINK REL=StyleSheet HREF="visualBuilder.css?isc_version=v12.1p_2020-05-06.css" TYPE="text/css">
</HEAD>
<BODY STYLE="overflow:hidden">

<!-- these lightbox divs need to be at top level or they fail to position above all page content for some reason, despite
      being position: fixed; and having a higher z-index than anything else on the page.  Possibly has something to do
      with the HTMLFlow that is used to load the help content that these were previously in...it seems like they may
      be inheriting the z-index of the canvas that loaded them, however strange that seems -->
<div id="light_databindingV2">
    <a class="boxclose_databindingV2" id="boxclose_databindingV2" onclick="lightbox_close('databindingV2');"></a>
    <video id="databindingV2" preload="none" controls>
        <source src="https://www.smartclient.com/media/databindingV2.mp4" type="video/mp4">
    </video>
</div>
<div id="fade_databindingV2" onClick="lightbox_close('databindingV2');"></div>
<div id="light_reifyIntroLayoutsV2">
    <a class="boxclose_reifyIntroLayoutsV2" id="boxclose_reifyIntroLayoutsV2" 
        onclick="lightbox_close('reifyIntroLayoutsV2');"></a>
    <video id="reifyIntroLayoutsV2" preload="none" controls>
        <source src="https://www.smartclient.com/media/reifyIntroLayoutsV2.mp4" type="video/mp4">
    </video>
</div>
<div id="fade_reifyIntroLayoutsV2" onClick="lightbox_close('reifyIntroLayoutsV2');"></div>

<%
if (authenticated) {
   requestContext.jsTrans.toJSVariableInScript(Boolean.valueOf(authenticated), "authenticated", out);    
   requestContext.jsTrans.toJSVariableInScript(username, "username", out);    
}

String skin = request.getParameter("skin");
if (skin == null || "".equals(skin)) skin = "Tahoe";

String nSkin = request.getParameter("useNativeSkin");
boolean useNativeSkin = nSkin == null || "1".equals(nSkin);

String modules = "AdminConsole,Tools,DocViewer,FileBrowser,Drawing,Workflow";
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
%>
<!-- load Isomorphic SmartClient -->
<isomorphic:loadISC modulesDir="system/development/" skin="<%=skin%>" includeModules="<%=modules%>"/>
<SCRIPT>

isc.nativeSkin = <%=useNativeSkin%>;
if (!<%= useIDACall %>) {
    RPCManager.actionURL = Page.getAppDir() + "vbOperations.jsp";
}

isc.isVisualBuilderSDK = true;
isc.Page.setAppImgDir("graphics/");
isc.Page.leaveScrollbarGap = false;
isc.Dialog.addClassProperties({
    loadingImageSrc: "reifyLoading.gif"
});
</SCRIPT>

<!-- Additional ToolSkin to apply to Tools controls -->
<%if (useNativeSkin) {%>
    <isomorphic:loadSkin skin="ToolSkinNative"/>
<%} else {%>
    <isomorphic:loadSkin skin="ToolSkin"/>
<%}%>
<!-- load application logic -->
<isomorphic:loadModules modulesDir="system/development/" modules="VisualBuilder,SalesForce,SystemSchema"/>

<SCRIPT>
<isomorphic:loadDS ID="vbScreens,vbSettings,vbProjects,vbDataSources,userSkin" />
</SCRIPT>

<%

%>
<SCRIPT>
isc.defineClass("JSDoc");
isc.jsdoc = isc.JSDoc;
isc.JSDoc.addClassProperties({
    hasData : function () { return false; }
});
</SCRIPT>
<isomorphic:loadModules modulesDir="system/development/" modules="ReferenceDocs" defer="true"/>

<SCRIPT>var screenConfiguration = null;</SCRIPT>
<%if (initialScreen == null) {%>
<SCRIPT>var screenConfiguration;</SCRIPT>
<%} else {%>
<SCRIPT>var screenConfiguration = {initialScreen: "<%=initialScreen%>"};</SCRIPT>
<%}%>

<SCRIPT>

var fontIncrease = isc.getParams().fontIncrease;
if (fontIncrease == null) fontIncrease = 0;// 3;
fontIncrease = parseInt(fontIncrease);
isc.Canvas.resizeFonts(fontIncrease);
isc.Canvas.resizePadding(fontIncrease);

var sizeIncrease = isc.getParams().sizeIncrease;
if (sizeIncrease == null) sizeIncrease = 0;// 10;
sizeIncrease = parseInt(sizeIncrease); 
isc.Canvas.resizeControls(sizeIncrease);   

var ignoreProgramErrors  = isc.getParamBooleanValue("ignoreProgramErrors");
var ignoreServerCommLoss = isc.getParamBooleanValue("ignoreServerCommLoss");

var useIDACall = <%= useIDACall %>;
window.builder = isc.VisualBuilder.create({
    width: "100%",
    height: "100%",
    autoDraw: true,modulesDir:'modules/',
    userId: <% requestContext.jsTrans.toJS(username, out); %>,

    saveFileBuiltinIsEnabled: !useIDACall || <%= isBuiltinMethodEnabled("saveFile")  && isPrefixEnabled("[TOOLS]", "saveFile") %>,
    loadFileBuiltinIsEnabled: !useIDACall || <%= isBuiltinMethodEnabled("loadFile") %>,
    filesystemDataSourceEnabled: !useIDACall || <%= baseConfig.getBoolean("FilesystemDataSource.enabled", false) %>,

	skin: "<%=skin%>",
    defaultApplicationMode: "edit",
    showModeSwitcher: true,
    mockupMode: <%=mockupMode%>,
    singleScreenMode: false,
    
    allowScreenCodeEditing: true,
    ignoreProgramErrors: ignoreProgramErrors,
    ignoreServerCommLoss: ignoreServerCommLoss,

    // provide an initial top-level VLayout that is appropriate for a fullscreen app:
    // take up whole browser, never overflow
    initialComponent: {
        type: "DataView",
        defaults: {
            overflow: "hidden",
            width: "100%",
            height: "100%",
            // this is enough to make it obvious that a badly scrunched component
            // such as a ListGrid is actually a scrunched ListGrid and not just a
            // 1px black line (which happens with the default minMemberSize of 1)
            minMemberLength: 18
        }
    }
}, screenConfiguration);

<% if (request.getParameter("mockup") != null) { %>
var mockupParam = '<% out.write(request.getParameter("mockup")); %>';
<% } else { %>
var mockupParam = "";
<% } %>

if (mockupParam != "") {
    window.builder.loadBMMLMockup(mockupParam);
}

</SCRIPT>

</BODY>
</HTML>
