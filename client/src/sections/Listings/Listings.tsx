import React from 'react'
import {useQuery,useMutation} from "../../lib/api"
import { ListingsData,DeleteListingData,DeleteListingVariables,Listing } from './types'

const LISTINGS =`
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
    }
  }
`

const DELETE_LISTING = `
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
    id
    title
    image
    address
  }
}
`

interface Props{
    title: string
}

const Listings = ({title}:Props) => {

  const {data,refetch,loading,error}=useQuery<ListingsData>(LISTINGS);
  const[deleteListing,{
    loading:deleteListingLoading,
    error:deleteListingError
  }]=useMutation<DeleteListingData,DeleteListingVariables>(DELETE_LISTING);

  
  const deleteListingHndler = async(id:string) => {
    await deleteListing({id});
    refetch();
    console.log(data);
  }

  const handleDeleteListing = (list:Listing):void => {
    deleteListingHndler(list.id);
  }


  const ListingsList=data?data.listings.map((listing:any)=>{
    return (
      <ul style={{display:"flex"}} key={listing.id}>
        <div>{listing.title} </div>
        <button onClick={( )=>handleDeleteListing(listing)}>Delete</button>
      </ul>
    )
  }):null;

  if(loading){
    return <h1>Loading...</h1>
  }

  if(error){
    return <h1>Oh you have an error...</h1>
  }

  const deleteListingLoadingMessage=deleteListingLoading?(
    <h4>Deletion in progress ...</h4>
  ): null;

  const deleteListingErrorMessage=deleteListingError?(
    <h4>Uh oh ! Something went wrong with deleting -please try again later :( </h4>
  ): null;



  return(
    <div>
      <h2>{title}</h2>
      {ListingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
     )
}

export default Listings