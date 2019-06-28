import React, { Component } from "react";




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      passwordError: "",
      usernameError: "",
      DisabledButton:true
    };
    this.onSubmit = this.onSubmit.bind(this);
  }


  
  componentDidMount() {
   fetch('/api/login' , {
    method: 'POST',
   credentials: 'include',
       headers : {
        'Content-Type': 'application/json',
       'Accept': 'application/json'
       },
       body : JSON.stringify({username: this.state.username , password : this.state.password})
    })
  }  
 
  

  //handlechange
  handleChange = e => {
    if (e.target.id === "password") {
      if (e.target.value === "") {
        this.setState({
          passwordError: true
        });
      } else {
        this.setState({
          passwordError: false,
          password: e.target.value
        });
      }
    }
    if (e.target.id === "username") {
      if (e.target.value === "") {
        this.setState({
          usernameError: true
        });
      } else {
        this.setState({
          usernameError: false,
          username: e.target.value
        });
      }
    }
    if (this.state.usernameError === false && this.state.passwordError === false) {
      this.setState({
        DisabledButton: false
      });
    }
  };



  onSubmit(e)  {
    e.preventDefault();
   
    
  }          
    
  
  render() {


    return (
      <div className="content-container">
        <div className="jumbotron" style={{ backgroundColor: "#0f7986" }}>
          <div className="container">
            <div className="text-white  align-items-center text-center justify-content-center">
              <div>
                {" "}
                {/* <img src={logo} width="15%" /> */}
              </div>

              <h4 style={{ marginTop: "1%" }}>Bellevue Medical Center</h4>
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            borderWidth: "10px",
            borderColor: "#0f7986",
            borderStyle: "outset",
            width: "50%",
            margin: "0% 25%",
            borderRadius: "15px"
          }}
        >
          <div className="card-body">
            <h5 className="card-title text-center" style={{ color: "#0f7986" }}>
              Welcome Back
            </h5>
            <form className="form-signin" method="post" action="/api/login">
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  defaultValue={this.state.username}
                  placeholder="Username"
                  style={{ borderRadius: "45px" }}

                  onChange={e => {
                    this.handleChange(e);
                  }}
                />

                {this.state.usernameError ? (
                  <alert className=" alert  " style={{ color: "red" }}>
                    Please enter your Username
                  </alert>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  defaultValue={this.state.password}
                  style={{ borderRadius: "45px" }}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />

                {/* {this.state.passwordError ? (
                  <alert   className=" alert" style={{ color: "red" }}>
                    {this.state.message}
                  </alert>
                ) : (
                  ""
                )} */}
              </div>

              <button
                type="submit"
                className="btn "
                disabled={this.state.DisabledButton}
                onClick={this.onSubmit}
                style={{
                  borderRadius: "45px",
                  backgroundColor: "#0f7986",
                  color: "white"
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
