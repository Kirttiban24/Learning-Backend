import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useContext, } from "react"
import { PostContext } from "../context/post.context"

export const usePost = () => {

    const context = useContext(PostContext)

    const {loading, setLoading,post, setPost,feed,setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    const handleLike = async (post) => {
        const data = await likePost(post)
        await handleGetFeed()
    }

    const handleUnLike = async (post) => {
        const data = await unLikePost(post)
        await handleGetFeed()
    }

    
    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }
}