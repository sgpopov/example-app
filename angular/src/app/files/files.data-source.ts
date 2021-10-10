import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { File } from './file.type';
import { FilesService } from './files.service';

export class FilesDataSource implements DataSource<File> {
  private filesSubject = new BehaviorSubject<File[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count = this.countSubject.asObservable();

  constructor(private filesService: FilesService) {}

  connect(): Observable<File[]> {
    return this.filesSubject.asObservable();
  }

  disconnect(): void {
    this.filesSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.filesService
      .index(pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(response => {
        this.countSubject.next(response.pagination.total);
        this.filesSubject.next(response.data);
      });
  }
}
