<!DOCTYPE html>

<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <!--                                           -->
    <!-- Any title is fine                         -->
    <!--                                           -->
    <title>IPO Book Building App</title>
    
    <!-- IMPORTANT : You must set the variable isomorphicDir to [MODULE_NAME]/sc/ so that the SmartGWT resource are 
	  correctly resolved -->	
	<script> var isomorphicDir = "Portal/sc/"; </script>
	
    <!--                                           -->
    <!-- This script loads your compiled module.   -->
    <!-- If you add any GWT meta tags, they must   -->
    <!-- be added before this line.                -->
    <!--                                           -->      
    <script type="text/javascript" language="javascript" src="Portal/Portal.nocache.js"></script>

    <!-- The following script is required if you're running (Super)DevMode and are using module
         definitions that contain <script> tags.  Normally, this script is loaded automatically
         by Portal.nocache.js above, but this isn't possible when (Super)DevMode is running.
         Note: it should not create any issue to always load it below (even if already loaded). -->
    <script type="text/javascript" language="javascript" src="Portal/loadScriptTagFiles.js"></script>

  </head>

  <!--                                           -->
  <!-- The body can have arbitrary html, or      -->
  <!-- you can leave the body empty if you want  -->
  <!-- to create a completely dynamic UI.        -->
  <!--                                           -->
  <body>

    <!--load the datasources-->
    <script src="Portal/sc/DataSourceLoader?dataSource=animals,supplyItem,employees,bidsession"></script>

    <!-- OPTIONAL: include this if you want history support -->
    <iframe src="javascript:''" id="__gwt_historyFrame" tabIndex='-1' style="position:absolute;width:0;height:0;border:0"></iframe>

  </body>
</html>
