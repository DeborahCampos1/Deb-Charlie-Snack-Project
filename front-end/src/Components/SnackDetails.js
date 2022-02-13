import { useState, useEffect } from 'react';
import { Link, useParams , useNavigate } from 'react-router-dom'
import HeartHealth from "./HeartHealth";


import axios from 'axios'
const API = process.env.REACT_APP_API_URL;


function SnackDetails() {
  const [snack, setSnack] = useState({});
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${API}/snacks/${id}`)
      .then((res)=>{
        setSnack(res.data.payload)
      }).catch((err)=>{
        console.log(err)
      })
  }, [id])
  console.log(snack)

  const handleDelete=()=>{
      axios.delete(`${API}/snacks/${id}`)
      .then((res)=>{
        navigate("/snacks")
      }).catch((err)=>{
        console.log(err)
      })
  }
  let heartHealth = HeartHealth(snack.is_healthy)

    return (
      <aside className="SnackDetails">
        <article>
        <h1>Snacks</h1>
        <h2>{snack.name}</h2>
        <h4>
          {heartHealth}
        </h4>
        <div><img src={snack.image} alt={snack.name}></img></div>

           <div>Protein: {snack.protein}</div>
           <div>Fiber: {snack.fiber}</div>
           <div>Added Sugar: {snack.added_sugar}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
          <button><Link to="/snacks">Back</Link></button>
      </aside> 
    );
  }
  
  export default SnackDetails;
  