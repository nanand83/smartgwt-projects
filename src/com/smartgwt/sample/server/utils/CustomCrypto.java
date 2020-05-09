package com.smartgwt.sample.server.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
 
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class CustomCrypto {
		 
	    private static SecretKeySpec secretKey;
	    private static final String secretKeyStr = "M0nk3y";
	   
	    
	    public static void setKey() 
	    {
	    	if (secretKey == null) {
		        MessageDigest sha = null;
		        try {
		        	byte[] key = secretKeyStr.getBytes("UTF-8");
		            sha = MessageDigest.getInstance("SHA-1");
		            key = sha.digest(key);
		            key = Arrays.copyOf(key, 16); 
		            secretKey = new SecretKeySpec(key, "AES");
		        } 
		        catch (NoSuchAlgorithmException e) {
		            e.printStackTrace();
		        } 
		        catch (UnsupportedEncodingException e) {
		            e.printStackTrace();
		        }
	    	}
	    }
	 
	    public static String encrypt(String encryptThis) { 
	        try {
	            setKey();
	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
	            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
	            return Base64.getEncoder().encodeToString(
	            		cipher.doFinal(
	            				encryptThis.getBytes("UTF-8")
	            				)
	            		);	            			
	        } 
	        catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }
	 
	    public static String decrypt(String decryptThis) { 
	    	try {
	            setKey();
	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
	            cipher.init(Cipher.DECRYPT_MODE, secretKey);
	            return new String(
	            		cipher.doFinal(
	            				Base64.getDecoder().decode(decryptThis)
	            			)
	            		);
	        } 
	        catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }
	    
	    /*public static void main(String[] args) {
			System.out.println(CustomCrypto.encrypt("xxxxxxx"));
			System.out.println(CustomCrypto.decrypt("FTNYqTbjXCBqKi5Wj9ocLg=="));
		}*/
	}
