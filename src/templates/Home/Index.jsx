import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    pagina: 0,
    postsPorPagina: 9,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    
    const {pagina, postsPorPagina} = this.state

    const postsAndFotos = await loadPosts();
    this.setState({
      posts: postsAndFotos.slice(pagina, postsPorPagina),
      allPosts: postsAndFotos,
    });
  };

  carregarMaisPosts = () => {
    const {
      pagina,
      postsPorPagina,
      allPosts,
      posts
    } = this.state

    const proximaPagina = pagina + postsPorPagina
    const proximasPaginas = allPosts.slice(proximaPagina, proximaPagina + postsPorPagina)
    posts.push(...proximasPaginas)

    this.setState({ posts, pagina: proximaPagina})

  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({searchValue: value})
  }

  render() {
    const { posts, pagina, postsPorPagina, allPosts, searchValue } = this.state;
    const naoTemPostagens = pagina + postsPorPagina >= allPosts.length

    const filtroPost = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    }) 
    : posts

    return (
      <section className="container">
        <div className="search-container">
          <SearchInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        
        {filtroPost.length > 0 && (
          <Posts posts={filtroPost} />
        )}

        {filtroPost.length === 0 && (
          <p>Não foi encontrado nenhuma pesquisa com <strong>{searchValue}</strong></p>
        )}
        
        <div className='button-container'>
          {!searchValue && (
            <>
              <Button 
                texto="Ver mais" 
                onClick={this.carregarMaisPosts} 
                disabled={naoTemPostagens}
              />
            </>
          )}
        </div>
      </section>
    );
  }
}

export default Home;