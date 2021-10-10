import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from '../../files.service';
import { FilesDataSource } from '../../files.data-source';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements AfterViewInit, OnInit {
  public files = [];
  public dataSource: FilesDataSource;
  public displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private filesService: FilesService) {
    this.dataSource = new FilesDataSource(this.filesService);

    this.displayedColumns = ['title'];
  }

  ngOnInit(): void {
    this.dataSource.load();
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadMore())).subscribe();
  }

  private loadMore() {
    this.dataSource.load(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
