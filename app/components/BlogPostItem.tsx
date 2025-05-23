'use client';

import React from 'react';
import { Timestamp } from 'firebase/firestore'; // For date type

interface BlogPostItemProps {
  title: string;
  content: string;
  author: string; // Could be author's name or email
  date: string | Date | Timestamp; // Allow multiple date types
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ title, content, author, date }) => {
  const formatDate = (d: string | Date | Timestamp): string => {
    if (!d) return 'Unknown date';
    if (d instanceof Timestamp) {
      return d.toDate().toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    }
    if (d instanceof Date) {
      return d.toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    }
    // If it's a string, assume it's already formatted or attempt to parse
    try {
      return new Date(d).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch (e) {
      return d; // Return original string if parsing fails
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <div className="text-sm text-gray-500 mb-3">
        <span>By: {author}</span> | <span>{formatDate(date)}</span>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default BlogPostItem;
