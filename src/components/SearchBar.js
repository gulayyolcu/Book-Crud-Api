import React from 'react';
import {Link} from 'react-router-dom';

class SearchBar extends React.Component{
    handleSubmitForm=(event)=>{
        event.preventDefault();
    }
    render(){
        return(
            <div className="mt-5 md:col-span-3">
                <form onSubmit={this.handleSubmitForm}>
                    <div className="flex flex-row justify-between">
                        <input onChange={this.props.searchBookProp} type="text" className="p-1 mr-2 pl-4 border-solid border-2 border-indigo-100 shadow-xl flex-1 block w-full mx-auto rounded sm:text-lg" placeholder="Kitap ara.."/>
                        <Link to="/add" type="button" className="btn btn-md btn-danger ml-2">Add Book</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;