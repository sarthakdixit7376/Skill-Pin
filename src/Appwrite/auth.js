import { Client, Account,ID } from "appwrite";
import conf from "../conf/conf.js";

export class Authservice{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        } 
    }

    async login({email,password}){
        try {
            const user =await this.account.createEmailPasswordSession(email,password);
            if(user){
                return await this.getCurrentUser();
            }else{
                return user
            }
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create(ID.unique(),email,password,name);
            if(userAccount)
                return await this.login({email,password});
            else
                return userAccount;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

    }
} 


const authService = new Authservice()

export default authService