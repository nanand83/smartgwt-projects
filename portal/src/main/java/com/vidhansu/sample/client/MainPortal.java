package com.vidhansu.sample.client;

import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.VisibilityMode;
import com.smartgwt.client.widgets.HTMLPane;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.layout.SectionStack;
import com.smartgwt.client.widgets.layout.SectionStackSection;
import com.smartgwt.client.widgets.layout.VLayout;
import com.vidhansu.commons.client.IPOBBWidget;

public class MainPortal extends IPOBBWidget {
	

	public static IPOBBWidget mainPortalWidget = new MainPortal();
	private ListGrid alg = null;
	VLayout phLayout = null;
	
	public MainPortal() {
		setWidth100();  
		setHeight100();  
	    setLayoutMargin(10);
	    
	    /* TODO: Get SSO User from UserContext */
	    //String ssoUser = "jack";
	    alg = new ApplicationListGrid();
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
	    
	    SectionStack layout = new SectionStack();  
	    layout.setWidth100();  
	    layout.setShowResizeBar(false);  
	    layout.setVisibilityMode(VisibilityMode.MULTIPLE);  
	    layout.setAnimateSections(true);  
	
	    SectionStackSection appListSection = new SectionStackSection("Applications");
	    appListSection.addItem(alg);
	    appListSection.setExpanded(true);
	    appListSection.setCanCollapse(false);
	    
	    layout.addSection(appListSection);
	    
	    SectionStackSection appPlaceHolderSection = new SectionStackSection("App");
	    appPlaceHolderSection.setExpanded(true);
	    appPlaceHolderSection.setCanCollapse(false);
	    phLayout = new VLayout();
	    phLayout.setID("mainAppLayout");
	    phLayout.setHeight100();
	    phLayout.setWidth100();
	    phLayout.setBackgroundColor("grey");
		phLayout.setMembersMargin(10);
		appPlaceHolderSection.addItem(phLayout);
		
	    layout.addSection(appPlaceHolderSection);
	    
	    addMember(layout);
	}
	
	public void setSSOUser(String ssoUser) {
		Criteria userFilter = new Criteria();
	    userFilter.addCriteria("ssoUser", ssoUser);
	    this.alg.fetchData(userFilter);	    
	}
	
	public void setAppWidget(Widget w) {
		phLayout.addChild(w);
	}
	
	public static IPOBBWidget getMainPortalView() {
		return mainPortalWidget;
	}
}
