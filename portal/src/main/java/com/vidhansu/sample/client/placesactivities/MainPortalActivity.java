package com.vidhansu.sample.client.placesactivities;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.placesandactivities.MainPortalPlace;
import com.vidhansu.sample.client.MainPortalDashboard;

public class MainPortalActivity extends AbstractActivity {

	private String ssoUser;
	
	public MainPortalActivity(MainPortalPlace place) {
		this.ssoUser = place.getName();
	}
	
	@Override
	/* TODO: Reusable view - View creation is costly and not desired */
	public void start(AcceptsOneWidget containerWidget, EventBus eventBus) {
		Widget w = new MainPortalDashboard().asWidget();
		containerWidget.setWidget(w);		
	}
	
	@Override
    public String mayStop() {
        return "Moving out of the MainPortalActivity";
    }

    public void goTo(Place place) {
    	SC.logWarn("In MainPortalActivity, going to place:"+place);
        ClientFactory.getPlaceController().goTo(place);
    }
    
    @Override
    public String toString() {
    	return "Activity: [" + 
    			this.getClass().getCanonicalName() + 
    			"], SSOUser: [" + 
    			this.ssoUser + 
    			"]";
    }

}
