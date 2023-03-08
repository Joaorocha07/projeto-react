export const loadPosts = async () => {

    const postsResposta = await fetch('https://jsonplaceholder.typicode.com/posts')
    const fotosResposta = await fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, fotos] = await Promise.all([postsResposta, fotosResposta])

    const postsJson = await posts.json()
    const fotosJson = await fotos.json()

    const postsAndFotos = postsJson.map((post, index) => {
        return { ...post, cover: fotosJson[index].url }
    }) 

    return postsAndFotos

}