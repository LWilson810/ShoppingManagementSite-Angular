import {Directive, ElementRef, Renderer2, HostListener, Output, EventEmitter} from '@angular/core';
@Directive({
  selector: '[autoDeslash]'
})
export class AutoDeslashDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @Output() public clickOutside = new EventEmitter();
  @HostListener('document:click', ['$event.target']) public onClick(targetElement) {
    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
      // this.renderer.removeClass(this.el.nativeElement, 'open');
    } else {
        const classList = this.el.nativeElement.classList.value;
        this.renderer.setStyle(this.el.nativeElement, 'color', 'lightblue');
        // console.log(classList);
        // if (classList.includes('open')) {
        //     this.renderer.removeClass(this.el.nativeElement, 'open');
        // } else {
        //     this.renderer.addClass(this.el.nativeElement, 'open');
        // }
    }
  }

  ngAfterViewInit() {

    var text = this.el.nativeElement.innerHTML;
    // console.log(text);
    text = text.replace('_', ' ');

    var textArray = text.split(' ');
    var newText = "";
    
    for(var i = 0; i < textArray.length; i++) {
      let midText = "";
      for(var j = 0; j < textArray[i].length; j++) {
        if(j == 0) 
          midText += textArray[i][0].toUpperCase();
        else 
          midText += textArray[i][j];
      }
      if(i == textArray.length -1) {
        newText += midText
      } else {
        newText += midText + " "
      }
    } 
    // console.log(newText);
    this.el.nativeElement.innerHTML = newText;
    // this.el.nativeElement.style.textTransform = 'uppercase';
    // console.log(this.el);
  }
}
