package com.vidhansu.commons.client;

import java.util.HashMap;
import java.util.Map;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;

public class ClientFactory {
	private static final EventBus eventBus = new SimpleEventBus();
	private static final PlaceController placeController = new PlaceController(eventBus);
	
	private static Map<String, Place> appPlaceMap = new HashMap<> ();
	
	private static Map<Class<IPOBBWidget>, IPOBBWidget> widgetInstanceMap = new HashMap<>();
	
	private static Map<Place, Activity> placeActivityMap = new HashMap<>();
	
    public static void registerPlace(String placeFqdn, Place p) {
		appPlaceMap.put(placeFqdn, p);
	}
    
    public static Place getRegisteredPlace(String placeFqdn) {
		return appPlaceMap.get(placeFqdn);
	}
	
	public static EventBus getEventBus() {
		return eventBus;
	}

	public static PlaceController getPlaceController() {
		return placeController;
	}

	public static IPOBBWidget getWidget(Class w) {
		if (!widgetInstanceMap.containsKey(w)) {
			try {
				IPOBBWidget instance = (IPOBBWidget) w.newInstance();
				widgetInstanceMap.put(w,instance);
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}			
		}
		
		return widgetInstanceMap.get(w);
	}
	
	public static void registerPlaceActivity(Place p, Activity a) {
		placeActivityMap.put(p, a);
	}
	
	public static Activity getActivityForPlace(Place p) {
		return placeActivityMap.get(p);
	}

}
