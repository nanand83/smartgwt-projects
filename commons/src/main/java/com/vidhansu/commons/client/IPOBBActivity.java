package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.RunAsyncCallback;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.placesandactivities.IPOBBPlace;
import com.vidhansu.commons.client.providers.ViewProvider;

public class IPOBBActivity extends AbstractActivity {
	private String ssoUser;
	private ViewProvider viewProvider;
	
	public IPOBBActivity(Place place, ViewProvider viewProvider) {
		this.ssoUser = ((IPOBBPlace) place).getName();
		this.viewProvider = viewProvider;
	}
		
	/* 1. Async
	 * 2. Reuses the view */
	@Override	
	public void start(AcceptsOneWidget containerWidget, EventBus eventBus) {
		GWT.runAsync(new RunAsyncCallback() {
			@Override
			public void onSuccess() {
				SC.logWarn("Setting widget in start activity");
				Widget widgetObj = viewProvider.getOrCreateViewInstance();
				SC.logWarn("Got widget obj :" + widgetObj);
				containerWidget.setWidget(widgetObj);
			}
			
			@Override
			public void onFailure(Throwable arg0) {
				SC.logWarn("Module load failure");
			}
		});
				
	}
	
    public void goTo(Place place) {
    	SC.logWarn("In " + this.getClass().getSimpleName() + ", going to Place: "+place);
        ClientFactory.getPlaceController().goTo(place);
    }
    
	@Override
    public String mayStop() {
        //return "Moving out of this IPOBBActivity";
		return null;
    }
	
    @Override
    public String toString() {
    	return "Activity: [" + 
    			this.getClass().getCanonicalName() + 
    			"], SSOUser: [" + 
    			this.ssoUser + 
    			"], ViewProvider: [" + 
    			this.viewProvider + 
    			"]";
    }
}