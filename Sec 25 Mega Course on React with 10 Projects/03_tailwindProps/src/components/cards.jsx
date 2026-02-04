

function Cards({userName = 'SP', post = 'Not Asigned yet', pic ="https://picsum.photos/800/400" , myArr = [9,8,6,5]}) {
    console.log(userName, post, myArr)
  return (
<div className="flex flex-col items-center p-7 rounded-2xl">
  <div>
    <img className="size-48 shadow-xl rounded-md" alt="" src={pic} />
  </div>
  <div className="flex">
    <span className="text-2xl font-medium">{userName}</span>
    <span className="text-2xl font-medium text-sky-500">{post}</span>
    <span className="flex">
      <span>No. {myArr}</span>
      <span>-------------------</span>
      <span>2025</span>
    </span>
  </div>
</div>

    // <div>
    //     <img src='https://picsum.photos/800/400' alt=''/>
    //     <h1 classNameName='text-2xl bg-amber-700 rounded-3xl'> A card for photos</h1>
    // </div>
  )
}

export default Cards