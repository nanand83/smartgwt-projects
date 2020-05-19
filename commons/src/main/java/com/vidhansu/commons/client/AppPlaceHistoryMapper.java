package com.vidhansu.commons.client;

import com.google.gwt.place.shared.PlaceHistoryMapper;
import com.google.gwt.place.shared.WithTokenizers;
import com.vidhansu.commons.client.placesandactivities.BidSessionPlace;
import com.vidhansu.commons.client.placesandactivities.MainPortalPlace;

@WithTokenizers({ MainPortalPlace.Tokenizer.class, BidSessionPlace.Tokenizer.class })
public interface AppPlaceHistoryMapper extends PlaceHistoryMapper {
};