package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;

public class AppActivityMapper implements ActivityMapper {
	
	/* Returns a new activity for place
	 * Every activity is recommended to be disposable 	
	 */
	@Override
	public Activity getActivity(Place place) {
		SC.logWarn("Get activity invoke for place: "+place);
		Widget registeredView = ClientFactory.getViewForPlace(place);
		
		Activity activityInstance = new IPOBBActivity(place, registeredView); 
	
		SC.logWarn("--Returning Activity instance:"+activityInstance);
		return activityInstance;
	}	
}
