<% 

%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%@ page import="com.isomorphic.base.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.auth.*" %>
<%@ page import="com.isomorphic.site.*" %>
<%@ page import="com.isomorphic.servlet.*" %>
<%@ page import="java.util.*" %>
<%
String email   = request.getParameter("email");   // invited user's email
String orgId   = request.getParameter("orgId");   // organization id
String ownerId = request.getParameter("ownerId"); // org owner's userid

RequestContext requestContext = RequestContext.instance(this, request, response, out);
String result = ManageOrg.acceptInvite(requestContext, ownerId, orgId, email);
%>
<!DOCTYPE html>
<HTML>
<HEAD>
<META http-equiv="refresh" content="8;url=http://www.reify.com/" />
<STYLE>
.reifyFont {
    color:white;
    font-weight:300;
    font-family:'Brandon Text',sans-serif;
    background-color:#32373C;
}
</STYLE>
</HEAD>
<BODY STYLE="overflow:hidden">
<SCRIPT>
</SCRIPT>
<DIV style="height:200px;width:680px;vertical-align:middle;display:table-cell">
<IMG style="height:150px;display:block;margin-left:auto;margin-right:auto"
     src="graphics/BigReifyLogo.png"/>
</DIV>
<%=result%>
</DIV>
<DIV class="reifyFont" style="margin-top:30px;padding:40px;width:600px">
<IMG src="graphics/ReifyLogoWhite.png"/>
<div style="height:50px;vertical-align:middle;display:table-cell">
Low-code. All devices. No limits</div>
<div style="font-size:12px">The Reify low-code platform lets you visually design powerful,
mobile-adaptive enterprise applications in a collaborative cloud-based tool. Reify creates
100% declarative code that can be directly deployed for access from any device, or can be
integrated into an IDE-based project, while still editable in the cloud!</div>
<div style="height:50px;font-size:12px;vertical-align:middle;display:table-cell">
&copy; 2008 and beyond Isomorphic Software. All Rights Reserved.
</div>
</DIV>
</DIV>
</BODY>
</HTML>
