import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: `
    <h3>Profile informations</h3>
    <p>Name : <span>{{ data()?.['name'] }}</span></p>
    <p>Age : <span>{{ data()?.['age'] }}</span></p>
    <p>Last order : <span>{{ data()?.['lastOrder'] }}</span></p>
    `,
    selector: 'information-component'
})
export class InformationComponent {
    #activatedRoute = inject(ActivatedRoute);
    data = toSignal(this.#activatedRoute.data)
}