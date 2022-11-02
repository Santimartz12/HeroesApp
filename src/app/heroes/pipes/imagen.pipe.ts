import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe): string {
    if(!value.id){
      return 'assets/no-image.png';
    }else if(value.alt_img){
      return value.alt_img;
    }
    return `assets/heroes/${value.id}.jpg`;
  }

}
