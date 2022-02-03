import React, { useEffect, useState } from "react";
import {Link,useHistory,useParams} from 'react-router-dom';

import "./AddEdit.css"
import axios from 'axios';
import {toast} from "react-toastify";

const initialState={
    name: "",
    email: "",
    contact: "",
};

const AddEdit= () => {
    const [state, setState]=useState(initialState);

    const {name,email,contact}=state;

    const history=useHistory();

    const {id} = useParams();

    useEffect ( () => {
        axios.get(`http://localhost:3001/api/get/${id}`)
        .then((resp) => setState({ ...resp.data[0]}))
    },[id])

    const handleSubmit= (e) => { 
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error ("Please insert value into each input field");
         }
         else {
             if(!id){
                 axios
                 .post("http://localhost:3001/api/post",{
                 name,
                 email,
                 contact
                 }).then(()=>{
                 setState({name:"",email:"",contact:""});
                 })
                 .catch((err) => toast.error(err.response.data));
                 toast.success("Contact Added Successfully");
                 setTimeout( () => { history.push("/") },500);
                }else{
                    axios
                    .put(`http://localhost:3001/api/update/${id}`,{
                    name,
                    email,
                    contact
                    }).then(() => {
                    setState({name:"",email:"",contact:""});
                    })
                    .catch((err) => toast.error(err.response.data));
                    toast.success("Contact Updated Successfully");
                    setTimeout( () => { history.push("/") },500);
                }
        }
    };
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    };
    return (
        <div style={{marginTop:"30px"}}>
            
            <form style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignCenter:"center",
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                id="name"
                name="name"
                placeholder=" Your Name ..."
                value={name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input 
                type="email"
                id="email"
                name="email"
                placeholder="Your Email ..."
                value={email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="contact">Contact</label>
                <input 
                type="number"
                id="contact"
                name="contact"
                placeholder="Your contact No ..."
                value={contact || ""}
                onChange={handleInputChange}
                />
                <input type="submit" value={id? "Update" : "Save" }/>
                <Link to="/">
                    <input type="button"  value="Go Back"/>
                </Link>
            </form>

        </div>
    )
}

export default AddEdit;