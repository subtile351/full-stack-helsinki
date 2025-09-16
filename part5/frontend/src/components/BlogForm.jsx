const BlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return(
    <>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input value={newBlogTitle} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input value={newBlogAuthor} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input value={newBlogUrl} onChange={handleUrlChange} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm