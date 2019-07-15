import React from "react";
import './User.css'
import {Link} from 'react-router-dom'

class User extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            user: ''      
        };
      }

    componentWillMount() {

      fetch('http://localhost:4000/user/profile', { 
         method: 'get', 
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + ' '+localStorage.getItem('token')
         })
      })
        .then(res => 
          res.json()
        )
        .then(
          (result) => {
            console.log(result)
            this.setState({
              items: result.data.imagesLiked,
              user: result.data.name
            });
          console.log(this.state.items)
          },
          (error) => {
            console.log(error);
          }
        )
    }


    render() {

        const listItems = this.state.items.map((item, index) => {
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
                      <img alt="" className="Image-Post" src={item.url} />
                    </div>
                  </div>
                  <div className="Post-caption">
                    <strong>Chris</strong> 
                    <p>{item.name}</p>
                  </div>
                </div>
               </article>
             );
          });
      
        return(
            <>
                <nav className="Nav">
                <div className="Nav-menus">
                <div className="Nav-brand">
                    {/* <a className="Nav-brand-logo" href="/"> */}
                    Instagram
                    {/* </a> */}
                    <div className="Nav-User">
                        <span>{this.state.user}</span>
                        <Link to="/">Home</Link>
                    </div>
                    
                </div>
                </div>
                </nav>
                <h3>{this.props.title}</h3>
                <ul>
                    {listItems}
                </ul>
            </>
        )
    }

}

export default User;