import { Component, OnInit, HostListener } from '@angular/core';
import { AnimationEvent } from "@angular/animations";

import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import { Grid, ColDef, GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { Router } from '@angular/router';
const selectData = [
  { value: 0, label: "this" },
  { value: 1, label: "is" },
  { value: 2, label: "sparta" },
  { value: 3, label: "yolo" },
  { value: 4, label: "yoloooooo" },
  { value: 5, label: "yola" },
  { value: 6, label: "yoli" },
  { value: 7, label: "yolu" },
  { value: 8, label: "yolp" },
  { value: 9, label: "yolop" },
  { value: 10, label: "yolpo" },
  { value: 11, label: "yolui" },
  { value: 12, label: "yolqw" },
  { value: 13, label: "yolxz" },
  { value: 14, label: "yolcv" },
  { value: 15, label: "yolbn" }
];
const rowDatas1 = [
  { make: null }
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null },
  // { make: null, model: null, price: null, country: null, city: null }
];
const columnDefs2 = [
  {
    headerName: "Already present data selector",
    field: "make",
    cellEditor: AutocompleteSelectCellEditor,
    cellEditorParams: {
      required: true,
      selectData: selectData,
      placeholder: "Select an option"
    },
    valueFormatter: params => {
      if (params.value) {
        return params.value.label || params.value.value || params.value;
      }
      return "";
    },
    editable: true
  },
  {
    headerName: "Model",
    field: "model",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: selectData.map(d => d.label)
    },
    editable: true
  },
  {
    headerName: "Price",
    field: "price",
    editable: true
  },
  {
    headerName: "Ajax country request",
    field: "country",
    cellEditor: AutocompleteSelectCellEditor,
    cellEditorParams: {
      autocomplete: {
        fetch: (cellEditor, text, update) => {
          console.log(cellEditor);
          let match =
            text.toLowerCase() || cellEditor.eInput.value.toLowerCase();
          let xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
              let data = JSON.parse(xmlHttp.responseText);
              let items = data.map(d => ({
                value: d.numericCode,
                label: d.name,
                group: d.region
              }));
              update(items);
            }
            if (xmlHttp.status === 404) {
              update(false);
            }
          };
          xmlHttp.open(
            "GET",
            `https://restcountries.eu/rest/v2/name/${match}`,
            true
          );
          xmlHttp.send(null);
        }
      },
      placeholder: "Select a country"
    },
    valueFormatter: params => {
      if (params.value) {
        return params.value.label || params.value.value || params.value;
      }
      return "";
    },
    editable: true
  },
  {
    headerName: "Capital slow request with spinner",
    field: "city",
    cellEditor: AutocompleteSelectCellEditor,
    cellEditorParams: {
      autocomplete: {
        fetch: (cellEditor, text, update) => {
          let spinnertimeout;
          let match =
            text.toLowerCase() || cellEditor.eInput.value.toLowerCase();
          let spinner = document.createElement("i");
          spinner.className = "ag-cell-editor-autocomplete-spinner";
          let editor = document.getElementsByClassName("autocomplete")[0];
          console.log("editor: ", editor);
          if (editor && !editor.querySelector("i")) {
            spinnertimeout = setTimeout(() => editor.prepend(spinner), 200);
          }
          let xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = () => {
            clearTimeout(spinnertimeout);
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
              let data = JSON.parse(xmlHttp.responseText);
              let items = data.map(d => ({
                value: d.capital,
                label: d.capital
              }));
              update(items);
            }
            if (xmlHttp.status === 404) {
              update(false);
            }
          };
          setTimeout(() => {
            xmlHttp.open(
              "GET",
              `https://restcountries.eu/rest/v2/capital/${match}`,
              true
            );
            xmlHttp.send(null);
          }, 500);
        }
      },
      placeholder: "Select a capital"
    },
    valueFormatter: params => {
      if (params.value) {
        return params.value.label || params.value.value || params.value;
      }
      return "";
    },
    editable: true
  }
];
const columnDefs1 = [
  {
    headerName: "Already present data selector",
    field: "make",
    cellEditor: AutocompleteSelectCellEditor,
    cellEditorParams: {
      required: true,
      selectData: selectData,
      placeholder: "Select an option"
    },
    valueFormatter: params => {
      if (params.value) {
        return params.value.label || params.value.value || params.value;
      }
      return "";
    },
    editable: true
  }
];
const gridOptions = {
  columnDefs: columnDefs1,
  rowData: rowDatas1,
  suppressScrollOnNewData: false,
  rowHeight: 20
};
@Component({
  selector: 'app-doc-entry',
  templateUrl: './doc-entry.component.html',
  styleUrls: ['./doc-entry.component.css'],

})
export class DocEntryComponent implements OnInit {
  api: GridApi
  api1: GridApi



  columnApi: ColumnApi

  animationState = "in";

  rowDatas = [
    { make: null },{ make: null },{ make: null },{ make: null },{ make: null },{ make: null }
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null },
    // { make: null, model: null, price: null, country: null, city: null }
  ];

  columnDefs = [
    {
      headerName: "Already present data selector",
      field: "make",
      cellEditor: AutocompleteSelectCellEditor,
      cellEditorParams: {
        required: true,
        selectData: selectData,
        placeholder: "Select an option"
      },
      valueFormatter: params => {
        if (params.value) {
          return params.value.label || params.value.value || params.value;
        }
        return "";
      },
      editable: true
    }
  ];
  isHide:boolean=false
  constructor(private route:Router,private docService:DoctorService) {

  }

  ngOnInit(): void {
    //// let eGridDiv: HTMLElement = document.querySelector("#myGrid");
    // let eGridDiv1: HTMLElement = document.querySelector("#myGrid1");
    //new Grid(eGridDiv, gridOptions);
    // new Grid(eGridDiv1, gridOptions);
  }

  toggleShowDiv(divName: string) {
    if (divName === "divA") {
      console.log(this.animationState);
      this.animationState = this.animationState === "out" ? "in" : "out";
      console.log(this.animationState);
    }
  }


  //table for diagnosis 
  onGriReadydDiagnosis(){

  }

  //table for treatment
  onGridReadyTreatment(){

  }

  //get data ready for grid data
  onGridReady(params): void {
    this.api = params.api
    this.columnApi = params.columnApi
    this.api.sizeColumnsToFit()
    params.api.resetRowHeights();
  }

  onGridReady1(params): void {
    // this.api1 = params.api
    // this.columnApi = params.columnApi
    // this.api1.sizeColumnsToFit()
    // params.api.resetRowHeights();
    this.api1 = params.api;
    this.api1.sizeColumnsToFit();
  }

  started(e: any) {
    console.log("editing")
    console.log(e)
  }

  isEditing = false;
   @HostListener('keydown', ['$event'])
  onKeydown(event) {
    event.stopPropagation();
   
    if (event.key == "Escape") {
      console.log('esc')
      return false;
    }
    if (event.key == "Enter" || event.key == "Tab") {
      console.log("enter")
      this.isEditing = false;
      return false;
    }
    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      console.log('up or down')
      return false;
    }
    if (this.isEditing == false) {
      console.log(event)
      if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
        document.querySelector<HTMLElement>(`#myGrid1`).focus()
        this.api1.setFocusedCell(this.currIndex, 'make');
        return false;
      }
    }

    return true
  }

  cellEditingStarted(event) {
    this.isEditing = true
    console.log("is editing")
  //  this.api.setFocusedCell(event.rowIndex, event.colDef.field);
  }

  currIndex=0
  cellEditingStopped(event) {
    console.log(event)
    this.currIndex=event.node.childIndex
    this.isEditing = false
    console.log("stop editing")
    this.api.setFocusedCell(event.rowIndex, event.colDef.field);
  }

  
  cellStyle='stickyInner-close'
  clickChange(){
    if(this.cellStyle == 'stickyInner-close') {
      this.cellStyle = 'stickyInner-open';
    } else {
      this.cellStyle = 'stickyInner-close';
    }
  }

}
