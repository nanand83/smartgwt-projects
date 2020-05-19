package com.vidhansu.bidsession.client;

import com.smartgwt.client.types.TitleOrientation;
import com.smartgwt.client.widgets.IButton;
import com.smartgwt.client.widgets.events.ClickEvent;
import com.smartgwt.client.widgets.events.ClickHandler;
import com.smartgwt.client.widgets.form.DynamicForm;
import com.smartgwt.client.widgets.form.fields.FormItem;
import com.smartgwt.client.widgets.form.fields.PasswordItem;
import com.smartgwt.client.widgets.form.fields.TextItem;
import com.smartgwt.client.widgets.layout.HLayout;

public class BidSessionApp extends HLayout {

	
	/* Credits:
	 * https://www.smartclient.com/smartgwt/showcase/#layout_form_titles */
	/* TODO: Implement actual form here */
	
	TitleOrientation titleOrientation = TitleOrientation.LEFT;
	
	public BidSessionApp() {    	  
        
        final DynamicForm form = new DynamicForm();  
        form.setWidth(250);  
          
        TextItem usernameItem = new TextItem();  
        usernameItem.setTitle("Username");  
        usernameItem.setRequired(true);  
        usernameItem.setDefaultValue("bob");  
  
        TextItem emailItem = new TextItem();  
        emailItem.setTitle("Email");  
        emailItem.setRequired(true);  
        emailItem.setDefaultValue("bob@isomorphic.com");  
  
        PasswordItem passwordItem = new PasswordItem();  
        passwordItem.setTitle("Password");  
        passwordItem.setRequired(true);  
  
        PasswordItem password2Item = new PasswordItem();  
        password2Item.setTitle("Password again");  
        password2Item.setRequired(true);  
        password2Item.setType("password");  
        password2Item.setWrapTitle(false);  
  
        form.setFields(new FormItem[] {usernameItem, emailItem, passwordItem, password2Item});  
          
        IButton swapButton = new IButton("Swap titles");  
        swapButton.setLeft(300);  
        swapButton.addClickHandler(new ClickHandler() {  
            public void onClick(ClickEvent event) {  
                if (form.getTitleOrientation() == TitleOrientation.TOP) {  
                    titleOrientation = TitleOrientation.LEFT;  
                }  
                else {  
                    titleOrientation = TitleOrientation.TOP;  
                }  
                form.setTitleOrientation(titleOrientation);  
            }  
        });  
          
        addMember(form);  
        addMember(swapButton);  
	}
}
