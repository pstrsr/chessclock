import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from './settings-dialog/settings-dialog.component';
import {SettingsService} from './service/settings.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chessclock';

  constructor(public dialog: MatDialog, private settingsService: SettingsService) {
  }



}
