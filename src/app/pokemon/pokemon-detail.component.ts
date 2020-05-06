import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PokemonService } from "./pokemon.service";

@Component({
    selector: "ns-details",
    templateUrl: "./pokemon-detail.component.html"
})
export class PokemonDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
    }
}
