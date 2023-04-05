import {animate, state, style, transition, trigger, useAnimation} from "@angular/animations";
import {
  backInDown, backInUp,
  bounce, bounceOut,
  fadeIn, fadeInUpBig, fadeInX, fadeOut, flash,
  flip, headShake, heartBeat, hinge,
  jackInTheBox,
  jello, lightSpeedIn, pulse,
  rollIn,
  rotateInDownLeft, rubberBand, slideInUp,
  swing, tada, wobble,
  zoomIn, zoomOut,
  zoomOutUp
} from "ng-animate";



export const scoreAnimation = trigger('score', [
  transition('normal => animateTrue', useAnimation(flash)),
  transition('normal => animateFalse',useAnimation(bounce))
]);

export const  zoomAnimation = trigger('zoomAnimation', [
  transition('false => true',useAnimation(jello))
])


export const  deleteAnimation = trigger('deleteAnimation', [
  transition('false => true',useAnimation(flip))
]);

export const animationTile = trigger('animationTile', [
    transition(':enter', useAnimation(fadeIn), {
      params: {
        timing: 5,
        delay: 0.5
      }
    }),

  ]);
export const animationRow = trigger('animationRow', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0.8)'}),
    animate('0.5s ease-in-out', style({opacity: 1, transform: 'scale(1)'}))
  ])
]);



