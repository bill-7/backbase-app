import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() inputChange: EventEmitter<any> = new EventEmitter();

  onInputChange(event: Event): void {
    this.inputChange.emit((event.currentTarget as HTMLInputElement).value); //https://stackoverflow.com/a/62070747
  }
}
