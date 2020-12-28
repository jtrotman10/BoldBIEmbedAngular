import { Component, OnInit } from '@angular/core';
import { Item } from '../app';
import { appService } from '../app.service';
import { AppComponent } from '../app.component';
declare var BoldBI: any;
@Component({
    selector: 'app-dashboard-listing',
    templateUrl: './dashboard-listing.component.html',
    styleUrls: ['./dashboard-listing.component.css'],
    providers: [appService]
})

export class DashboardListing implements OnInit {

    public dashboardsList: Item[];
    result: any;
    dashboard: any;
    constructor(private _app: appService, private _appComponent: AppComponent) {
    }

    ngOnInit() {
        if (this._appComponent.environment == "enterprise") {
            this._appComponent.baseUrl = this._appComponent.rootUrl + "/" + this._appComponent.siteIdentifier;
            this._appComponent.dashboardServerApiUrl = this._appComponent.rootUrl + "/api/" + this._appComponent.siteIdentifier;
        }
        else {
            this._appComponent.baseUrl = this._appComponent.rootUrl;
            this._appComponent.dashboardServerApiUrl = this._appComponent.rootUrl + "/api";

        }
        // this._app.Gettoken(this._appComponent.dashboardServerApiUrl,this._appComponent.userId,this._appComponent.userPassword).subscribe(data => {
        //     this.result = data;
        //     this._appComponent.token = JSON.parse(this.result.Token).access_token;
        //     this._app.GetDashboards(this._appComponent.getDashboardsUrl).subscribe(data => {
        //         this._appComponent.dashboards = <any>data;
        //         this.dashboardsList = this._appComponent.dashboards;
        //     });
        // });
        this._app.GetDashboards(this._appComponent.apiHost + this._appComponent.getDashboardsUrl).subscribe(data => {
            this._appComponent.dashboards = <any>data;
            this.dashboardsList = this._appComponent.dashboards;
            this.renderDashboard(this.dashboardsList[0]);
        });
    }

    renderDashboard(dashboard: Item) {
        this.dashboard= BoldBI.create({
            serverUrl: this._appComponent.baseUrl,
            dashboardId: dashboard.Id,
            embedContainerId: "dashboard",
            embedType: BoldBI.EmbedType.Component,
            environment: this._appComponent.environment=="enterprise"? BoldBI.Environment.Enterprise:BoldBI.Environment.Cloud,
            width:"100%",
            height:"100%",
            expirationTime:100000,
            authorizationServer: {
                url:this._appComponent.apiHost + this._appComponent.authorizationUrl,
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5RDBGMUQ1QjUyQUI3M0Q2QTcxQTUyRERGMTdENjJERkQ0NjJCOEIiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJlZER4MWJVcXR6MXFjYVV0M3hmV0xmMUdLNHMifQ.eyJuYmYiOjE2MDkxODA2MTEsImV4cCI6MTYwOTE4NDIxMSwiaXNzIjoiaHR0cHM6Ly9tZWRjb21wbGkyLWlkZW50aXR5LXNlcnZlci5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6InNwYS1hcGkiLCJjbGllbnRfaWQiOiJva3RhdGVzdC5tZWRjb21wbGkyLmNvbSIsInN1YiI6Ijk1ZDAwNWJhLTM2OGMtNDZmOS02Mzg1LTA4ZDgzNGNiMjkxMCIsImF1dGhfdGltZSI6MTYwOTE3MzUyNSwiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IlhDTVFKTENZNERKSzVXUzU1VDNCVVJDRk9JSkJHTEo0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI5NWQwMDViYS0zNjhjLTQ2ZjktNjM4NS0wOGQ4MzRjYjI5MTAiLCJ1c2VyRnVsbE5hbWUiOiJKZWZmIFRyb3RtYW4iLCJmaXJzdE5hbWUiOiJKZWZmIiwicHJlZmVycmVkX3VzZXJuYW1lIjoianRyb3RtYW5Ad2VzdGdsZW5uLmNvbSIsIm5hbWUiOiJqdHJvdG1hbkB3ZXN0Z2xlbm4uY29tIiwiZW1haWwiOiJqdHJvdG1hbkB3ZXN0Z2xlbm4uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInJvbGUiOlsiQWRtaW4iLCJFbXBsb3llZSJdLCJCdXNpbmVzc0lkIjoiMTEiLCJJbmRpdmlkdWFsSWQiOiI2NSIsImdpdmVuX25hbWUiOiJqdHJvdG1hbkB3ZXN0Z2xlbm4uY29tIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInNwYS1hcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.SEH3q7U10KVafjiyLkwfMd4oDDp3ASPPW1gb54igC37QQpiIvmwyJ1BDY8vIC14CAVV1EqTML7nBASCmeaDh42kHwZQ2tk2e2ASiR23p6HB5dxgcLRxZC44Edhemj9roIHJqnHwod0SjV6GWJEQOqNNEWgcBTRP5YzLr5-PVlmMCWWe5sEk3oU0Yz36_8zhhHw6QE-JDzZJFtDKNYYaSolBjjImvdgk6V9Jgig85KH7tuU9-nki-DJPsgzLnLGAn1D55LbNDTIOn16Oild-USKZeCArPyxfv8N2EpoMRTAtyrhmZ-lt6rMr6xvcYDZjx943IIHHFbOdHc7d4hg9hrA'
                }
            },
            autoRefreshSettings: {
                enabled: true,
                hourlySchedule: {
                    hours: 0,
                    minutes: 1,
                    seconds: 0
                }

            },
            actionBegin:"emdbedDashboardActionBegin",
            actionComplete:"emdbedDashboardActionComplete"
        });

        console.log(this.dashboard);
        this.dashboard.loadDashboard();        
    } 
}
