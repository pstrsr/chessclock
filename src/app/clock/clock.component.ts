import {Component, HostListener, OnInit} from '@angular/core';
import {SettingsService} from '../service/settings.service';
import {MatDialog} from '@angular/material/dialog';
import {GameOverDialogComponent} from '../game-over-dialog/game-over-dialog.component';
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  isPaused = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.code.toUpperCase() === 'SPACE') {
      this.settings.player1.startTimer();
      this.settings.player2.startTimer();
    }
  }

  constructor(private settings: SettingsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  pressClock(player: string) {
    this.isPaused = false;
    if (this.settings.isStarted) {
      if (player === 'player1') {
        this.settings.player1.startTimer();
        this.settings.player2.stopTimer();
      } else {
        this.settings.player2.startTimer();
        this.settings.player1.stopTimer();
      }
    } else {
      this.startGame(player);
    }
  }

  private startGame(player: string) {
    if (player === 'player1') {
      this.settings.player1.startTimer();
    } else {
      this.settings.player2.startTimer();
    }
    this.settings.isStarted = true;

    this.settings.player1.isLost$.subscribe(lost => {
      if (lost) {
        this.openDialog(this.settings.player2.name);
      }
    });

    this.settings.player2.isLost$.subscribe(lost => {
      if (lost) {
        this.openDialog(this.settings.player1.name);
      }
    });
  }

  openDialog(playerName: string): void {
    this.settings.restart();
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      width: '250px',
      data: playerName,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  player1() {
    return this.settings.player1;
  }

  player2() {
    return this.settings.player2;
  }

  pause() {
    this.isPaused = true;
    this.settings.player1.stopTimer();
    this.settings.player2.stopTimer();
  }

  openSettings() {
    this.pause();
    const dialogRef = this.dialog.open(SettingsDialogComponent, {});
  }

  restart() {
    this.pause();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Restart Game?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.settings.restart();
      }
    });
  }
}
