package com.vidhansu.commons.client;

import java.util.HashMap;
import java.util.Map;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.smartgwt.client.util.SC;

public class ClientFactory {
	private static final EventBus eventBus = new SimpleEventBus();
	private static final PlaceController placeController = new PlaceController(eventBus);
	
	private static Map<String, Place> placeCanonicalPlaceMap = new HashMap<>();
	private static Map<Place, Activity> placeActivityMap = new HashMap<> ();
	
	public static EventBus getEventBus() {
		return eventBus;
	}
	
	public static PlaceController getPlaceController() {
		return placeController;
	}
	
	public static void registerPlaceActivity(Place p, Activity a) {
		placeCanonicalPlaceMap.put(p.getClass().getCanonicalName(), p);
		placeActivityMap.put(p, a);
	}
	
	public static Place getRegisteredPlace(String p) {
		return placeCanonicalPlaceMap.get(p);
	}
	
	public static Activity getActivityForPlace(Place p) {
		return placeActivityMap.get(p);
	}
	
	public static void printRegisteredPlaces() {
		for (String s : placeCanonicalPlaceMap.keySet()) {
			SC.logWarn(s + " | " + placeCanonicalPlaceMap.get(s));
		}
	}
}
