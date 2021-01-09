import React from 'react';
import {Link} from 'react-router-dom';

const BookList=(props)=>{

    const truncateOverview=(string,maxLength)=>{
        if(!string) return null;
        if(string.length<=maxLength) return string;
        return `${string.substring(0,maxLength)} ...`;
    }

    return(
        <div className="grid lg:grid-cols-2 gap-x-4 w-auto sm:grid-cols-1 sm:mx-auto">
        
        {
            props.books.map((book)=>{
                return(
                   
                        <div className="py-6" key={book.id}>
                            <div className="flex h-auto bg-white shadow-xl rounded-lg overflow-hidden">
                                <div className="w-full bg-cover">
                                    <img src={book.imageURL} className="rounded-lg rounded-b-none" alt=".."/>
                                </div> 
                                <div className="w-full p-4">
                                <h1 className="text-gray-900 font-bold text-2xl">{book.name}</h1>
                                <p className="mt-2 text-gray-600 text-sm">{truncateOverview(book.overview,250)}</p>
                            
                                <div className="flex item-center justify-between mt-3">
                                    <h1><span className="mr-2 bg-blue-400 font-bold text-white p-2 rounded  leading-none flex items-center">{book.rating}</span></h1>
                                    <button onClick={(event)=>props.deleteBookProp(book)} className="px-4 mr-2 mb-2 bg-red-500 text-white text-md font-bold rounded">Sil</button>
                                    <Link type="button" to={`/edit/${book.id}`} className="flex item-center justify-between pt-3 hover:no-underline px-4 mb-2 bg-red-500 text-white text-md font-bold rounded">Düzenle</Link>
                                </div>
                                </div>
                            </div>
                        </div>
                   
                )
            })
        }


</div>
            
    )
}

export default BookList;