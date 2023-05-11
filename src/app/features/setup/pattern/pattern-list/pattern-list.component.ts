import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pattern } from 'src/app/core/model/pattern.model';
import { PatternService } from 'src/app/core/services/pattern-service/pattern.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';


@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  patterns: Pattern[] = []

  displayedColumn: string[] = ['position', 'code', 'despEng', 'despMyan', 'factor']
  dataSource: MatTableDataSource<Pattern>

  constructor(
    private patternService: PatternService, private commonService: CommonServiceService
  ) {
    this.patterns = []
    this.dataSource = new MatTableDataSource<Pattern>(this.patterns)
    this.patternService.patterns.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getPatternData()
  }

  getPatternData() {
    this.patternService.getPattern().subscribe({
      next: patterns => {
        console.log(patterns)
        this.patterns = patterns
        this.dataSource = new MatTableDataSource(this.patterns)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

}
