const dummy = (blogs)=>{

    return 1
}
const totalLikes =(blogs)=>{
    console.log(blogs)
const blogsLikes = blogs.map(blog=>blog.likes)
 console.log("likes ", blogsLikes)
 const likes = blogsLikes.reduce((sum, currBlog)=>{
    console.log(currBlog)
    
    return sum+currBlog.likes}, 0)
 return likes
}
module.exports={dummy, totalLikes}