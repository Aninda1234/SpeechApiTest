// speech.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private apiKey = 'c71f8c23977e47d884cc014c1a61e7de';
  private apiUrl = 'https://api.voicerss.org/';

  constructor(private http: HttpClient) {}

  generateSpeech(text: string, language: string, voice: string): Observable<string> {
    const params = `key=${this.apiKey}&hl=${language}&v=${voice}&src=${text}`;
    const url = `${this.apiUrl}?${params}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob: Blob) => {
        const audioUrl = URL.createObjectURL(blob);
        return audioUrl;
      })
    );
  }
}

