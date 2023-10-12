
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { useState } from "react";


const New =  ()=> {
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const addNewMeetup = async (data)=>{
    
        console.log(data)
        setIsLoading(true)
        const res = await  fetch('/api/new-meetups',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        // const result  = await res.json()
        // console.log(result) 
        setIsLoading(false)
        router.push('/')
    
    }
    
    return <>
    {isLoading&&<p style={{textAlign:'center'}}>posting please wait</p>}
    {!isLoading&&<NewMeetupForm onAddMeetup={addNewMeetup}></NewMeetupForm>}
    </>
}

export default New;