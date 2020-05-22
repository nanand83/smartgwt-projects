package com.vidhansu.bidsession.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.Widget;
import com.smartgwt.client.util.SC;
import com.vidhansu.commons.client.providers.ViewProvider;

public class BidSessionAppViewProvider extends ViewProvider {

	@Override
	public Widget createView() {
		SC.logWarn("Creating the bidsession app view now");
		return GWT.create(BidSessionApp.class);
	}

}
