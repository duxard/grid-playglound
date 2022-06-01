import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild, ContentChildren,
  ElementRef,
  OnInit,
  QueryList, TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('link', {static: false, read: ElementRef}) link!: ElementRef<HTMLElement>;
  @ViewChildren('link') links?: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('template') templates1?: QueryList<TemplateRef<ElementRef>>;
  // or
  @ViewChildren(TemplateRef) templates2?: QueryList<TemplateRef<ElementRef>>;

  @ContentChildren('p_link') p_link?: QueryList<ElementRef<HTMLElement>>;

  showTemplate = true;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log(this.links?.toArray());
    console.log(this.templates1?.toArray());
    console.log(this.templates2?.toArray());
    console.log(this.p_link?.toArray());
  }

  ngAfterContentInit() {

  }

}

