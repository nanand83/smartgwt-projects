package com.vidhansu.commons.client.placesandactivities;

import com.google.gwt.place.shared.PlaceTokenizer;

public class BidSessionPlace extends IPOBBPlace {

	public BidSessionPlace(String token) {
        super(token);
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
}
