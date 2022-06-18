import React from 'react'
import {useQuery,useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {  List,Avatar, Button,Spin } from 'antd';
import './style/listings.css';
import { DeleteListing as DeleteListingData ,DeleteListingVariables} from './__generated__/DeleteListing';
import { Listings as ListingsData ,Listings_listings} from './__generated__/Listings';

import {ListingsSkeleton} from './components'

const LISTINGS =gql`
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

const DELETE_LISTING = gql`
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
    await deleteListing({variables:{id}});
    refetch();
    console.log(data);
  }


  const listings=data?data.listings:null;


  const ListingsList=listings?(
    <List itemLayout='horizontal' dataSource={listings}
    renderItem={(listing)=>(
      <List.Item actions={[<Button type='primary' onClick={()=>deleteListingHndler(listing.id)}>Delete</Button>]}>
        <List.Item.Meta title={listing.title} description={listing.address}
        avatar={<Avatar shape='square' size={48}   src={listing.image}/>}
        />
      </List.Item>
    )}
    />
  ):null;

  if(loading){
    return <div className='listing'><ListingsSkeleton title={title}/></div>
  }

  if(error){
    return <h1>Oh you have an error...</h1>
  }


  const deleteListingErrorMessage=deleteListingError?(
    <h4>Uh oh ! Something went wrong with deleting -please try again later :( </h4>
  ): null;



  return(
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
      <h2>{title}</h2>
      {ListingsList}
      {deleteListingErrorMessage}
      </Spin>
    </div>
     )
}

export default Listings