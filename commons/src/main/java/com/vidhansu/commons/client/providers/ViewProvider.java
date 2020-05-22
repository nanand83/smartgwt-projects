package com.vidhansu.commons.client.providers;

import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;

public abstract class ViewProvider {
	
	Widget widgetObj;
	
	public Widget getOrCreateViewInstance() {
		
		if (widgetObj != null) {
			SC.logWarn("Returning existing widgetObj of class:" + widgetObj.getClass().getName());
			return widgetObj;
		}
		
		widgetObj = createView();
		
		SC.logWarn("Created new widget for class: " + widgetObj.getClass().getName());
		
		return widgetObj;
	}
		
	public abstract Widget createView();	
}

