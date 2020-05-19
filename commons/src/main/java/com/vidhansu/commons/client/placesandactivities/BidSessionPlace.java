package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;

public class BidSessionPlace extends Place {
	private String name;

	public BidSessionPlace(String token) {
        this.name = token;
    }

    public String getName() {
        return name;
    }

    public static class Tokenizer implements PlaceTokenizer<BidSessionPlace> {
        @Override
        public String getToken(BidSessionPlace place) {
            return place.getName();
        }

        @Override
        public BidSessionPlace getPlace(String token) {
            return new BidSessionPlace(token);
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
