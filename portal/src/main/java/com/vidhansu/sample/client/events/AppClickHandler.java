package com.vidhansu.sample.client.events;

import com.google.gwt.place.shared.Place;
import com.smartgwt.client.widgets.Canvas;
import com.smartgwt.client.widgets.grid.events.RecordClickEvent;
import com.smartgwt.client.widgets.grid.events.RecordClickHandler;
import com.vidhansu.commons.client.ClientFactory;

public class AppClickHandler implements RecordClickHandler {

	@Override
	public void onRecordClick(RecordClickEvent event) {
		
		//Window.alert("Hang on! About to go to Place [" + event.getRawValue() + "]");
		/*
		final DynamicForm form = new DynamicForm();  
        form.setGroupTitle(event.getRawValue().toString());  
        form.setIsGroup(true);  
        form.setWidth("50%");  
        form.setHeight("50%");  
        form.setBorder("1px solid red");  
        form.setPadding(5);  
        form.setCanDragResize(false);*/
		
		String placeFqdn = event.getRecord().getAttributeAsString("placeFqdn");
		
		/* TODO: This can be moved to ClientFactory itself,
		 * if ClientFactory supports appid<->placeinstance mappings
		 */
		Place gotoPlace = ClientFactory.getRegisteredPlace(placeFqdn);
        
		ClientFactory.getPlaceController().goTo(gotoPlace);
        
	}

}
