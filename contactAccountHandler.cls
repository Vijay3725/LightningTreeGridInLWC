public with sharing class contactAccountHandler {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAllAccountsWithContact(){
        return [SELECT Name, Phone, Website, (SELECT Name, Phone, Email FROM Contacts) FROM Account LIMIT 5];
    }
}