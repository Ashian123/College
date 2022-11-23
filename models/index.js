"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.User = exports.Tag = exports.PostTag = exports.PostMeta = exports.PostComment = exports.PostCategory = exports.Post = exports.Category = void 0;
const Category_1 = require("./Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const Post_1 = require("./Post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Post_1.Post; } });
const PostCategory_1 = require("./PostCategory");
Object.defineProperty(exports, "PostCategory", { enumerable: true, get: function () { return PostCategory_1.PostCategory; } });
const PostComment_1 = require("./PostComment");
Object.defineProperty(exports, "PostComment", { enumerable: true, get: function () { return PostComment_1.PostComment; } });
const PostMeta_1 = require("./PostMeta");
Object.defineProperty(exports, "PostMeta", { enumerable: true, get: function () { return PostMeta_1.PostMeta; } });
const PostTag_1 = require("./PostTag");
Object.defineProperty(exports, "PostTag", { enumerable: true, get: function () { return PostTag_1.PostTag; } });
const Tag_1 = require("./Tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return Tag_1.Tag; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
function initModels(sequelize) {
    Category_1.Category.initModel(sequelize);
    Post_1.Post.initModel(sequelize);
    PostCategory_1.PostCategory.initModel(sequelize);
    PostComment_1.PostComment.initModel(sequelize);
    PostMeta_1.PostMeta.initModel(sequelize);
    PostTag_1.PostTag.initModel(sequelize);
    Tag_1.Tag.initModel(sequelize);
    User_1.User.initModel(sequelize);
    Category_1.Category.belongsTo(Category_1.Category, {
        as: 'parent',
        foreignKey: 'parentId'
    });
    Category_1.Category.hasMany(Category_1.Category, {
        as: 'children',
        foreignKey: 'parentId'
    });
    Category_1.Category.hasMany(PostCategory_1.PostCategory, {
        as: 'postCategories',
        foreignKey: 'categoryId'
    });
    Category_1.Category.belongsToMany(Post_1.Post, {
        as: 'posts',
        through: PostCategory_1.PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
        onDelete: 'CASCADE'
    });
    Post_1.Post.belongsTo(User_1.User, {
        as: 'author',
        foreignKey: 'authorId'
    });
    Post_1.Post.belongsTo(Post_1.Post, {
        as: 'parent',
        foreignKey: 'parentId'
    });
    Post_1.Post.hasMany(Post_1.Post, {
        as: 'children',
        foreignKey: 'parentId'
    });
    Post_1.Post.hasMany(PostCategory_1.PostCategory, {
        as: 'postCategories',
        foreignKey: 'postId'
    });
    Post_1.Post.belongsToMany(Category_1.Category, {
        as: 'categories',
        through: PostCategory_1.PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        onDelete: 'CASCADE'
    });
    Post_1.Post.hasMany(PostComment_1.PostComment, {
        as: 'comments',
        foreignKey: 'postId'
    });
    Post_1.Post.hasMany(PostMeta_1.PostMeta, {
        as: 'metas',
        foreignKey: 'postId'
    });
    Post_1.Post.hasMany(PostTag_1.PostTag, {
        as: 'postTags',
        foreignKey: 'postId'
    });
    Post_1.Post.belongsToMany(Tag_1.Tag, {
        as: 'tags',
        through: PostTag_1.PostTag,
        foreignKey: 'postId',
        otherKey: 'tagId',
        onDelete: 'CASCADE'
    });
    PostCategory_1.PostCategory.belongsTo(Post_1.Post, {
        as: 'post',
        foreignKey: 'postId'
    });
    PostCategory_1.PostCategory.belongsTo(Category_1.Category, {
        as: 'category',
        foreignKey: 'categoryId'
    });
    PostComment_1.PostComment.belongsTo(Post_1.Post, {
        as: 'post',
        foreignKey: 'postId'
    });
    PostComment_1.PostComment.belongsTo(PostComment_1.PostComment, {
        as: 'parent',
        foreignKey: 'parentId'
    });
    PostComment_1.PostComment.hasMany(PostComment_1.PostComment, {
        as: 'children',
        foreignKey: 'parentId'
    });
    PostMeta_1.PostMeta.belongsTo(Post_1.Post, {
        as: 'post',
        foreignKey: 'postId'
    });
    PostTag_1.PostTag.belongsTo(Post_1.Post, {
        as: 'post',
        foreignKey: 'postId'
    });
    PostTag_1.PostTag.belongsTo(Tag_1.Tag, {
        as: 'tag',
        foreignKey: 'tagId'
    });
    Tag_1.Tag.hasMany(PostTag_1.PostTag, {
        as: 'postTags',
        foreignKey: 'tagId'
    });
    Tag_1.Tag.belongsToMany(Post_1.Post, {
        as: 'posts',
        through: PostTag_1.PostTag,
        foreignKey: 'tagId',
        otherKey: 'postId',
        onDelete: 'CASCADE'
    });
    User_1.User.hasMany(Post_1.Post, {
        as: 'posts',
        foreignKey: 'authorId'
    });
    return {
        Category: Category_1.Category,
        Post: Post_1.Post,
        PostCategory: PostCategory_1.PostCategory,
        PostComment: PostComment_1.PostComment,
        PostMeta: PostMeta_1.PostMeta,
        PostTag: PostTag_1.PostTag,
        Tag: Tag_1.Tag,
        User: User_1.User
    };
}

exports.initModels = initModels;
