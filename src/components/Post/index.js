    import React from "react";
    import Modal from 'react-awesome-modal';
    import './Post.css';
    import {Link} from 'react-router-dom'

    import axios from 'axios';

    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { css } from 'glamor';

    class Post extends React.Component {

      change = {
        showMe: false,
        user: {}
      }

        constructor(props){
            super(props);
            this.state = {
                visible : false,
                showMe: false,
                username: '',
                isLoaded: false,
                password: '',
                numbers : ["1","2","3"],
                items: [],
             
            };
          }

          componentWillMount() {
            fetch("http://localhost:4000/user/posts")
              .then(res => 
                res.json()
              )
              .then(
                (result) => {
                  this.setState({
                    items: result
                  });
                console.log(this.state.items)
                },
                (error) => {
                  console.log(error);
                }
              )

              console.log(localStorage.getItem('token'));

              if(localStorage.getItem('token') != null) {
                this.setState({
                  showMe: true
                })
              }
              else {
                this.setState({
                  showMe: false
                })
              }
        
          }


          

        handleChange(e){
          this.setState({username: e.target.value});
        }

        handleChangePassword(e) {
            this.setState({password: e.target.value});
        }

        handleSubmit(e){
          //call the api here with current state value (this.state.username)
          console.log(this.state);
          
          this.register(this.state.username, this.state.password);
        
      }

     
         register = (username, password) => {
          //  console.log(showMe)
          console.log(username, password);
           console.log('come here', this.state.user, this.state.showMe);
           let form = {
            "emailId": username,
            "password": password
            }
            console.log(form);

            axios.post('http://localhost:4000/user/signIn', form)
            .then((response) => {
              console.log(response);
              if(response.data.status === 200) {
              console.log(this.state.showMe)
              localStorage.setItem('token', response.data.data.token);
              this.setState({showMe : true});
              console.log(localStorage);
              toast("Sign in successfull !", {
                className: css({
                  background: 'green',
                  fontColor: 'white'
                }),
                bodyClassName: css({
                  fontSize: '20px',
                  fontColor: 'white'
                }),
                progressClassName: css({
                  background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
                }),

                autoClose: 2500
              })
              this.closeModal();
              }
              else {
                console.log('Invalid username/password');
                toast("Invalid username/password", {
                  className: css({
                    background: 'red'
                  }),
                  bodyClassName: css({
                    fontSize: '20px',
                    fontColor: 'white'
                  }),
                  progressClassName: css({
                    background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
                  }),
  
                  autoClose: 2500
                })
              }
              // this.change.showMe = true;
             
           

              // console.log(className)

          })
            .catch(function(error){
              console.log(error);
              //Perform action based on error
            });
            }
    
          Login = () => {
              // this.props.modalPopup(true);
              this.setState({
                visible : true
            });
          }

          Logout = () => {
            localStorage.removeItem('token');
            console.log(localStorage);
            this.setState({showMe: false})

          }
    
          openModal= () =>  {
            this.setState({
                visible : true
            });
        }
    
        closeModal= () =>  {
            this.setState({
                visible : false
            });
        }


          handleClick = (index, item) => {
            let button = document.getElementsByClassName("like-button" + index);
            console.log('button === ', button);
            if(button[0].innerText === "LIKE") {
              console.log('like me');
              button[0].innerText = 'DISLIKE'
              let likeUrl = 'http://localhost:4000/user/post/like';

              var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' +localStorage.getItem('token')
               }

              let body = {
                "isToggleOn": true,
                "name" : item.name,
                "url": item.urlImage
              }

              axios.post(likeUrl, body, {headers: headers})
              .then((res) => {
                console.log(res);
                toast(res.data.message, {
                  className: css({
                    background: 'darkblue',
                    fontColor: 'white'
                  }),
                  bodyClassName: css({
                    fontSize: '20px',
                    fontColor: 'white'
                  }),
                  progressClassName: css({
                    background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
                  }),
                 autoClose: 2500
                })
                fetch("http://localhost:4000/user/posts")
                  .then(res => 
                    res.json()
                  )
                  .then(
                    (result) => {
                      this.setState({
                        items: result
                      });
                    console.log(this.state.items)
                    },
                    (error) => {
                      console.log(error);
                    }
                  )

              },
              (err) => {
                console.log(err);
              })


            }
            //   button[0].innerText = "DISLIKE"
            else if(button[0].innerText === "DISLIKE") {
              console.log('dislike me');
              button[0].innerText = 'LIKE'
              let likeUrl = 'http://localhost:4000/user/post/dislike';

              var header = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' '+localStorage.getItem('token')
               }

              let body = {
                "imageId": item._id,
                "name": item.name,
                "url": item.urlImage
              }

              axios.post(likeUrl, body, {headers: header})
              .then((res) => {
                console.log(res);

                toast(res.data.message, {
                  className: css({
                    background: 'darkblue',
                    fontColor: 'white'
                  }),
                  bodyClassName: css({
                    fontSize: '20px',
                    fontColor: 'white'
                  }),
                  progressClassName: css({
                    background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
                  }),
                    autoClose: 2500
                  })

                fetch("http://localhost:4000/user/posts")
                .then(res => 
                  res.json()
                )
                .then(
                  (result) => {
                    this.setState({
                      items: result
                    });
                  console.log(this.state.items)
                  },
                  (error) => {
                    console.log(error);
                  }
                )
              },
              (err) => {
                console.log(err);
              })

            }
          }

          
          render(){

            const showMe = this.state.showMe;
            let p;
            if(showMe === true) {
                p = <div className="Action-User">
                    <p onClick={this.Logout} className="User-Action">Logout</p>
                    <Link to="/user">Profile</Link>
                </div>

            }
            else {
                p = <div className="Action-User">
                    <p onClick={this.Login} className="User-Action">Login/Register</p>
                </div>
                
            }
          
            const listItems = this.state.items.map((item, index) => {
              const showMe = this.state.showMe;
              let like;
              if(showMe === true) {
                like =   <button key={index} className={"like-button" + index} onClick={() => this.handleClick(index,item)}>
                {item.isToggleOn ? 'DISLIKE' : 'LIKE'}
              </button>

              }
              else {
                like = <div></div>
              }
            
              return (
                <article className="Post" key = {'mykey' + index} ref="Post">
     
                  <div>
                    <header>
                      <div className="Post-user">
                        <div className="Post-user-nickname">
                          <span>Chris </span>
                        </div>
                      </div>
                    </header>
                    <div className="Post-image">
                      <div className="Post-image-bg">
                        <img alt="" className="Image-Post" src={item.urlImage} />
                      </div>
                    </div>
                    <div className="Post-caption">
                      <strong>Chris</strong> 
                      <p>{item.name}</p>
                      <div id="dynamicInput">
                       {/* <FormInput key={index} /> */}
                    </div>
                      Likes - 
                      {item.usersLikes.map((user, index) => 
                        <span key={index}> {user.name}, </span>
                      )}  

                      <div id="content">
                    
                        {like}
                      </div>
                    </div>
                  </div>
                 </article>
               );
            });
        
            return (
              <>
              <div className='services'>
  
            <nav className="Nav">
              <div className="Nav-menus">
                <div className="Nav-brand">
                  {/* <a className="Nav-brand-logo" href="/"> */}
                    Instagram
                  {/* </a> */}
                     <div className="Nav-User">
                         {p}
                     </div>
                  
                </div>
              </div>
 
            </nav>
    
                <h3>{this.props.title}</h3>
                <ul>
                  {listItems}
                </ul>
              </div>
              <Modal visible={this.state.visible}  onRegister = {this.register}  width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()} >
                
                <div className="divCLass">
                    <div id="wrapper">
                        <div className="main-content">
                            <div className="header">
                            <img src="https://i.imgur.com/zqpwkLQ.png" />
                            </div>
                            <div className="l-part">
                            <input type="text" placeholder="Username" onChange={this.handleChange.bind(this)} className="input-1" />
                            <div className="overlap-text">
                                <input type="password" placeholder="Password" onChange={this.handleChangePassword.bind(this)} className="input-2" />
                                {/* <a href="#">Forgot?</a> */}
                            </div>
                            <input type="button" value="Log in" onClick={this.handleSubmit.bind(this)} className="btn" />
                            </div>
                        </div>
                        <div className="sub-content">
                            <div className="s-part">
                            {/* Don't have an account?<a href="#">Sign up</a> */}
                        </div>
                    </div>
                </div>
                <a onClick={() => this.closeModal()}>Close</a>
                </div>
              </Modal>
              <ToastContainer toastClassName="dark-toast"/>
              </>
            );
          }        
    }
    export default Post;


    // class FormInput extends React.Component {

    //   render() {
    //     return (
    //       <input type="text" name = "input"/>
    //     )
    //   }
    // }