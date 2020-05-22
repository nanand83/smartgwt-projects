package com.vidhansu.commons.client;

import java.util.HashMap;
import java.util.Map;

public class PlayGround {

	public static void main(String[] args) {
		
		Factory.register("place1", A.class);
		
		System.out.println(Factory.getMap());
		
		Class clz = Factory.getRegistered("place1");
		Parent widgetObj = null;
		try {
			widgetObj = (Parent) clz.newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(widgetObj);
	}

}

class Factory {
	private static Map<String, Class> map = new HashMap<>();
	
	public static void register(String s, Class clz) {
		map.put(s, clz);
	}
	
	public static Class getRegistered(String s) {
		return map.get(s);
	}
	
	public static Map getMap() {
		return map;
	}
}

class Parent {
	
}

class A extends Parent {
	
}

class B extends Parent {
	
}
