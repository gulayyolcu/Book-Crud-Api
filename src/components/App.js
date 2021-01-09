import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import EditBook from './EditBook';
import AddBook from './AddBook';
import BookList from './BookList';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends React.Component{
    state={
        books:[],
        searchBook:""
    }

    /* async componentDidMount(){
        const adres="http://localhost:3002/books";
        const cevap=await fetch(adres);
        const veri=await cevap.json();
        this.setState({
            books:veri
        })
    } */

    async componentDidMount() {
        this.getBooks();
    }

    async getBooks() {
        const response = await axios.get("http://localhost:3005/books");
        this.setState({ books: response.data })
    }

  /*   deleteBook=(book)=>{
        const newBookList=this.state.books.filter(
            b=>b.id!==book.id
        )
        this.setState({
            books:newBookList
        })
        this.setState(state=>({
            books:newBookList
        }))
    } */

    //FETCH API
  /*   deleteBook=async (book)=>{

        const baseURL=`http://localhost:3005/books/${book.id}`

        await fetch(baseURL,{
            method:"DELETE"
        })

        const newBookList=this.state.books.filter(
            b=>b.id!==book.id
        )
   
        this.setState(state=>({
            books:newBookList
        }))
    } */

    //AXIOS API
    deleteBook=async (book)=>{

        await axios.delete(`http://localhost:3005/books/${book.id}`)

        const newBookList=this.state.books.filter(
            b=>b.id!==book.id
        )
   
        this.setState(state=>({
            books:newBookList
        }))
    }

    searchBook=(event)=>{
        this.setState({
            searchBook:event.target.value
        })
    }

    //ADD BOOK
    addBook=async (book)=>{
        await axios.post(`http://localhost:3005/books`,book);
        this.setState({
            books:this.state.books.concat([book])
        })
        this.getBooks();
    }

    //EDIT BOOK
    editBook=async (id,updatedBook)=>{
        await axios.put(`http://localhost:3005/books/${id}`,updatedBook)
        this.getBooks();
    }

    render(){

        let filteredBook=this.state.books.filter(
            (book)=>{
                return book.name.toLowerCase().indexOf(this.state.searchBook.toLowerCase())!==-1
            }
        ).sort((a,b)=>{
            return a.id<b.id?1:a.id>b.id?-1:0
        })

        return(
            <Router>

            <div className="container mx-auto mt-5 mb-5">
                <Switch>
                    <Route path="/" exact render={()=>(
                        <React.Fragment>
                            <SearchBar searchBookProp={this.searchBook}/>
                            <div className="h-auto grid grid-rows-1 gap-4">
                            
                                    <BookList books={filteredBook} deleteBookProp={this.deleteBook}/>
                        
                            </div>
                        </React.Fragment>
                    )}>
                    </Route>

                    <Route path="/add" render={({history})=>(
                        <AddBook
                            onAddBook={
                                (book)=>{
                                    this.addBook(book)
                                    history.push("/")
                                }
                            }
                        />
                    )}>

                    </Route>

                    <Route path="/edit/:id" render={(props)=>(
                        <EditBook
                            {...props}
                            onEditBook={(id,book)=>{
                                this.editBook(id,book)
                            }}
                        />
                    )}>

                    </Route>
                        

                </Switch>
                
            </div>
            </Router>
        )
    }
}

export default App;