package com.vidhansu.sample.client;

import com.smartgwt.client.data.DataSourceField;
import com.smartgwt.client.data.OperationBinding;
import com.smartgwt.client.data.RestDataSource;
import com.smartgwt.client.data.fields.DataSourceBooleanField;
import com.smartgwt.client.data.fields.DataSourceEnumField;
import com.smartgwt.client.data.fields.DataSourceIntegerField;
import com.smartgwt.client.data.fields.DataSourceTextField;
import com.smartgwt.client.types.DSOperationType;
import com.smartgwt.client.types.DSProtocol;
import com.smartgwt.client.widgets.Canvas;
import com.smartgwt.client.widgets.grid.CellFormatter;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.grid.ListGridField;
import com.smartgwt.client.widgets.grid.ListGridRecord;
import com.vidhansu.sample.client.events.AppClickHandler;

public class ApplicationListGrid extends ListGrid {
	
	public ApplicationListGrid() {
		
		setDataSource(setupDataSource());
		
		setWidth("20%");
		
		setShowHeader(false);
		
		ListGridField appNameField = new ListGridField("appName", "Application Name");
		
		appNameField.setCellFormatter(new CellFormatter() {  
            public String format(Object value, ListGridRecord record, int rowNum, int colNum) {  
                if (value != null) {    
                    boolean has_access = record.getAttributeAsBoolean("has_access");
                    String entitlement = record.getAttributeAsString("entitled");
                    
                    if (has_access) {
                		return (String) value + " (" + entitlement + ")";
                    } else {
                    	return "<i>" + (String) value + " (No access)</i>";                    	
                    }
                } else {  
                    return "";  
                }  
            }  
        });  
		
		appNameField.addRecordClickHandler(new AppClickHandler());
		
		setFields(appNameField);
	}
	
	
	
	public static RestDataSource setupDataSource() {
		RestDataSource ds = new RestDataSource();
		
		ds.setID("applications");
		DataSourceField appId = new DataSourceIntegerField("appId", "Application Id");
		
		DataSourceField appName = new DataSourceTextField("appName", "Application Name", 128);
		
		DataSourceField has_access = new DataSourceBooleanField("has_access", "Has Access");
		
		DataSourceEnumField entitled = new DataSourceEnumField("entitled", "Entitled");
		entitled.setValueMap("readonly", "readwrite", "admin", "superuser");
		
		ds.setFields(appId, appName, has_access, entitled);
		
		OperationBinding fetch = new OperationBinding();
		fetch.setOperationType(DSOperationType.FETCH);
		fetch.setDataProtocol(DSProtocol.POSTMESSAGE);
		
		ds.setOperationBindings(fetch);
		
		ds.setFetchDataURL("ds/test_data/applications.data.xml");
		
		return ds;
	}
		
	
}


