const conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USER),
    appwriteSkillsCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_SKILLS),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf