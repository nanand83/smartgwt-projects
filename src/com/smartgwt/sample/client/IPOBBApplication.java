package com.smartgwt.sample.client;

import com.google.gwt.core.client.EntryPoint;
import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.VisibilityMode;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.SectionStack;
import com.smartgwt.client.widgets.layout.SectionStackSection;

public class IPOBBApplication extends HLayout implements EntryPoint {

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
        
        SectionStack leftSideLayout = new SectionStack();  
        leftSideLayout.setWidth(280);  
        leftSideLayout.setShowResizeBar(true);  
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
