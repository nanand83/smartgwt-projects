package com.vidhansu.sample.client;

import com.google.gwt.activity.shared.ActivityManager;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.place.shared.PlaceHistoryHandler;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.smartgwt.client.widgets.layout.VLayout;
import com.vidhansu.commons.client.AppPlaceHistoryMapper;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.placesandactivities.AppActivityMapper;
import com.vidhansu.commons.client.placesandactivities.MainPortalPlace;

public class IPOBBApplication extends VLayout implements EntryPoint {

    @Override
	public void onModuleLoad() {
		/* TODO: Get SSO User from Header */
		String ssoUser = "jack";
		
		MainPortal portal = new MainPortal();
		portal.setSSOUser(ssoUser);
		
		EventBus eventBus = ClientFactory.getEventBus();
		PlaceController pctrl = ClientFactory.getPlaceController();
		
		/* Create a new Place */
		MainPortalPlace mainPortalPlace = new MainPortalPlace(ssoUser);
		MainPortalViewProvider vp = new MainPortalViewProvider();
		ClientFactory.registerPlaceViewProvider(mainPortalPlace, vp);
		
        ActivityMapper activityMapper = new AppActivityMapper();
        ActivityManager activityManager = new ActivityManager(activityMapper, eventBus);
        activityManager.setDisplay(portal.getContainer());
        
        RootPanel.get().add(portal);

        //pctrl.goTo(mainPortalPlace);
        
		//Testing..
        //portal.getContainer().add(new MainPortalDashboard());
		
        AppPlaceHistoryMapper historyMapper= GWT.create(AppPlaceHistoryMapper.class);
        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(pctrl, eventBus, mainPortalPlace);
        
        SC.logWarn("Current place :"+pctrl.getWhere());
        
        ClientFactory.printRegisteredPlaces();
        
        historyHandler.handleCurrentHistory();
        SC.logWarn("Loaded MainPortal");       	
	}

}
