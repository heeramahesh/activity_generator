import React ,{useEffect,useState} from 'react'
import axios from "axios"
import {Button,Table} from "react-bootstrap"
import Collapsible from 'react-collapsible';

//to get the items stored in localstorage
const getLocalItems =()=>{
    let list=localStorage.getItem('activity')
    if(list){
        return JSON.parse(list)
    }
    else
    {
        return [];
    }
}
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
//main component
const Activity = () => {
    const [activity,setActivity]=useState(getLocalItems())
    const [id,setId]=useState('')
     
    //for getting data from API
    const generateData=async ()=>{
        const response= await axios.get("https://www.boredapi.com/api/activity/")
        const data=response.data
        data["status"]="None"
        console.log(data)
        const updatedAct=[data,...activity]
        setActivity(updatedAct)
        
        }
     //updating activity status   
    const updateStatus=(e)=>{
        e.preventDefault()
       let value=e.target.value
       console.log(value)
       let temp= activity.map((e)=>{
           if(e.key===id)
            {
                e.status=value
                //console.log(value)
            }
            return e
        })
    console.log(temp)
    setActivity(temp)
    setId('')
        

    }
    //to change status
    const changeStatus=(key)=>{
        console.log(key)
        setId(key)
        console.log(id)

    }
    //sorting the content increasing order  based on particpant 
    const sortItem=(e)=>{
        e.preventDefault()
        console.log("hello")
        let arr=[...activity]
        arr.sort(GetSortOrder("participants"))
        setActivity(arr)
        
        console.log(activity)
    }
    
    useEffect(()=>{
         if(activity)
         {
            localStorage.setItem('activity',JSON.stringify(activity))
        }
    },[activity])
 
    return (
        <div className="wrapper">
             <Button variant="warning"  size="lg" block onClick={generateData}>New Activity</Button>  
             <Table striped bordered hover size="sm">
                 <thead>
                     <th>Activity</th>
                     <th>Type</th>
                     <th>No of participants</th>
                     <th>Link</th>
                     <th>status</th>
                     <th>Action Status</th>
                     <th>Add Notes</th>
                 </thead>
                <tbody>
                    {
                        activity.map((item,index)=>(
                            <tr key={item.key}>
                                <td>{item.activity}</td>
                                <td>{item.type}</td>
                                <td>{item.participants}</td>
                                <td>{item.link}</td>
                                <td>
                                  {  (id===item.key && item.status==="None") ? 
                                   (<div>
                                   <select className="status"  onChange={updateStatus}>
                                        <option  value="None">None</option>
                                        <option  value="Not Interested">Not Interested</option>
                                        <option  value="Completed">Completed</option>
                                    </select>
                                    </div>):
                                    (<div>{item.status}</div>)

                                   }
                                </td>
                                
                                <td>{
                                       (item.status==="None")  ?   
                                  ( <div> 
                                       <Button variant="secondary" onClick={()=>changeStatus(item.key)}>Change Status</Button>
                                    </div>
                                  ):
                                 ( <div> 
                                       <Button variant="secondary" disabled> Status Changed</Button>
                                    </div>
                                 )
                                }
                                </td>
                                <td>
                                <Collapsible trigger="Enter Notes">
                                   <textarea>
                                       
                                   </textarea>
                                </Collapsible>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
             </Table>
             <div><Button variant="primary" size="lg" onClick={sortItem}>Sort Based on Partcipant</Button></div>
        </div>
    )
}

export default Activity
