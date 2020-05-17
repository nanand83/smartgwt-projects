package com.vidhansu.sample.server.servlet;


import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.isomorphic.base.Config;
import com.vidhansu.sample.server.utils.CustomCrypto;

public class CustomAfterInitServlet implements Servlet {
	
	private final String MYSQL_PASSWORD_NAME = "sql.Mysql.driver.password";
	
		
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ServletConfig getServletConfig() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public void init(ServletConfig arg0) throws ServletException {
		/* Below can be hooked into KeyCloak to retrieve password 
		 * Or perhaps decrypt the password specified.. 
		 * Credits: 
		 * https://www.smartclient.com/smartgwtee-4.1/server/javadoc/com/isomorphic/base/Config.html
		 */
		try {
			Config globalConfig = Config.getGlobal();
			String db_encrypted_password = globalConfig.getString(MYSQL_PASSWORD_NAME);
			
			String db_decrypted_password = CustomCrypto.decrypt(db_encrypted_password);
			globalConfig.put(MYSQL_PASSWORD_NAME, db_decrypted_password);
			
			/*System.out.println("Successfully applied custom config changes!" 
								+ db_decrypted_password);*/
			
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}

}
