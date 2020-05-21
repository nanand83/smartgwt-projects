package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.place.shared.PlaceTokenizer;

public class MainPortalPlace extends IPOBBPlace {
	
	public MainPortalPlace(String token) {
		super(token);
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
}
