import Post from "./Post"
import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, orderBy } from '@firebase/firestore'
import { db } from '../firebase'

// const posts = [
//     {
//         id: '123',
//         username: 'dainelsaundershue',
//         userImg: '/danielprofilephoto-min.jpeg',
//         img: '/danielprofilephoto-min.jpeg',
//         caption: 'Instagram Clone by Daniel Saunders'
//     },
//     {
//         id: '1',
//         username: 'dainelsaundershue',
//         userImg: '/danielprofilephoto-min.jpeg',
//         img: '/danielprofilephoto-min.jpeg',
//         caption: 'Instagram Clone by Daniel Saunders'
//     },
//     {
//         id: '12',
//         username: 'dainelsaundershue',
//         userImg: '/danielprofilephoto-min.jpeg',
//         img: '/danielprofilephoto-min.jpeg',
//         caption: 'Instagram Clone by Daniel Saunders'
//     },
// ]

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => 
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs)
        })

    , [db]);

    // console.log(posts)
  return (
    <div>
        {posts.map((post) => (

        <Post 
        key={post.id} 
        id={post.id} 
        userImg={post.data().profileImg} 
        username={post.data().username} 
        img={post.data().image} 
        caption={post.data().caption} />
        ))}
    </div>
  )
}

export default Posts