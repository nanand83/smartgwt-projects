package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.placesandactivities.IPOBBPlace;

public class IPOBBActivity extends AbstractActivity {
	private String ssoUser;
	private Widget view;
	
	public IPOBBActivity(Place place, Widget view) {
		this.ssoUser = ((IPOBBPlace) place).getName();
		this.view = view;
	}
		
	/* Reuses the view */
	@Override	
	public void start(AcceptsOneWidget containerWidget, EventBus eventBus) {
		containerWidget.setWidget(this.view);		
	}
	
    public void goTo(Place place) {
    	SC.logWarn("In " + this.getClass().getSimpleName() + ", going to Place: "+place);
        ClientFactory.getPlaceController().goTo(place);
    }
    
	@Override
    public String mayStop() {
        return "Moving out of this IPOBBActivity";
    }
	
    @Override
    public String toString() {
    	return "Activity: [" + 
    			this.getClass().getCanonicalName() + 
    			"], SSOUser: [" + 
    			this.ssoUser + 
    			"], View: [" + 
    			this.view + 
    			"]";
    }
}