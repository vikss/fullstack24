const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  console.log(blogs)
  const blogsLikes = blogs.map((blog) => blog.likes)
  console.log("total likes ", blogsLikes)
  const likes = blogsLikes.reduce((sum, currBlog) =>  sum+currBlog , 0)
  return likes
}

const favoriteBlog = (blogs)=>{

    console.log("Bloglist is ", blogs)
    let maxBlog;
    let maxLikes = 0;
    blogs.forEach(blog => {

    console.log("likes ", blog.likes)
         if(blog.likes>maxLikes){
            maxLikes = blog.likes
            maxBlog=blog
         }

    
   })
    console.log("Maxblog is ", maxBlog)
    return maxBlog;


}
module.exports = { dummy, totalLikes, favoriteBlog }