import { useGetAllPostsQuery } from '@/redux/api/generalApi'
import React, { useEffect } from 'react'

const Top = () => {

  const {data: posts, isSuccess} = useGetAllPostsQuery()

  useEffect(() => {
    if (posts) {
      console.log("posts here",posts)
    }
  }, [posts])

  return (
    <div>Top</div>
  )
}

export default Top