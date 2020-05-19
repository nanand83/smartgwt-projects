package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.smartgwt.client.util.SC;

public class AppActivityMapper implements ActivityMapper {
	
	@Override
	public Activity getActivity(Place place) {
		SC.logWarn("Get activity invoke for place: "+place);
		return ClientFactory.getActivityForPlace(place);
	}
	
}
