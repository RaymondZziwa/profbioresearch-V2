import { Form } from "react-bootstrap";
import logo from '../../imgs/logo.png'
import './login.css'
import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Login = () => {
    const [branch, setBranch] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [loginStatus, setloginStatus] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const history = useHistory()
    let status = false

    const authCtx = useContext(AuthContext)

    if (loginStatus.length > 0) {
        status = true
    }

    const handleBranchData = (event) => {
        event.preventDefault()
        setBranch(event.target.value)
    }
    const handleUsernameData = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }
    const handlePwdData = (event) => {
        event.preventDefault()
        setPwd(event.target.value)
    }
    const handleDeptData = (event) => {
        event.preventDefault()
        setDepartment(event.target.value)
    }
    const handleRoleData = (event) => {
        event.preventDefault()
        setRole(event.target.value)
    }
    const showPwd = event => {
        event.preventDefault()
        setPasswordShown(!passwordShown);
    }
    const loginHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/login', {
            branch: branch,
            department: department,
            role: role,
            username: username,
            password: pwd
        })
        if (typeof res.data === "string") {
            setloginStatus(res.data)
        } else {
            const { redirectPath, token, user, department, role } = res.data;
            authCtx.login(token)
            localStorage.setItem("username", user);
            localStorage.setItem("branch", branch);
            localStorage.setItem("department", department);
            localStorage.setItem("role", role);
            localStorage.setItem("home", redirectPath)
            history.replace(redirectPath)
        }
    }
    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Form>
                <div className="mb-3">
                    <img src={logo} alt="logo" height="180px" />
                    <p style={{ color: "#3452A3", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "22px" }} className="login-header">PROF BIORESEARCH</p>
                </div>
                {loginStatus && <div style={{ margin: '20px' }} class="alert alert-danger" role="alert">{loginStatus}</div>}
                <div style={{ backgroundColor: "#8CA6FE", padding: "30px", borderRadius: "10px" }}>
                    <div className="mb-3">
                        <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={handleBranchData}>
                            <option selected>Branch</option>
                            <option value="admin">Administrator</option>
                            <option value="namungoona">Namungoona</option>
                            <option value="masanafu">Masanafu</option>
                        </select>
                    </div>
                    {branch === 'namungoona' &&
                        <>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                                {/* <p style={{textAlign:"right",fontSize:"15px",textDecoration:"underline",color:"white"}}>Forgot Password?</p> */}
                            </div>
                        </>
                    }
                    {branch === 'admin' &&
                        <>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                                {/* <p style={{textAlign:"right",fontSize:"15px",textDecoration:"underline",color:"white"}}>Forgot Password?</p> */}
                            </div>
                        </>
                    }
                    {branch === 'masanafu' &&
                        <>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={handleDeptData}>
                                        <option selected>Department</option>
                                        <option value="production">Production</option>
                                        <option value="farm">Farm</option>
                                        <option value="projects">Projects</option>
                                        {/* <option value="namungoona">Namungoona</option>
                                <option value="masanafu">Masanafu</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={handleRoleData}>
                                        <option selected>Role</option>
                                        <option value="custodian">Production Custodian</option>
                                        <option value="manager">Production Manager</option>
                                        <option value="farmmanager">Farm Manager</option>
                                        <option value="projectsmanager">Projects Manager</option>
                                        {/* <option value="namungoona">Namungoona</option>
                                <option value="masanafu">Masanafu</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                                {/* <p style={{textAlign:"right",fontSize:"15px",textDecoration:"underline",color:"white"}}>Forgot Password?</p> */}
                            </div>
                        </>
                    }
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }} onClick={loginHandler}>LOGIN</button>
                    </div>
                </div>
                <div className="mb-3">
                    <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}>Terms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy</p>
                </div>
            </Form>
        </div>
    )
}

export default Login;