import React  , {useContext} from "react";
import noteContext from "../Context/notes/noteContext"

function Noteitem(props) {
  const context = useContext(noteContext)
  const {deleteNote} = context;
  const { note , updateNote} = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-3 mx-2">
        <div className="card-body" style={{border:"0.2vw solid black" , boxShadow:"0.5vw 0.5vw grey"}}>
          <h5 className="card-title p-3  bg-dark-subtle text-dark-emphasis">{note.title}</h5>
          <hr/>
          <p className="card-text fst-italic">{note.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted Successfully" , "success");}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() =>{ updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
