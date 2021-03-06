package com.vidhansu.bidsession.client;

import com.google.gwt.activity.shared.ActivityManager;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.placesandactivities.AppActivityMapper;
import com.vidhansu.commons.client.placesandactivities.BidSessionPlace;

public class BidSessionApplication implements EntryPoint {

	@Override
	public void onModuleLoad() {
		
		/* TODO: Get SSO User from Header */
		String ssoUser = "jack";
		
		EventBus eventBus = ClientFactory.getEventBus();
		PlaceController pctrl = ClientFactory.getPlaceController();
		
		/* Create a new Place View and Register */
		BidSessionPlace bidSessionPlace = new BidSessionPlace(ssoUser);
		BidSessionAppViewProvider vp = new BidSessionAppViewProvider();
				
		ClientFactory.registerPlaceViewProvider(bidSessionPlace, vp);
		
		ActivityMapper activityMapper = new AppActivityMapper();
        ActivityManager activityManager = new ActivityManager(activityMapper, eventBus);
        
        //Testing..
        //portal.getContainer().add(new MainPortalDashboard());
        SC.logWarn("Current place :"+pctrl.getWhere());
        
        ClientFactory.printRegisteredPlaces();
        
		SC.logWarn("Loaded BidSession");
	}

}
