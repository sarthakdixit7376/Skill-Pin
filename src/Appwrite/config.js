import { Client, Databases, ID } from "appwrite";
import conf from '../conf/conf.js'

export class Config{
     client = new Client()
     databases;
     bucket;

     constructor(){
        this.client.setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
                    .setProject('<PROJECT_ID>');
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPin({title,description,creatorId,status,coverFileId}){
        try {
           const newDoc= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteSkillsCollectionId,
                ID.unique(),
                {
                title,
                description,
                creatorId,
                status,
                coverFileId 
                });
        return newDoc;
        } catch (error) {
            throw error
        }
    }

    async updateDocument(docId,{title,description,creatorId,status,coverFileId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteSkillsCollectionId, 
                docId,
                {title,description,creatorId,status,coverFileId},
            );
        } catch (error) {
            throw error
        }
    }

    async deleteDocument(docId){
        try {
            return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteSkillsCollectionId,
            docId);
        } catch (error) {
            throw error
        }
        
    }

    async getPost(docId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteSkillsCollectionId, // collectionId
                docId,);

        } catch (error) {
            throw error
        }
    }
    async getPosts(queries =[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteSkillsCollectionId,
                queries
            )
        } catch (error) {
            throw error
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const crudServices=new Config()

export default crudServices;


    

