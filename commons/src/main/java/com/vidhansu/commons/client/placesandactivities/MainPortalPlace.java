package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;

public class MainPortalPlace extends Place {
	private String name;

	public MainPortalPlace(String token) {
        this.name = token;
    }

    public String getName() {
        return name;
    }

    public static class Tokenizer implements PlaceTokenizer<MainPortalPlace> {
        @Override
        public String getToken(MainPortalPlace place) {
            return place.getName();
        }

        @Override
        public MainPortalPlace getPlace(String token) {
            return new MainPortalPlace(token);
        }
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
