<%
// This file allows the execution of "Builtin RPCs" which are unsafe in
// environments where users are not trusted. If Visual Builder is deployed in
// production, this file should be protected by an authentication system and/or
// restricted to adminstrator users.

%><%@ page import="java.io.*"
%><%@ page import="java.util.*"
%><%@ page import="java.lang.reflect.*"

%><%@ page import="javax.servlet.*"
%><%@ page import="javax.servlet.http.*"

%><%@ page import="com.isomorphic.base.*"
%><%@ page import="com.isomorphic.util.*"
%><%@ page import="com.isomorphic.io.*"
%><%@ page import="com.isomorphic.log.*"
%><%@ page import="com.isomorphic.servlet.*"
%><%@ page import="com.isomorphic.xml.*"
%><%@ page import="com.isomorphic.store.*"
%><%@ page import="com.isomorphic.application.*"
%><%@ page import="com.isomorphic.rpc.*"
%><%@ page import="com.isomorphic.js.*"
%><%@ page import="com.isomorphic.datasource.*"

%><%!
    private Config baseConfig;

%><%
ISCInit.go(getClass().getName());
baseConfig = Config.getGlobal();
if (baseConfig.getBoolean("MockupImporter.useIDACall", false)) {
    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Because MockupImporter.useIDACall in the server config is set, bmmlImporterOperations.jsp is disabled.");
    return;
}

RequestContext requestContext = RequestContext.instance(this, request, response, out);
RPCManager rpc;
try {
    rpc = new RPCManager(request, response, out);
    // Enable access to FilesystemDataSource
    rpc.enableAllDataSources();
} catch (ClientMustResubmitException e) { 
    return; 
}

for(Iterator i = rpc.getRequests().iterator(); i.hasNext();) {
    Object req = i.next();
    try {
        if (req instanceof RPCRequest) {
            RPCRequest rpcRequest = (RPCRequest)req;
            // See reference documentation on "Tools Deployment" for more information on tool security.
            //
            // To limit access to an explicit set of BuiltinRPC methods, uncomment the following lines:
            //     String[] allowedBuiltIns = {"xmlToJS", "loadFile", "saveFile", "getDefinedDataSources", "downloadClientContent"};
            //     String appID = rpcRequest.getAppID();
            //     if ("isc_builtin".equals(appID)) {
            //         String methodName = rpcRequest.getMethodName();
            //         if (!Arrays.asList(allowedBuiltIns).contains(methodName)) {
            //             throw new Exception("Attempt to execte RPC DMI BuiltIn '" + methodName
            //                  +"' DENIED.");
            //         }
            //     }

	        RPCResponse rpcResponse;
	        try {
	            // To limit access to BuiltIn methods defined in server.properties, replace
	            // the line below with:
	            //     rpcResponse = RPCDMI.execute(rpcRequest, rpc, rpcRequest.context);
	            rpcResponse = RPCDMI.execute(rpcRequest, rpc, requestContext, true);
	            if (rpcResponse == null) rpcResponse = rpcRequest.execute();
	        } catch (Exception e) {
                rpcResponse = IDACall._handleRPCRequestError(rpcRequest, rpc, requestContext, e);
	        }
	
	        rpc.send(rpcRequest, rpcResponse);
        } else {
            DSRequest dsRequest = (DSRequest)req;
            DSResponse dsResponse = null;
            try { 
                dsResponse = dsRequest.execute();
            } catch (Exception e) {
                dsResponse = IDACall._handleDSRequestError(dsRequest, rpc, requestContext, e);
            }
            rpc.send(dsRequest, dsResponse);
        }
    } catch (Throwable t) {
        ServletTools.handleServletError(response, "Error in RPCManager.completeResponse()", t);
    }
} // for(requests)

%>