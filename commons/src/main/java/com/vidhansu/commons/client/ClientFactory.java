package com.vidhansu.commons.client;

import java.util.HashMap;
import java.util.Map;

import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.providers.ViewProvider;

public class ClientFactory {
	private static final EventBus eventBus = new SimpleEventBus();
	private static final PlaceController placeController = new PlaceController(eventBus);
	
	private static Map<String, Place> placeCanonicalPlaceMap = new HashMap<>();
	
	private static Map<Place, ViewProvider> placeViewProviderMap = new HashMap<>();
	
	public static EventBus getEventBus() {
		return eventBus;
	}
	
	public static PlaceController getPlaceController() {
		return placeController;
	}
	
	public static Place getRegisteredPlace(String p) {
		return placeCanonicalPlaceMap.get(p);
	}
	
	public static void registerPlaceViewProvider(Place p, ViewProvider vp) {
		placeCanonicalPlaceMap.put(p.getClass().getCanonicalName(), p);
		placeViewProviderMap.put(p, vp);
	}
	
	public static ViewProvider getViewProviderForPlace(Place p) {
		return placeViewProviderMap.get(p);
	}
	
	public static void printRegisteredPlaces() {
		for (String s : placeCanonicalPlaceMap.keySet()) {
			SC.logWarn(s + " | " + placeCanonicalPlaceMap.get(s));
		}
	}	
}
