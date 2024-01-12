// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpeechInputComponent } from './speech-input/speech-input.component';
import { SpeechService } from './speech.service';


@NgModule({
  declarations: [AppComponent, SpeechInputComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [SpeechService],
  bootstrap: [AppComponent],
})
export class AppModule {}

