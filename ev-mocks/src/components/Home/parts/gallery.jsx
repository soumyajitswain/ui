import { Image } from "./image";
import SimpleMap from "../../Ev/Map/SimpleMap";


export const Gallery = (props) => {
  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Gallery</h2>
          <p>
            The map shows all the charging station location in bangalore region.  
          </p>
        </div>
        <div className='row'>
          <div className='portfolio-items'>
            <SimpleMap/>
          </div>
        </div>
      </div>
    </div>
  )
}
