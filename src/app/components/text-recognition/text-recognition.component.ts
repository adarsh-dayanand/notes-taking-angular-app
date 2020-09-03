import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as iink from 'iink-js';

@Component({
  selector: 'text-recognition',
  templateUrl: './text-recognition.component.html',
  styleUrls: ['./text-recognition.component.css']
})
export class TextRecognitionComponent implements OnInit, AfterViewInit, OnDestroy {
  
  editor: any;

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
  }
  

  // ViewChild decorator for the div
  @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;

  //Connect to the API Service
  ngAfterViewInit() : void {
    this.editor = iink.register(this.domEditor.nativeElement, {
     recognitionParams: {
       type: 'TEXT',
       protocol: 'WEBSOCKET',
       apiVersion: 'V4',
       server: {
         scheme: 'https',
         host: 'webdemoapi.myscript.com',
         applicationKey: '157bb367-6c8c-4a01-aff6-73947f7a3853', //AppID
         hmacKey: 'ea8d2a77-a106-47a5-997c-ce301e665fe8', //H MacID
       },
     }
   });
 };

 onClick(){

  let data = this.editor.domElement.innerText;
  // Head line of the text, Remove the characters and 
  //trim to remove white spaces and line breaks
 
  data = data.replace('¶','').replace('...','').trim();
  console.log(data);

  alert(data);
  }


 ngOnDestroy() : void {
     this.editor.close();
 }

}
