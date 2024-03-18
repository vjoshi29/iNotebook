import React, { useState  , useContext} from 'react'
import noteContext from "../Context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note , setNote] = useState({title: "" , description: "" , tag: ""})
    const handleClick =(e) =>{
         e.preventDefault()
         addNote(note.title , note.description , note.tag)
         setNote({title: "" , description: "" , tag: ""})
         props.showAlert("Added successfully" , "success")
    }
    const onChange =(e)=>{
       setNote({...note , [e.target.name]: e.target.value})
    }
  return (
    <div>
       <div className='container my-2 py-2'>
      <h2 style={{backgroundColor:"#cff4fc"}} className='py-1 px-1'>Add a Note  <i class="fa-solid fa-user-pen fa-sm"></i> </h2>
      <form className='container my-3  py-2' style={{border:"0.3vw solid black" , backgroundColor:"#1e035f" , color:"white" , width:"75%"}}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label fw-bold">TITLE</label>
    <input type="text" className="form-control " id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}  minLength={5}  required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label fw-bold">DESCRIPTION</label>
    <textarea className="form-control " id="description" name='description' value={note.description} onChange={onChange}  minLength={5} rows="3" required></textarea>
  </div>
  <div className="mb-3 ">
  <label className="form-label fw-bold" htmlFor="tag">TAG</label>
    <input type="text" className="form-control " id="tag" name='tag' value={note.tag} onChange={onChange}  minLength={5} required/>
  </div>
  <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-light" onClick={handleClick}>Add Note</button>
  
</form>
<hr style={{ border: "0.2vw solid #030237" }}/>
    </div>
    </div>
  )
}

export default AddNote
