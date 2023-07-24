const sendMessageToTheServer= async (url)=>{
    const request= await fetch(url);

    try{
        const response = await request.json();
        console.log(response)

    }catch(error){
        console.log(error)
    }
}

sendMessageToTheServer('http://localhost:8080/retrieve')
