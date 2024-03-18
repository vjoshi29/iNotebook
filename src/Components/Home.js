
import Notes from './Notes'


const Home = (props) => {
  const {showAlert} = props
  return (
   <div style={{border: "0.7vw solid navy"}} >
      
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
