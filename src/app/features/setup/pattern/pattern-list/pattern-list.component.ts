import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pattern } from 'src/app/core/model/pattern.model';
import { PatternService } from 'src/app/core/services/pattern-service/pattern.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  patterns: Pattern[] = []

  displayedColumn: string[] = ['position', 'code', 'despEng', 'despMyan', 'factor']
  dataSource: MatTableDataSource<Pattern>

  isMobile: boolean = false

  constructor(
    private patternService: PatternService,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {
    this.patterns = []
    this.dataSource = new MatTableDataSource<Pattern>(this.patterns)
    this.patternService.patterns.subscribe(data => {
      this.dataSource.data = data
    })

    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
  }

  ngOnInit(): void {
    this.getPatternData()
  }

  getPatternData() {
    this.patternService.getPattern().subscribe({
      next: patterns => {
        this.patterns = patterns
        this.dataSource = new MatTableDataSource(this.patterns)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(row: Pattern) {
    this.patternService._pattern = row
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }


}
