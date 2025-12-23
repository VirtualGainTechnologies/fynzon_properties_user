import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  imports: [CommonModule, MatTooltipModule],
})
export class Carousel {
  @Input() data!: Array<any>;
  @Input() clientReview!: boolean;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  scrollAmount = 380;
  carouselData: any = [];

  //dependancies

  constructor() {}

  ngOnInit(): void {
    this.carouselData = this.data;
  }

  scroll(direction: number) {
    const container = this.carouselContainer.nativeElement;

    const maxScroll = container.scrollWidth - container.clientWidth;
    let newPosition = container.scrollLeft + direction * this.scrollAmount;

    if (newPosition > maxScroll) {
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'auto' });
      }, 300);
      return;
    }

    // 👉 wrap backward
    if (newPosition < 0) {
      newPosition = maxScroll;
    }

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  }
}
