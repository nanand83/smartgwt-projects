package com.vidhansu.sample.server.utils;
import java.sql.*;


public class TestSqlDriver {

	public void test() {
		try {
			Class.forName("com.mysql.jdbc.jdbc2.optional.MysqlDataSource");
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Connection con = null;
		try {
			con = DriverManager.getConnection( 
					"jdbc:mysql://localhost:3306/isomorphic","root","****");
			System.out.println(con.getClientInfo());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
