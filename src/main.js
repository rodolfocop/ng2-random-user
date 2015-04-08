import {Component, Template, bootstrap} from 'angular2/angular2';
import {UserCard} from 'user-card';
import {RandomUser} from 'RandomUser';


@Component({
  selector: 'main',
  services: [RandomUser]
})
@Template({
  directives: [UserCard],
  inline: `
    <div class="new-user-button">
      <button class="ru-button --primary" autofocus (click)="getNewUser()">
        <i class="fa fa-user"></i>
        Get New User
      </button>
    </div>
    <user-card [user]="user"></user-card>
  `
})
class Main {
  constructor(randomUser:RandomUser) {
    this.user = {
      name: {
        first: 'Fred',
        last: 'Mertz'
      },
      username: 'TheFredMertz',
      email: 'freddie@aol.com',
      picture: {
        medium: 'fred.png'
      }
    };
    this.getRandomUser = randomUser.getUser;
  }

  getNewUser() {
    this.getRandomUser().then(user => this.user = user);
  }
}

bootstrap(Main);