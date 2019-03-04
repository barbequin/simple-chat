import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

import {Button, Dropdown, Menu, Icon} from 'semantic-ui-react';
import Auth from './../services/Auth';

class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user || false
    }

    this.logout = this.logout.bind(this);
  }

  userDropDown(user){
    if (user) {

      const profileBtn = (
        <Button icon="user"></Button>
      )

      return <Menu.Item>
      <Dropdown trigger={profileBtn} icon={null} className="float-left">
      <Dropdown.Menu>
        <Dropdown.Item disabled={true}>User Profile</Dropdown.Item>

        <Dropdown.Item> <Icon name="user"></Icon> {user.email}</Dropdown.Item>
        <Dropdown.Item> <Icon name="setting"></Icon> Settings</Dropdown.Item>
        <Dropdown.Item> <Icon name="connectdevelop" color="green"></Icon> Online</Dropdown.Item>
        <Dropdown.Item onClick={this.logout}> <Icon name="power off"></Icon> Sign Out</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
    }
  }

  logout() {
    Auth.logout();
    window.location.href ='/login';
  }

  render(){
    let user = this.state.user;
    return(
      <Menu className='bg-blue topnav'>

        {this.userDropDown(user)}

        <Menu.Item className="brand">
            <h1>Chatty</h1>
        </Menu.Item>

        <Menu.Item>
          <Button icon="align justify" className="float-right" onClick={this.props.toggleUserList} />
        </Menu.Item>

      </Menu>

    );
  }
}

export default Topbar
