package com.vidhansu.commons.client;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;

public class JSNIClientFactory {
	
	public static void initializeEventBusAndPCtrl() {
		EventBus eventBus = new SimpleEventBus();
		PlaceController placeController = new PlaceController(eventBus);
		_initializeEventBusAndPCtrl(eventBus, placeController);
	}
	
	public static native void _initializeEventBusAndPCtrl(EventBus eventBus, PlaceController pctrl) /*-{
		$wnd.eventBus = eventBus;
		$wnd.placeController = pctrl;
	}-*/;
	
	public static EventBus getEventBus() {
		return _getEventBus();
	}
	
	public static native EventBus _getEventBus() /*-{
		return $wnd.eventBus;
	}-*/;
	
	public static PlaceController getPlaceController() {
		return _getPlaceController();
	}
	
	public static native PlaceController _getPlaceController() /*-{
		return $wnd.placeController;
	}-*/;

	
    public static void registerPlace(String placeFqdn, Place p) {
		_registerPlace(placeFqdn, p);
	}
    
    public static native void _registerPlace(String placeFqdn, Place p) /*-{
    	if ('placeMap' in $wnd) {
    		
    	} else {
    		$wnd.placeMap = {};
    	}
		$wnd.placeMap[placeFqdn] = p;
    }-*/;
    
    public static Place getRegisteredPlace(String placeFqdn) {
    	return _getRegisteredPlace(placeFqdn);
    }
    
    public static native Place _getRegisteredPlace(String placeFqdn) /*-{
		return $wnd.placeMap[placeFqdn];
	}-*/;
	
    public static void registerPlaceActivity(Place p, Activity a) {
		_registerPlaceActivity(p, a);
	}
    
    public static native void _registerPlaceActivity(Place p, Activity a) /*-{
    	if ('placeActivityMap' in $wnd) {
    		
    	} else {
    		$wnd.placeActivityMap = {};
    	}
    	$wnd.placeActivityMap[p] = a;    	
    }-*/;
	
	public static Activity getActivityForPlace(Place p) {
		return _getActivityForPlace(p);
	}
	
	public static native Activity _getActivityForPlace(Place p) /*-{
		return $wnd.placeActivityMap[p];
	}-*/;
    
}
