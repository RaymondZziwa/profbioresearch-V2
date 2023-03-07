import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../../side navbar/sidenav";

const Exhibitionmanagement = () => {
    return(
        <div className='container-fluid'>
            <Row style={{marginTop:'50px'}}>
                <Col sm='2' md='2' lg='2' xl='2'></Col>
                <Col sm='12' md='8' lg='8' xl='8' style={{backgroundColor:'red'}}>
                <div>
                    <h2>Register Exhibition</h2>
                    <form>
                        <input placeholder="Exhibition Name"/>
                        <input placeholder="Date"/>
                        <button>Save</button>
                    </form>
                </div>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <input type="text" placeholder="Name"/>
                            </td>
                            <td>
                                <input type="text" placeholder="Name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Name"/>
                            </td>
                            <td>
                                <input type="text" placeholder="Name"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    );
}
export default Exhibitionmanagement