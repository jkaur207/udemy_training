"use server";

import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// Function to create a new post with image upload and checks
// Steps:
// 1. Make sure all fields are filled (title, content, image)
// 2. Upload the image to cloud storage
// 3. Save the post details to the database
// If something’s missing, it sends back errors
export async function createPost(prevState, formData) {
  // Grab data from the form
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');
  const errors = [];

  // Check if title is there
  if (!title?.trim()) {
    errors.push("Title is required - give your story a name!");
  }

  // Check if content is there
  if (!content?.trim()) {
    errors.push("Content is required - share your thoughts!");
  }

  // Check if image is uploaded
  if (!image?.size) {
    errors.push("Image is required - show us what you're talking about!");
  }

  // If there are errors, return them
  if (errors.length > 0) {
    return { errors };
  }

  try {
    // Upload image to cloud
    const imageUrl = await uploadImage(image);

    // Save post info to database
    await storePost({
      imageUrl,
      title,
      content,
      userId: 1 // Using 1 just as a placeholder for now
    });

    // Update the page to show new post
    revalidatePath('/', 'layout');
    
    // Send user to the feed page after posting
    redirect('/feed');
  } catch (error) {
    // If something goes wrong, show a friendly message
    throw new Error(
      'Oops! Something went wrong while creating your post. Please try again in a moment.'
    );
  }
}

// Function to toggle the like on a post (like a thumbs up)
// Uses a fixed user ID for now (2)
export async function togglePostLikedStatus(postId) {
  try {
    // Update like status in database
    await updatePostLikeStatus(postId, 2);
    
    // Refresh feed to show updated likes
    revalidatePath('/', 'layout');
  } catch (error) {
    // Show error message if like update fails
    throw new Error('Unable to update like status. Please try again later.');
  }
}
