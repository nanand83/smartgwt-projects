package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.IPOBBActivity;
import com.vidhansu.commons.client.providers.ViewProvider;

public class AppActivityMapper implements ActivityMapper {

	@Override
	public Activity getActivity(Place place) {
		SC.logWarn("Get activity invoke for place: "+place);
		
		ViewProvider registeredViewProvider = ClientFactory.getViewProviderForPlace(place);
		Activity activityInstance = new IPOBBActivity(place, registeredViewProvider); 
	
		SC.logWarn("--Returning Activity instance:"+activityInstance);
		return activityInstance;
	}
}