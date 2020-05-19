package com.vidhansu.sample.client;

import com.smartgwt.client.types.VerticalAlignment;
import com.smartgwt.client.widgets.Label;
import com.smartgwt.client.widgets.Window;
import com.smartgwt.client.widgets.layout.VLayout;

public class MainPortalDashboard extends VLayout {
	public MainPortalDashboard() {
		Label label = new Label("Welcome <b>User</b><br/>Here's your feed for today.");  
	    label.setWidth100();  
	    label.setHeight100();  
	    label.setPadding(5);  
	    label.setValign(VerticalAlignment.TOP);  
	
	    Window window = new Window();  
	    window.setAutoSize(true);  
	    window.setTitle("User Stats");  
	    window.setWidth(300);  
	    window.setHeight(200);  
	    window.setLeft(0);  
	    window.setCanDragReposition(true);  
	    window.setCanDragResize(true);  
	    window.addItem(label); 
	    
	    addMember(window);
	}
}
