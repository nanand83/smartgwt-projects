package com.vidhansu.sample.client;

import com.google.gwt.core.client.EntryPoint;
import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.VisibilityMode;
import com.smartgwt.client.widgets.HTMLPane;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.layout.SectionStack;
import com.smartgwt.client.widgets.layout.SectionStackSection;
import com.smartgwt.client.widgets.layout.VLayout;

public class IPOBBApplication extends VLayout implements EntryPoint {

	@Override
	public void onModuleLoad() {
		
		setWidth100();  
        setHeight100();  
        setLayoutMargin(20);
        
        /* TODO: Get SSO User from UserContext */
        String ssoUser = "jack";
        ListGrid alg = new ApplicationListGrid(ssoUser);
        Criteria userFilter = new Criteria();
        userFilter.addCriteria("ssoUser", ssoUser);
        alg.fetchData(userFilter);
        //alg.getHeader().hide();
        
        HTMLPane htmlPane = new HTMLPane();        
        htmlPane.setHeight("16%");
        String htmlTableContents = 
        				"<table style='width: 100%; color: #800000; background-image: url(images/IPO_strip.jpeg); background-repeat: repeat-x;'>" +
        				"<tbody>" +
        				"<tr>" +
        				"<td style='width: 33%;'><span style='color: #800000;'>&nbsp;</span></td>" +
        				"<td style='width: 44%;'>" +
        				"<h1>IPO Book Building Suite</span></h1>" +
        				"</td>" +
        				"<td style='width: 23%;'>" +
        				"<h4>Welcome User!<br />" +
        				"<a href=''>Admin Console</a> | <a href=''>User Guide</a> | <a href=''>Support</a></h4>" +
        				"</td>" +
        				"</tr>" +
        				"</tbody>" +
        				"</table>";
        
        htmlPane.setContents(htmlTableContents);
        
        /*htmlPaneSection.addItem(htmlPane);
        htmlPaneSection.addItem(label);
        htmlPaneSection.setCanCollapse(false);
        htmlPaneSection.setShowHeader(false);*/
        
        //topLayout.addChild(htmlPane);
        addMember(htmlPane);
        
        SectionStack leftSideLayout = new SectionStack();  
        leftSideLayout.setWidth(280);  
        leftSideLayout.setShowResizeBar(false);  
        leftSideLayout.setVisibilityMode(VisibilityMode.MULTIPLE);  
        leftSideLayout.setAnimateSections(true);  
  
        SectionStackSection appListSection = new SectionStackSection("Applications");
        appListSection.addItem(alg);
        appListSection.setExpanded(true);
        appListSection.setCanCollapse(false);
        
        leftSideLayout.addSection(appListSection);
        
        addMember(leftSideLayout);
        
        draw();
	}

}
