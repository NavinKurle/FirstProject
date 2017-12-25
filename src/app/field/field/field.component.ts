import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { ChangeDetectionStrategy } from '@angular/core';

export type FieldState = number[][];

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {

  size: number = 4;
  baseValue: number = 2;

  // private state$ = new BehaviorSubject<FieldState>(new Array(this.size).fill(new Array(this.size).fill(null)));
  private state$ = new BehaviorSubject<FieldState>(new Array(this.size).fill(null).map(_ => new Array(this.size).fill(null)));

  constructor() { }

  ngOnInit() {

    console.log("Init state "+ this.state$.value);

  }

  fill(x,y){
    let field = this.state$.value;
    field[x][y] = this.baseValue;
  }

  createRandom(){
    
    let field = this.state$.value;
    console.log("Field value is "+field);
    //gather empty
    let empties = [];
    this.state$.value.forEach((row, rowIndex)  => {
      row.forEach((tile, tileIndex) => {        
        if(tile === null){
          empties.push([rowIndex,tileIndex]);
        }
      })
    });
    
    console.log("Empties "+empties);
    console.log("Empties length "+empties.length);
    if(empties.length === 0){
      throw new Error("Empty empties");
    }

    const raandNo = Math.floor(Math.random()*empties.length)

    let coOrdinates: number[] = empties[raandNo];
    console.log("Coordinates are "+coOrdinates);
    console.log("Empties size "+ empties[4]);
    console.log("Checking math "+raandNo+" and empties array "+empties[raandNo]);
    console.log("Coordinates 0 is "+coOrdinates[0] +" and coordinates1 is "+coOrdinates[1]);
    field[coOrdinates[0]][coOrdinates[1]] = this.baseValue;;

    console.log("update ", coOrdinates, field);

    // this.state$.filter((sub: number[][], index) => sub[index][index] === field[coOrdinates[0]][coOrdinates[1]]);
    // this.state$.next(field); //alternate option for filter 
  }

  moveRight(){

    let field = this.state$.value;
    console.log("Field value in right move "+field);

    let moves = [];
    this.state$.value.forEach((row, rowIndex)  => {
      // console.log("Row value is "+row+"and row index is "+rowIndex);
      row.forEach((tile, tileIndex) => {                
          //check edge
          console.log("Tile value is "+tile+"and Tile index is "+tileIndex);
          // field[rowIndex][tileIndex + 1] === null condn is used to check whether tile right to not null tile is null or not
          if(tile !== null && tileIndex < this.size - 1 && field[rowIndex][tileIndex + 1] === null){
            console.log("Tile indecx "+(tileIndex+1));
            console.log("Tile indecx field "+field[rowIndex][tileIndex + 1]);
            moves.push([rowIndex, tileIndex]);
          }
        
      })
    });

    moves.forEach(coords => {
      field[coords[0]][coords[1] +1] = field[coords[0]][coords[1]];
      field[coords[0]][coords[1]] = null;
    });

    //alternate code for right keypress

    // for(let rowInd = 0; rowInd < this.size; rowInd++){
    //   for(let tileInd = this.size -1; tileInd >= 0; tileInd--){
    //     const tileValue = field[rowInd][tileInd];
    //     if(tileValue !== null && tileInd < this.size - 1 && field[rowInd][tileInd + 1] === null){
    //       field[rowInd][tileInd +1] = field[rowInd][tileInd];
    //       field[rowInd][tileInd] = null;
    //     }
    //   }
    // }

  }

  moveUp(){

    let field = this.state$.value;

    for(let rowInd = 0; rowInd < this.size; rowInd++){
      for(let tileInd = 0; tileInd < this.size ; tileInd++){
        const tileValue = field[rowInd][tileInd];
        if(tileValue !== null && rowInd > 0 && field[rowInd-1][tileInd] === null){
          field[rowInd-1][tileInd] = tileValue;
          field[rowInd][tileInd] = null;
        }
      }
    }
 
  }

  moveDown(){

    let field = this.state$.value;
    
    for(let rowInd = this.size -1; rowInd >= 0; rowInd--){
      for(let tileInd = 0; tileInd < this.size ; tileInd++){
        const tileValue = field[rowInd][tileInd];
        if(tileValue !== null && rowInd < this.size - 1 && field[rowInd+1][tileInd] === null){
          field[rowInd+1][tileInd] = tileValue;
          field[rowInd][tileInd] = null;
        }
      }
    }

  }

  moveLeft(){

    let field = this.state$.value;

    for(let rowInd = 0; rowInd < this.size; rowInd++){
      for(let tileInd = 0; tileInd < this.size ; tileInd++){
        const tileValue = field[rowInd][tileInd];
        if(tileValue !== null && tileInd > 0 && field[rowInd][tileInd - 1] === null){
          field[rowInd][tileInd-1] = tileValue;
          field[rowInd][tileInd] = null;
        }
      }
    }

  }

}
