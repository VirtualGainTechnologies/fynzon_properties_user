import { Component, Output , EventEmitter} from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() requestMeeting = new EventEmitter<any>();
  fynzonProprty: string = "./assets/icons/fynzon_property_logo.png";

  requestForMeeting() {
    this.requestMeeting.emit('');
  }
isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() {
  this.isMenuOpen = false;
}

}
