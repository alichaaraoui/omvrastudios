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

1. **Development Mode**: The admin interface works best in development mode (`npm run dev`). For production, you'll need to set up proper file storage (consider using cloud storage like AWS S3, Cloudinary, or similar).

2. **Static Export**: If you're using static export (GitHub Pages), the API routes won't work. You'll need to:
   - Use the admin interface in development mode
   - After making changes, rebuild the site
   - Or set up a separate backend service

3. **Image Storage**: Currently, images are stored locally. For production, consider:
   - Using a cloud storage service (AWS S3, Cloudinary, etc.)
   - Implementing image optimization
   - Generating thumbnails automatically

4. **Data Backup**: The `data/projects.json` file contains all your project data. Make sure to back it up regularly.

## Future Enhancements

Consider adding:
- Authentication/authorization (password protection)
- Image optimization and thumbnail generation
- Drag-and-drop image reordering
- Bulk image upload
- Project categories/tags
- Image cropping and editing tools

