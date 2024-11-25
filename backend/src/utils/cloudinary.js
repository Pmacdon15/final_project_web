import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY.API_KEY,
    api_secret: process.env.CLOUDINARY.API_SECRET    
})

export default async function uploadOnCloudinary(localFilePath){
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        console.log("Upload on cloudinary successful", response.url);
        fs.unlinkSync(localFilePath);
        return response.url;
        
    } catch (error) {
        console.error("Upload on cloudinary failed: ", error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}