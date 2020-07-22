import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth) { }

    register(user: User): Observable<boolean>{
        console.log(user);
        return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
            .pipe(
                switchMap((u: firebase.auth.UserCredential) =>
                    this.userCollection
                        .doc(u.user.uid)
                        .set({ ...user, id: u.user.uid})
                        .then(() => true)
                ),
                catchError((err) => throwError(err))
            );
    }

    login(email: string, password: string): Observable<User>{
        return from(this.afAuth.signInWithEmailAndPassword(email, password))
            .pipe(
                switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc<User>(u.user.uid).valueChanges()),
                catchError(() => throwError('Invalid credentials or user is not registered.'))
            );
    }

    logout(): void{
        this.afAuth.signOut();
    }

    getUser(): Observable<User | null>{
        return this.afAuth.authState
            .pipe(
                switchMap(u => u ? this.userCollection.doc<User>(u.uid).valueChanges() : null)
            );
    }

    authenticated(): Observable<boolean>{
        return this.afAuth.authState
            .pipe(
                map(u => u ? true : false)
            );
    }
}
