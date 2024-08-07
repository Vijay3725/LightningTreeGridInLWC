import { LightningElement, wire } from 'lwc';
import fetchAllAccountsWithContact from '@salesforce/apex/contactAccountHandler.fetchAllAccountsWithContact';

export default class TreeGridLWC extends LightningElement {

    gridData = [];

    @wire(fetchAllAccountsWithContact)
    accountsWithContacts({data,error}){
        if(data){
            console.log(data);
            this.formatGridData(data);
        }
        else if(error){
            console.error(error);
        }
    }

    gridColumns = [
        {label: "Name", fieldName: "Name", type: "text"},
        {label: "Phone", fieldName: "Phone", type: "text"},
        {label: " Account Website", fieldName: "Website", type: "url", typeAttributes:{
            target: "_blank"
        }}
    ];

    formatGridData(result){
        this.gridData = result.map(item=> {
            const {Contacts, ...accounts} = item;
            return {...accounts, "_children": Contacts }
         })
         console.log(this.gridData);
    }
}