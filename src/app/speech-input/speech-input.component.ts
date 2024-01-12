// speech-input.component.ts

import { Component } from '@angular/core';
import { SpeechService } from '../speech.service';

// import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-speech-input',
  templateUrl: './speech-input.component.html',
  styleUrls: ['./speech-input.component.css'],
})
export class SpeechInputComponent {
  textToSpeech: string = '';
  language: string = 'en-us';
  voice: string = 'Amy';
  audioSrc: string = '';
  speechReadyMessage: string = '';

  // /// variables for lang and voice options for the functionbelow
  // languageOptions: { value: string, label: string }[] = [];
  // voiceOptions: { value: string, label: string, language: string }[] = [];
  
  // /// data was not in proper tabular form to store in excel. Made it Tabular on 05.01.24  
  // loadDataFromFile() {
  //   // You should replace this path with the actual path to your JSON file
  //   const langCodeJsonPath = '/assets/Lang_Code.json';

  //   this.readJsonFile(langCodeJsonPath); 

  //   // // You should replace these paths with the actual paths to your Excel files
  //   // const languageExcelPath = 'Lang_Code.xlsx';
  //   // const voiceExcelPath = 'Lang_Code.xlsx';

  //   // this.languageOptions = this.readExcelFile(languageExcelPath);
  //   // this.voiceOptions = this.readExcelFile(voiceExcelPath);
  // }

  // readJsonFile(jsonFilePath: string) {
  //   this.http.get(jsonFilePath).subscribe(
  //     (data: any) => {
  //       // Assuming your JSON structure has an array named "languages"
  //       this.languageOptions = data.languages.map((item: any) => ({
  //         value: item.Value,
  //         label: item.Label,
  //         language: item.Language // Adjust this according to your JSON structure
  //       }));

  //       this.voiceOptions = data.voices.map((item: any) => ({
  //         value: item.Value,
  //         label: item.Label,
  //         language: item.Language // Adjust this according to your JSON structure
  //       }));

  //       console.log(this.languageOptions);
  //       console.log(this.voiceOptions);
  //     },
  //     (error: any) => {
  //       console.error('Error loading data from JSON file:', error);
  //     }
  //   );
  // }

  // readExcelFile(filePath: string): any[] {
  //   const workbook = XLSX.readFile(filePath);
  //   const sheetName = workbook.SheetNames[0];
  //   const sheet = workbook.Sheets[sheetName];

  //   // Assuming your Excel file has columns named "value" and "label"
  //   return XLSX.utils.sheet_to_json(sheet).map((item: any) => ({
  //     value: item.Value,
  //     label: item.Label,
  //     language: item.Language // Adjust this according to your Excel structure
  //   }));
  // }



  // Old code with few voices from 2 languages 
  languageOptions: { value: string, label: string }[] = [
    { value: 'en-us', label: 'US English' },
    { value: 'en-in', label: 'US India' },
    // { value: 'spanish', label: 'Spanish' },
    // Add more language options as needed
  ];

  voiceOptions: { value: string, label: string, language: string }[] = [
    { value: 'Linda', label: 'Female Voice 1 (default)', language: 'en-us'  },
    { value: 'Amy', label: 'Female Voice 2', language: 'en-us' },
    { value: 'Mary', label: 'Female Voice 3', language: 'en-us'  },
    { value: 'John', label: 'Male Voice 1', language: 'en-us'  },
    { value: 'Mike', label: 'Male Voice 2', language: 'en-us'  },
    { value: 'Eka', label: 'Female Voice 1 (default)', language: 'en-in' },
    { value: 'Jai', label: 'Female Voice 2', language: 'en-in'  },
    { value: 'Ajit', label: 'Male Voice', language: 'en-in' },
    // Add more voice options as needed
  ];

  
  // // Old code with only voices from 1 lang (US English) available 
  // voiceOptions: { value: string, label: string }[] = [
  //   { value: 'Linda', label: 'Female Voice 1 (default)' },
  //   { value: 'Amy', label: 'Female Voice 2' },
  //   { value: 'Mary', label: 'Female Voice 3' },
  //   { value: 'John', label: 'Male Voice 1' },
  //   { value: 'Mike', label: 'Male Voice 2' },
  //   // Add more voice options as needed
  // ];


  getMappedVoices(): { value: string, label: string }[] {
    const selectedLanguage = this.language;
    return this.voiceOptions
      .filter(vo => vo.language === selectedLanguage)
      .map(vo => ({ value: vo.value, label: vo.label }));
  }

  constructor(private http: HttpClient, private speechService: SpeechService) {
    // // Call the function to load language & code data
    // this.loadDataFromFile();
  }

  generateSpeech() {
    if (this.textToSpeech) {
      this.speechService.generateSpeech(this.textToSpeech, this.language, this.voice).subscribe(
        (audioUrl) => {
          this.audioSrc = audioUrl;
          this.speechReadyMessage = 'Speech ready!';
        },
        (error) => {
          console.error('Error generating speech:', error);
          this.speechReadyMessage = 'Error generating speech. Please try again.';
        }
      );
    }
  }
}

