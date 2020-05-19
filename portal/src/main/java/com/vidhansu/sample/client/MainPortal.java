package com.vidhansu.sample.client;

import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.VisibilityMode;
import com.smartgwt.client.widgets.Canvas;
import com.smartgwt.client.widgets.HTMLPane;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.SectionStack;
import com.smartgwt.client.widgets.layout.SectionStackSection;
import com.smartgwt.client.widgets.layout.VLayout;

public class MainPortal extends VLayout {
	
	private ListGrid alg = null;
	HLayout phLayout = null;
	SimplePanel container = null;
	
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
	    				"<h4>Welcome User..<br />" +
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
	    
	    HLayout bottomLayout = new HLayout();
	    bottomLayout.setWidth100();
	    bottomLayout.setHeight100();
	    bottomLayout.setMembersMargin(10);
	    
	    SectionStack sideSectionStack = new SectionStack();  
	    sideSectionStack.setShowResizeBar(false);  
	    sideSectionStack.setVisibilityMode(VisibilityMode.MULTIPLE);  
	    
	    SectionStackSection appListSection = new SectionStackSection("Applications");
	    appListSection.addItem(alg);
	    appListSection.setExpanded(true);
	    appListSection.setCanCollapse(false);
	    
	    sideSectionStack.addSection(appListSection);
	    sideSectionStack.setWidth("280");
	    	    
	    
	    SectionStack mainSectionStack = new SectionStack();
	    mainSectionStack.setShowResizeBar(false);  
	    mainSectionStack.setVisibilityMode(VisibilityMode.MULTIPLE);
	    
	    SectionStackSection mainSection = new SectionStackSection("Content");
	    mainSection.setExpanded(true);
	    mainSection.setCanCollapse(false);
	    container = new SimplePanel();
	    Canvas containerCanvas = new Canvas();
	    containerCanvas.addChild(container);
		mainSection.addItem(containerCanvas);
		
	    mainSectionStack.addSection(mainSection);
	    mainSectionStack.setWidth("*");
		
		bottomLayout.addMember(sideSectionStack);
		bottomLayout.addMember(mainSectionStack);
		
	    addMember(bottomLayout);
	}
	
	public void setSSOUser(String ssoUser) {
		Criteria userFilter = new Criteria();
	    userFilter.addCriteria("ssoUser", ssoUser);
	    this.alg.fetchData(userFilter);	    
	}
	
	public void setAppWidget(Widget w) {
		phLayout.addChild(w);
	}
	
	public SimplePanel getContainer() {
		return this.container;
	}
}
