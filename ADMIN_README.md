# Admin Interface Guide

## Overview
The admin interface allows you to manage projects and upload images without needing to edit code. Access it by navigating to `/admin` or clicking "Admin" in the navigation menu.

## Features

### Creating a Project
1. Click "Create New Project" button
2. Fill in the project details:
   - **Title**: The name of your project
   - **Description**: A description of the project
   - **Images**: Upload one or more images (you can select multiple files at once)
3. Click "Create Project" to save

### Editing a Project
1. Find the project you want to edit in the project grid
2. Click the "Edit" button
3. Modify the title, description, or images
4. Click "Update Project" to save changes

### Deleting a Project
1. Find the project you want to delete
2. Click the "Delete" button
3. Confirm the deletion

### Managing Images
- **Upload**: Select multiple images at once when creating or editing a project
- **Remove**: Click the "Remove" button on any image thumbnail to remove it from the project
- Images are stored in the `public/uploads` folder
- Each image gets a unique filename to prevent conflicts

## File Structure

- **Projects Data**: Stored in `data/projects.json`
- **Uploaded Images**: Stored in `public/uploads/`
- **API Routes**: Located in `app/api/`

## Important Notes

1. **Storage Limitations**: Projects are stored in browser localStorage, which has a limit of ~5-10MB. Large images can quickly fill this up. Images are automatically compressed, but you may still hit limits with many high-resolution images.

2. **Storage Quota Errors**: If you see "QuotaExceededError":
   - Remove some images from projects
   - Use smaller/compressed images
   - Delete old projects
   - **Recommended**: Set up a backend API for image storage (see below)

3. **Backend API Setup** (Recommended for production):
   Since static export doesn't support API routes, you have two options:
   
   **Option A: Use a Cloud Image Service**
   - Sign up for [Cloudinary](https://cloudinary.com) (free tier available)
   - Get your upload preset and cloud name
   - Update the admin interface to upload directly to Cloudinary
   
   **Option B: Set up a Separate Backend**
   - Deploy a simple Node.js/Express API to Vercel, Railway, or Render
   - Handle image uploads and store in cloud storage (S3, Cloudinary, etc.)
   - Update admin interface to call your API

4. **Current Storage**: Projects are stored in browser localStorage. This means:
   - Data persists in your browser
   - Data is NOT shared across devices/browsers
   - Data can be lost if you clear browser data
   - Limited to ~5-10MB total

## Future Enhancements

Consider adding:
- Authentication/authorization (password protection)
- Image optimization and thumbnail generation
- Drag-and-drop image reordering
- Bulk image upload
- Project categories/tags
- Image cropping and editing tools

