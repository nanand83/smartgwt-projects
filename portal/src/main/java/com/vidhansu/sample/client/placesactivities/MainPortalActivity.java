package com.vidhansu.sample.client.placesactivities;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.place.shared.Place;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.vidhansu.commons.client.ClientFactory;
import com.vidhansu.commons.client.IPOBBWidget;
import com.vidhansu.sample.client.MainPortal;

public class MainPortalActivity extends AbstractActivity {

	private String ssoUser;
	
	public MainPortalActivity(MainPortalPlace place) {
		this.ssoUser = place.getName();
	}
	
	@Override
	public void start(AcceptsOneWidget containerWidget, EventBus eventBus) {
		IPOBBWidget widget = ClientFactory.getWidget(MainPortal.class);
		widget.setSSOUser(this.ssoUser);
		containerWidget.setWidget(MainPortal.getMainPortalView());		
	}
	
	@Override
    public String mayStop() {
        return "This activity is stopping";
    }

    public void goTo(Place place) {
        ClientFactory.getPlaceController().goTo(place);
    }

}
