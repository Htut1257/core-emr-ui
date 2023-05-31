import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms"

@Injectable({
    providedIn: 'root'
})

export class CommonFunction {

    form: FormGroup

    public focusElement(form: FormGroup, eleString: string, nextString: string, type: string) {
        if (type == "autocomplete") {
            if (this.form.controls['' + eleString + ''].value == null) {
                return
            }
        }
        if (type == "option") {
            if (this.form.controls['' + eleString + ''].value == null) {
                return
            }
        }
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
    }

}