# smartgwt-projects

### List of Utilities
1. CustomCrypto - Implements static encrypt/decrypt methods that implements Symmetric Key encryption
2. DataProcessor - Is a standalone SmartGwt Application that inserts bulk data into a SqlDataSource.
3. CustomAfterInitServlet - Hooks into Servlet startup and handles encrypted passwords for datasources, using ```CustomCrypto``` - Can be further extended to add other capabilities. 

#### May 8 2020:       
1. Initial Commit.  
2. Set up Eclipse workspace with smartgwt and gwt 
3. BuiltInDS sample imported into workspace with default HSQLDB. Studied behavior of DataSources.

#### May 9 2020:
1. Set up MySQL Datasource connection.
2. Familiarized with Admin Console, Importing test data, etc.
3. Implemented Custom Config Hook to handle encrypted password for db.
                  
#### May 10 2020:
1. Fixed Inherits hierarchy in .gwt.xml to fix image/skins loading issue on Admin Console.
  The key was to have the Enterprise inherit ahead of Admin Console inherits, so that the right skins are copied over.
  ```
  <inherits name="com.smartclient.theme.enterprise.Enterprise"/>
  <inherits name="com.smartgwtee.SmartGwtEE"/>
  <inherits name="com.smartgwtee.tools.Tools"/>
  ```
2. Implemented a Data Processor to perform a manual load of data into a SqlDataSource, in an attempt to understand the underpinnings:
    - Standalone SmartGwt application relies on server.properties - The ```webRoot``` setting is key.
    - ```ISCInit.go()``` prepares the SmartGwt environment. This is critical so as to work with DataSourceManager, ServletTools and other server-side SmartGwt tools.
    - Can prove useful if there's a need for Batch jobs running on same web-hosted environment. 


#### May 11 2020:
1. Created an IPOBookBuildingApp with HLayout and SectionStack. 
   ##### References/Credits: 
   - https://www.smartclient.com/smartgwt/showcase/#featured_complete_app

2. Created a Server-side SqlDatasource (xml-based) for ```bidsession```. Created schema objects using Admin Console.

3. Created a Client-side RestDataSource for ```applications``` with static responses. The idea is to retrieve all entitled applications for the logged in SSO User, on load of the ApplicationListGrid component. 
   ##### References/Credits:
   - https://www.smartclient.com/smartgwt/showcase/#featured_restfulds 


#### May 12 2020:
Top, Left Application layout set up. And then some cosmetic changes. 
##### Learnings: A good way to build out and add HTMLPane and its static contents is to use an online HTML builder such as https://html-online.com/editor/. This will really save a lot of time on repetitive wasteful gwt compile cycles (that do take rather long), only to find that the html content is slightly mis-aligned. (:facepalm)


#### May 13,14 2020:
Reading up on GWT Multi module projects, Activity-History-Places concept, Code Splitting - ```GWT.runAsync()```.

- Activity Mapper, Activity Manager, Places - https://ronanquillevere.github.io/2013/03/03/activities-places-intro.html#.Xr0GKxMvMnU
- http://blog.ltgt.net/gwt-21-activities-nesting-yagni/


#### May 15,16 2020:
Converted existing ant build project into a multi module maven project. Here's the project structure:

```
				ipobb-moaa (pom)
				|
				|
				|__ ipobb-commons (jar)
				|
				|
				|__ ipobb-bidorder (jar)
				|
				|
				|__ ipobb-bidsession (jar)
				|
				|
				|__ ipobb-portal (war)
```

#### May 18 2020:
Set up Activities, Places and History for MainPortal. The key here is to create a static common ClientFactory to register the necessary classes. This is still a stub and some work is pending.

#### May 19 2020:
- Approach 1: Multiple independent GWT modules compiled sepearately and including the individual cache.js manually in index.html. The only way to share state between modules (inorder to implement Place-Activities) is using JSNI - wasn't successful in navigating from Main Portal to an App and back. The approach followed was to register and save eventBus, placeController, placeActivity maps, etc. as JS Window objects using $wnd. Very challenging.
- Approach 2: Create a parent module definition and include all inherited modules. Disable GWT compile on all children/dependent maven modules and activate GWT compile only on the war maven module. This approach worked like a charm. The downside though, is that each module could not be hosted as a standalone app. However, this is the recommended approach per http://www.gwtproject.org/doc/latest/DevGuideOrganizingProjects.html

Here's a screenshot of the updated webapp. I will update this from time to time.

![Webapp Screenshot # 1](extras/webapp.png?raw=true)
![Webapp Screenshot # 2](extras/webapp1.png?raw=true)



#### TODOs 
~1. Set up Datasources for a basic IPO BookBuilding Application - Objects are BidSession, Bid, Reference Data of Institutional investors.
2. Explore Single SignOn / Tokens / Expiry page
3. Explore Server Push / Messaging from Server~


1. Converting current project into a multi module Maven project - <font color='green'>DONE</font>
2. Implement Activities, Places, History - DONE
3. Implement Code Splitting to lazyload modules.
