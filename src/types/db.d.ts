import {Comment, Post, Blog, User, Vote, Bookmark } from '@prisma/client'

export type ExtendedPost = Post & {
    blog: Blog,
    votes: Vote[],
    author: User,
    comments: Comment[],
    bookmarks: Bookmark[],
}