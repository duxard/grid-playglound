import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TestService, useClass: TestService }
  ]
})
export class PlaygroundComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {
  @Input() user!: {name: string, age: number};

  @ViewChild('link', {static: false, read: ElementRef}) link!: ElementRef<HTMLElement>;
  @ViewChildren('link') links?: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('template') templates1?: QueryList<TemplateRef<ElementRef>>;
  // or
  @ViewChildren(TemplateRef) templates2?: QueryList<TemplateRef<ElementRef>>;

  @ContentChildren('p_link') p_link?: QueryList<ElementRef<HTMLElement>>;

  showTemplate = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private testService: TestService,
    private elByClassName: ElementRef
  ) { }

  ngOnInit(): void {
    this.testService.logMessage();
  }

  ngAfterViewInit() {
    console.log(this.links?.toArray());
    console.log(this.templates1?.toArray());
    console.log(this.templates2?.toArray());
    console.log(this.p_link?.toArray());

    const btnElementList: NodeList = (<HTMLElement>this.elByClassName.nativeElement).querySelectorAll(
      '.myButton'
    );
    (btnElementList[0] as HTMLButtonElement).innerHTML = 'New name';
  }

  ngAfterContentInit() {

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}

