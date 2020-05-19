package com.vidhansu.bidsession.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityManager;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.PlaceController;
import com.smartgwt.client.util.SC;
import com.vidhansu.bidsession.client.placesandactivities.BidSessionActivity;
import com.vidhansu.bidsession.client.placesandactivities.BidSessionAppActivityMapper;
import com.vidhansu.commons.client.AppActivityMapper;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.placesandactivities.BidSessionPlace;

public class BidSessionApplication implements EntryPoint {

	@Override
	public void onModuleLoad() {
		
		/* TODO: Get SSO User from Header */
		String ssoUser = "jack";
		
		EventBus eventBus = ClientFactory.getEventBus();
		PlaceController pctrl = ClientFactory.getPlaceController();
		
		/* Create a new Place and Activity and Register */
		BidSessionPlace bidSessionPlace = new BidSessionPlace(ssoUser);
		Activity bidSessionActivity = new BidSessionActivity(bidSessionPlace);
		ClientFactory.registerPlaceActivity(bidSessionPlace, bidSessionActivity);
		
		/* TODO: Get a singleton of App Activity mapper, ActivityManager */ 
        ActivityMapper activityMapper = new AppActivityMapper();
        ActivityManager activityManager = new ActivityManager(activityMapper, eventBus);
        
        //Testing..
        //portal.getContainer().add(new MainPortalDashboard());
        SC.logWarn("Current place :"+pctrl.getWhere());
        
        ClientFactory.printRegisteredPlaces();
        
		SC.logWarn("Loaded BidSession");
	}

}
