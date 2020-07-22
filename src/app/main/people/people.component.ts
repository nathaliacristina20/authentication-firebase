import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Person } from '../person';
import { Observable } from 'rxjs';
import * as faker from 'faker';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

    people$: Observable<Person[]>;

    constructor(private mainService: MainService) { }

    ngOnInit(): void {
        this.people$ = this.mainService.getPeople();
    }

    addOne(): void{
        const p: Person = {
            name: faker.name.findName(),
            age: faker.random.number({ min: 18, max: 99}),
            email: faker.company.companyName(),
            country: faker.address.country(),
            company: ''
        };
        this.mainService.addPerson(p);
    }

    generate(): void{
        for (let i = 0; i < 5; i++){
            this.addOne();
        }
    }

}
