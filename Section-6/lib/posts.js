import sql from 'better-sqlite3';

// Initialize database connection
// Using better-sqlite3 for fast, synchronous SQLite operations
const db = new sql('posts.db');

/**
 * Sets up the database schema and creates initial test data.
 * Think of this as building the blueprint for our social media platform:
 * - Users are like profiles in a phonebook
 * - Posts are like pages in a diary
 * - Likes are like bookmarks connecting users to posts they enjoy
 */
function initDb() {
  // Create users table - our digital phonebook
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      first_name TEXT, 
      last_name TEXT,
      email TEXT
    )`);

  // Create posts table - our shared digital diary
  // Each post is like a page that includes an image, title, and story
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY, 
      image_url TEXT NOT NULL,
      title TEXT NOT NULL, 
      content TEXT NOT NULL, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER, 
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

  // Create likes table - our digital bookmarking system
  // Tracks which users have liked which posts
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      post_id INTEGER, 
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);

  // Seed initial users if the database is empty
  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');

  if (stmt.get().count === 0) {
    db.exec(`
      INSERT INTO users (first_name, last_name, email)
      VALUES 
        ('John', 'Doe', 'john@example.com'),
        ('Max', 'Schwarz', 'max@example.com')
    `);
  }
}

// Initialize database on module load
initDb();

/**
 * Retrieves posts with rich metadata including user info and like counts.
 * Like a newspaper stand that shows the latest stories first!
 * 
 * @param {number} maxNumber - Optional limit on number of posts to return
 * @returns {Promise<Array>} Array of post objects with metadata
 */
export async function getPosts(maxNumber) {
  const limitClause = maxNumber ? 'LIMIT ?' : '';

  // This query is like a recipe that combines:
  // 1. Post details (the story)
  // 2. Author information (the storyteller)
  // 3. Like counts (how popular the story is)
  // 4. Whether user #2 liked it (for UI state)
  const stmt = db.prepare(`
    SELECT 
      posts.id,
      image_url AS image,
      title,
      content, 
      created_at AS createdAt,
      first_name AS userFirstName, 
      last_name AS userLastName,
      COUNT(likes.post_id) AS likes,
      EXISTS(
        SELECT 1 FROM likes 
        WHERE likes.post_id = posts.id 
        AND likes.user_id = 2
      ) AS isLiked
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}
  `);

  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

/**
 * Saves a new post to the database.
 * Like adding a new page to our digital diary!
 * 
 * @param {Object} post - Post object with imageUrl, title, content, and userId
 * @returns {Object} Database result object
 */
export async function storePost(post) {
  const stmt = db.prepare(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)
  `);
  
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return stmt.run(post.imageUrl, post.title, post.content, post.userId);
}

/**
 * Toggles the like status of a post for a specific user.
 * Like a digital high-five - you can give it or take it back!
 * 
 * @param {number} postId - ID of the post to toggle like status
 * @param {number} userId - ID of the user toggling the like
 * @returns {Object} Database result object
 */
export async function updatePostLikeStatus(postId, userId) {
  // Check if user already liked the post
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?
  `);

  const isLiked = stmt.get(userId, postId).count === 0;

  // Toggle like status using appropriate SQL operation
  const toggleStmt = db.prepare(
    isLiked
      ? `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`
      : `DELETE FROM likes WHERE user_id = ? AND post_id = ?`
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return toggleStmt.run(userId, postId);
}
