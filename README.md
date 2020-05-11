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


#### Plan for Week of May 11 2020 -
1. Set up Datasources for a basic IPO BookBuilding Application - Objects are BidSession, Bid, Reference Data of Institutional investors.
2. Explore Single SignOn / Tokens / Expiry page
3. Explore Server Push / Messaging from Server
