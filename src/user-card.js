import {Component, Template, If, For} from 'angular2/angular2';

@Component({
  selector: 'user-card',
  bind: {
    user: 'user',
    loading: 'loading'
  }
})
@Template({
  directives: [If, For],
  inline: `
    <div class="user-card">
      <div [hidden]="!loading">
        <content select="[loading]"></content>
      </div>
      <div [hidden]="loading">
        <div [hidden]="user">
          <content select="[no-user]"></content>
        </div>
        <div *if="user">
          <div class="user-avatar-container">
            <img [src]="user.picture.medium" alt="User Avatar"/>
          </div>
          <div class="user-properties">
            <div *for="#prop of properties">
              <strong>{{prop.title}}:</strong> {{prop.getVal(user)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserCard {
  constructor() {

    this.properties = [
      {
        title: 'Name',
        getVal: user => upperWords(`${user.name.first} ${user.name.last}`)
      },
      {
        title: 'Username',
        getVal: user => user.username
      },
      {
        title: 'Email',
        getVal: user => user.email
      },
      {
        title: 'Address',
        getVal: user => (
          upperWords(`${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.zip}`)
        )
      },
      {
        title: 'Birthday',
        getVal: user => moment(user.dob * 1000).format('MMMM Do, YYYY')
      },
      {
        title: 'Cell Phone Number',
        getVal: user => user.cell
      }
    ];


    function upperWords(string) {
      return string.split(' ').map(word => {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
      }).join(' ');
    }


  }
}

