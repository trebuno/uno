import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
firebase.initializeApp(environment.firebase);

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private router: Router
    ) { }

    public startUI(element: Element | string): void {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        ui.start(element, {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl: string): boolean => {
                    this.saveCredentials(authResult.user).then(() => {
                        if (redirectUrl) {
                            this.router.navigate([redirectUrl]);
                        } else {
                            this.router.navigate(['/']);
                        }
                    })
                    return;
                }
            }

        });
    }

    public saveCredentials(user: any): Promise<Boolean> {
        //save logic
        return Promise.resolve(true);
    }
}