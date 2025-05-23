'use client';

import React, { useEffect, useState } from 'react';
import { db, createDocument } from './firebase'; // Assuming createDocument is set up for "blogPosts"
import { collection, getDocs, Timestamp, orderBy, query } from 'firebase/firestore';
import BlogPostItem from './components/BlogPostItem'; // Adjust path as necessary
import { useAuth } from './UserContext'; // Adjust path as necessary

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorEmail: string; // Or authorDisplayName
  createdAt: Timestamp | Date | string; // Firestore timestamp, Date object, or string
}

export default function BlogPage() {
  const { user } = useAuth(); // For showing create post form

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming 'blogPosts' is your collection name
      const postsCollectionRef = collection(db, 'blogPosts');
      // Order posts by 'createdAt' in descending order
      const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedPosts: BlogPost[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          authorId: data.authorId,
          authorEmail: data.authorEmail || 'Anonymous', // Handle missing email
          createdAt: data.createdAt, // Keep as Firestore Timestamp or convert as needed
        };
      });
      setPosts(fetchedPosts);
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err.message || 'Failed to fetch blog posts.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!user) {
      setFormError("You must be logged in to create a post.");
      return;
    }
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setFormError("Title and content cannot be empty.");
      return;
    }

    try {
      const newPostData = {
        title: newPostTitle,
        content: newPostContent,
        authorId: user.uid,
        authorEmail: user.email || 'Unknown Email', // Fallback if email is null
        createdAt: Timestamp.now(), // Use Firestore Timestamp for server-side consistency
      };
      const docId = await createDocument('blogPosts', newPostData); // createDocument handles adding to Firestore
      
      // Optimistically add to state or refetch
      // For simplicity, refetching:
      await fetchPosts(); 
      
      setNewPostTitle('');
      setNewPostContent('');
      setShowCreateForm(false);
    } catch (err: any) {
      console.error("Error creating post:", err);
      setFormError(err.message || 'Failed to create post.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Blog</h1>
          {user && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showCreateForm ? 'Cancel' : 'Create New Post'}
            </button>
          )}
        </div>

        {user && showCreateForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create a New Post</h2>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{formError}</span>
              </div>
            )}
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <label htmlFor="newPostTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="newPostTitle"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="newPostContent" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="newPostContent"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                  rows={6}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Post
              </button>
            </form>
          </div>
        )}

        {loading && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Loading posts...</p>
            {/* Optional: Add a spinner here */}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No blog posts yet. Be the first to create one!</p>
          </div>
        )}
        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {posts.map(post => (
              <BlogPostItem
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.authorEmail} // Or user.displayName if available and preferred
                date={post.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
