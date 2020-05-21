package com.vidhansu.sample.client.events;

import com.google.gwt.place.shared.Place;
import com.smartgwt.client.util.SC;
import com.smartgwt.client.widgets.grid.events.RecordClickEvent;
import com.smartgwt.client.widgets.grid.events.RecordClickHandler;
import com.vidhansu.commons.client.ClientFactory;

public class AppClickHandler implements RecordClickHandler {

	@Override
	public void onRecordClick(RecordClickEvent event) {
		
		String placeCanonical = event.getRecord().getAttributeAsString("placeCanonical");
		SC.logWarn("Hang on! About to go to Place [" + placeCanonical + "]");
		
		Place gotoPlace = ClientFactory.getRegisteredPlace(placeCanonical);
		SC.logWarn("Gotoplace: "+gotoPlace);
        
		ClientFactory.getPlaceController().goTo(gotoPlace);        
	}

}
