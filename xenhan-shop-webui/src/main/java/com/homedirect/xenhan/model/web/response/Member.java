package com.homedirect.xenhan.model.web.response;

public class Member {
    private String fullName;
    private String userName;
    private String phone;

    public Member() {
    }

    public Member(String fullName, String userName, String phone) {
        this.fullName = fullName;
        this.userName = userName;
        this.phone = phone;
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
}
