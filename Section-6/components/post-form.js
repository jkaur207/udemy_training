"use client";

import { useFormState } from "react-dom";
import FormSubmit from "@/components/form-submit";

// PostForm component — lets users create new posts easily
// You can add a title, upload an image, and write your content here
// Uses React’s useFormState to handle form submit and validation
export default function PostForm({ action }) {
  // useFormState keeps track of form data and errors — like a helper
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        {/* Title input — headline for your post */}
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            placeholder="Enter your post title"
          />
        </p>

        {/* Image upload — add a picture for your post */}
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            aria-description="Choose a PNG or JPEG image to share"
          />
        </p>

        {/* Content area — write your story or thoughts */}
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea 
            id="content" 
            name="content" 
            rows="5"
            placeholder="Share your thoughts..."
          />
        </p>

        {/* Submit button component */}
        <FormSubmit />
      </form>

      {/* Show any errors from form validation here */}
      {state.errors && (
        <ul className="form-errors">
          {state.errors.map(error => (
            <li key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
