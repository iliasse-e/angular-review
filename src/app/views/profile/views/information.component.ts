import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: `
    <h3>Profile informations</h3>
    <p>Name : <span>Jorik</span></p>
    <p>Age : <span>28</span></p>
    <p>Last order : <span>1 year ago</span></p>
    `,
    selector: 'information-component'
})
export class InformationComponent {
    #activatedRoute = inject(ActivatedRoute)
    constructor() {
        console.log(this.#activatedRoute);
    }
}