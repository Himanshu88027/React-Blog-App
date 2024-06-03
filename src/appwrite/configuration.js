import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Storage{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
         .setEndpoint(config.appwriteEndpointUrl)
         .setProject(config.appwriteProjectId);
    
         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client);
    }

    async createPost({title, content, featuredImage, slug, status, userId}){
        try {
            return this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite::createPost::error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite::updatePost::error", error);
        }
    }

    async deletePost(slug){
        try {
            return this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite::deletePost::error", error);
            return false
        }
    }

}