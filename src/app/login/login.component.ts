import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService } from "./login.service";
import * as dialog from "tns-core-modules/ui/dialogs";


@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {

    user: User = { username: "username", password: "password" };

    loginForm: FormGroup = this.fb.group({
        username: [this.user.username, [Validators.required]],
        password: [this.user.password, [Validators.required]],
    });

    username = this.loginForm.get("username");
    password = this.loginForm.get("password");


    constructor(
        private page: Page,
        private fb: FormBuilder,
        private ls: LoginService,
        private router: RouterExtensions,
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        this.ls.isloggedIn().then(
            (res) =>{
                this.router.navigate(["/pokemon"], { clearHistory: true });
            },
            (err)=>{
                console.log(err);
            }
        )
    }

    login() {
        this.ls.login().then(
            (result) => {
                this.router.navigate(["/pokemon"], { clearHistory: true });

            }, (err) => {
                console.log(err);
            })
    }


}
