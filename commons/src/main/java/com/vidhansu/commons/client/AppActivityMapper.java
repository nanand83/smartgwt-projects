package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;

public class AppActivityMapper implements ActivityMapper {
	
	@Override
	public Activity getActivity(Place place) {
		return ClientFactory.getActivityForPlace(place);
	}
}
