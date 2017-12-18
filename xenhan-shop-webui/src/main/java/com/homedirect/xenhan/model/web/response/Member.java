package com.homedirect.xenhan.model.web.response;

public class Member {
    private String fullName;
    private String userName;
    private String phone;
    private String email;

    public Member() {
    }

    public Member(String fullName, String userName, String phone, String email) {
        this.fullName = fullName;
        this.userName = userName;
        this.phone = phone;
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
