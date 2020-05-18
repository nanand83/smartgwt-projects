package com.vidhansu.sample.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityManager;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.place.shared.PlaceHistoryHandler;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.smartgwt.client.widgets.layout.VLayout;
import com.vidhansu.commons.client.AppActivityMapper;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.sample.client.placesactivities.MainPortalActivity;
import com.vidhansu.sample.client.placesactivities.MainPortalPlace;

public class IPOBBApplication extends VLayout implements EntryPoint {

    private SimplePanel appWidget = new SimplePanel();
	
	@Override
	public void onModuleLoad() {
		
		/* TODO: Get SSO User from Header */
		String ssoUser = "jack";
		
		EventBus eventBus = ClientFactory.getEventBus();
		PlaceController pctrl = ClientFactory.getPlaceController();
		
		/* Create a new Place and Activity */
		MainPortalPlace mainPortalPlace = new MainPortalPlace(ssoUser);
		Activity mainPortalActivity = new MainPortalActivity(mainPortalPlace);
		ClientFactory.registerPlaceActivity(mainPortalPlace, mainPortalActivity);
		
        ActivityMapper activityMapper = new AppActivityMapper();
        ActivityManager activityManager = new ActivityManager(activityMapper, eventBus);
        activityManager.setDisplay(appWidget);
        
        
        /* TODO -==============
        // Start PlaceHistoryHandler with our PlaceHistoryMapper
        AppPlaceHistoryMapper historyMapper= GWT.create(AppPlaceHistoryMapper.class);
        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(placeController, eventBus, defaultPlace); 

        MainPortal portal = new MainPortal();
        portal.setSSOUser(ssoUser);
        portal.setAppWidget(appWidget);
        RootPanel.get().add(portal);

        historyHandler.handleCurrentHistory();*/
	}

}
