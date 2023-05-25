import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'

const AddmachineryData = () => {
    return(
        <Row>
        <Col sm='12' md='4' lg='4' xl='4'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'20px'}}>
        <div>
             <h1>Add Machinery Data</h1>
             <div>
                 <form>
                     <>
                         <label>Machinery Name:</label>
                         <input type="text" name="name" />
                     </>
                     <>
                         <button>SAVE</button>
                     </>
                 </form>
            </div>
            </div>
        </div>
       
    </Row>
    )
}

export default AddmachineryData