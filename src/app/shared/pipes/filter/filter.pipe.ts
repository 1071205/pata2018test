import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    
    transform(original: any[], fieldName: string, search: any): any {
        if (!original) {
            return [];
        }
        if (original.length === 0) {
            return original;
        }

        return original.filter((value : any) => {
            return value[fieldName] == search;
        });

        
    }
    
}
