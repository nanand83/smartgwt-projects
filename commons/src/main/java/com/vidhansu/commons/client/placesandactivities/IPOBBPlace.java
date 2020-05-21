package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.place.shared.Place;

public class IPOBBPlace extends Place {
	private String name;
	
	public IPOBBPlace() {
		super();
	}
	
	public IPOBBPlace(String token) {
		this.name = token;
	}

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
    	return "Place: [" + 
    			this.getClass().getCanonicalName() + 
    			"], Name: [" + 
    			this.getName() + 
    			"]";
    }

}
