package com.vidhansu.bidsession.client.placesandactivities;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.bidsession.client.BidSessionApp;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.placesandactivities.BidSessionPlace;

public class BidSessionActivity extends AbstractActivity {
	private String ssoUser;
	
	public BidSessionActivity(BidSessionPlace place) {
		this.ssoUser = place.getName();
	}
	
	@Override
	public void start(AcceptsOneWidget containerWidget, EventBus eventBus) {
		SC.logWarn("Caught an event, now triggering bidsession app");
		Widget w = new BidSessionApp().asWidget();
		//widget.setSSOUser(this.ssoUser);
		containerWidget.setWidget(w);		
	}
	
	@Override
    public String mayStop() {
        return "Moving out of the BidSession Place";
    }

    public void goTo(Place place) {
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
