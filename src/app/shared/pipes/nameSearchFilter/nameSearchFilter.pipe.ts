import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nameSearchFilter'
})
export class NameSearchFilterPipe implements PipeTransform {
    
    transform(original: any[], fieldName: string, search: string): any {
        if (!original) {
            return [];
        }

        if (original.length === 0) {
            return original;
        }

        if(search === '' || search === null){
            return original;
        }

        search=search.toLowerCase();
        
        return original.filter((value : any) => {
            let tempName: string = value[fieldName].toString().toLowerCase();
            return tempName.indexOf(search) != -1;
        });

        
    }
    
}
