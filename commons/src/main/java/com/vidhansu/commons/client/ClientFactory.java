package com.vidhansu.commons.client;

import java.util.HashMap;
import java.util.Map;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;

public class ClientFactory {
	private static final EventBus eventBus = new SimpleEventBus();
	private static final PlaceController placeController = new PlaceController(eventBus);
	private static final ActivityMapper activityMapper = new AppActivityMapper();
	
	private static Map<String, Place> placeCanonicalPlaceMap = new HashMap<>();
	private static Map<Place, Widget> placeWidgetMap = new HashMap<>();
	
	public static EventBus getEventBus() {
		return eventBus;
	}
	
	public static PlaceController getPlaceController() {
		return placeController;
	}
	
	public static Place getRegisteredPlace(String p) {
		return placeCanonicalPlaceMap.get(p);
	}
	
	public static void registerPlaceView(Place p, Widget view) {
		placeCanonicalPlaceMap.put(p.getClass().getCanonicalName(), p);
		placeWidgetMap.put(p, view);
	}
	
	public static Widget getViewForPlace(Place p) {
		return placeWidgetMap.get(p);
	}
	
	public static ActivityMapper getActivityMapperInstance() {
		return activityMapper;
	}

	public static void printRegisteredPlaces() {
		for (String s : placeCanonicalPlaceMap.keySet()) {
			SC.logWarn(s + " | " + placeCanonicalPlaceMap.get(s));
		}
	}	
}
