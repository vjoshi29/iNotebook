import React, { useContext, useEffect, useRef , useState} from "react";
import Noteitem from "./Noteitem";
import noteContext from "../Context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes , editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login")
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null)
  const [note , setNote] = useState({id: "" , etitle:"" , edescription:"" , etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle:currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
    
  };
  const handleClick =(e) =>{
    editNote(note.id , note.etitle , note.edescription , note.etag)
    refClose.current.click()
    props.showAlert("Updated successfully" , "success") 
}
const onChange =(e)=>{
   setNote({...note , [e.target.name]: e.target.value})
}
  
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog ">
          <div className="modal-content" style={{border:"0.3vw solid black" , backgroundColor:"#1e035f" , color:"white"}}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className='container my-3'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle"  value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3 ">
  <label className="form-label" htmlFor="etag">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
  </div>
  
</form>
       </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button" 
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled ={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-1">
        <h2 style={{backgroundColor:"#f1aeb5"}} className='container py-1 px-1 '>Your Notes <i class="fa-solid fa-note-sticky fa-sm"></i></h2>
        <div className ="row " >
        {notes.length ===0 && 'No notes to display'}
        
        {notes.map((note) => {
          return (
            
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
        </div>
      </div>
    </>
  );
}

export default Notes;
