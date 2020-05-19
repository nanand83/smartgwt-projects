package com.vidhansu.bidsession.client.placesandactivities;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.ClientFactory;

public class BidSessionAppActivityMapper implements ActivityMapper {
	
	@Override
	public Activity getActivity(Place place) {
		SC.logWarn("[BidSessionAppActivityMapper] Get activity invoke for place: "+place);
		SC.logWarn("[BidSessionAppActivityMapper] Activity is: "+ClientFactory.getActivityForPlace(place)); 
		return ClientFactory.getActivityForPlace(place);
	}
	
}
