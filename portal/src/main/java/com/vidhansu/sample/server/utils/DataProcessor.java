package com.vidhansu.sample.server.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.stream.Collectors;

import com.isomorphic.base.Config;
import com.isomorphic.base.ISCInit;
import com.isomorphic.servlet.ServletTools;
import com.isomorphic.tools.DataImport;
import com.isomorphic.tools.DataImport.ImportFormat;

public class DataProcessor {

	public void insertData(String dsName) {
		
		//DSRequest dsReq = new DSRequest(dsName, "update");
        DataImport dataImporter = new DataImport(ImportFormat.XML, "");
        
        /* 1. Manually set mysql password 
         * Copied code from CustomAfterInitServlet 
         */ 
        Config globalConfig = Config.getGlobal();
        
        System.out.println("Sql config key/values:" + 
		        				globalConfig.asProperties()
		        				.entrySet()
		        				.stream()
		        				.filter(entry -> 
		        							entry
		        							.getKey()
		        							.toString()
		        							.startsWith("sql.Mysql")
		        						)
		        				.collect(Collectors.toList()));
        
        final String MYSQL_PASSWORD_NAME = "sql.Mysql.driver.password";
        String db_decrypted_password = CustomCrypto.decrypt(
        									globalConfig.getString(MYSQL_PASSWORD_NAME)
        								);
		globalConfig.put(MYSQL_PASSWORD_NAME, db_decrypted_password);
        
		
		/* 2. Load data file */
        InputStream fis = null;
        try {
			fis = ServletTools.loadWebRootFile("ds/test_data/" + dsName +  ".data.xml");
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

        /* 3. Finally import data into datasource */
        Reader reader = new InputStreamReader(fis);        
        try {
			long count = dataImporter.importToDataSource(reader, dsName);
			System.out.println("Count of records: " + count);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
	
	/*public static void main(String[] args) {
		ISCInit.go();
		DataProcessor dp = new DataProcessor();
		
		//dp.insertData("employees");
		//dp.updateData("supplyItem");

	}*/

}
