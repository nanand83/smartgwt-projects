package com.vidhansu.commons.client;

import com.smartgwt.client.widgets.layout.VLayout;

public class IPOBBWidget extends VLayout {
	private String ssoUser;
	
	public void setSSOUser(String user) {
		this.ssoUser = user;
	}
	
	public String getSSOUser() {
		return this.ssoUser;
	}
}

