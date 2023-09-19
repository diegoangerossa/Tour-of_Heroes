import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private heroService: HeroService
    ) {}

  ngOnInit(){
    const heroId = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(heroId)
    .subscribe(hero => this.hero = hero);
  }

  goBack(){
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
