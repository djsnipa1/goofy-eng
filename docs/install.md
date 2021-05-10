# Installation and configuration

You will create your own copy of the library. You will be the only one with access to everything that happens in this copy unless it is shared afterwards. 

## First installation

Executed once. 
> [Video instruction](https://drive.google.com/file/d/1yhI8sfBVAyhn5RUUtOxKLiYSgdIF9Ts9/view) with the new Apps Script platform interface. 
> 
> [Video instruction](https://drive.google.com/file/d/13I_E9g5x_Gb-G-KANmzUxLgDv-bPkQsu/view) for the old interface.

1. Go to [Spotify Dashboard](https://developer.spotify.com/dashboard/). Click on `Log in` and log in to Spotify. Accept the terms of use.

   ![Terms of Use](/img/install-step-dashboard-term.png)

2. Click the `Create an app` button. Enter any name and description. Check the boxes. Click the `Create` button.

   ![Application creation](/img/install-step-create-app_eng.png)

3. Switch to [library in Apps Script](https://script.google.com/d/1DnC4H7yjqPV2unMZ_nmB-1bDSJT9wQUJ7Wq-ijF4Nc7Fl3qnbT0FkPSr/edit?usp=sharing). Sign in to your Google account if required.

4. Select on the left `Overview` and on the right `Create a copy`. A copy created on your account will open. Rename, if necessary (click on the name at the top of the page).

    ![Create a copy](/img/install-step-copy_eng.png)

5. Go to the file `config.gs`. Insert `CLIENT_ID` and` CLIENT_SECRET` instead of `yourID`. Take the values in the created Spotify application in step 2.

   Save the change `Ctrl + S` or the floppy disk icon in the action bar

   ![Client ID and Client Secret](/img/install-step-client-id2_eng.png)

6. Run the function execution in the editor `setProperties`. 

   ![run setProperties](/img/install-run-setProperties_eng.png)

   You will see a pop-up message asking you to grant access rights. Agree to be issued.

   ![request rights](/img/install-permission-request.png)

   Select the Google account that created the copy of the library.

   ![Account selection](/img/install-step-account_eng.png)

   Click on `Advanced Settings`, then` Go to the "Copy of Goofy (Ver. 1.X)" page`

   ![Account selection](/img/install-step-warning_eng.png)

   Click the `Allow` button at the bottom of the window.

   ![Account selection](/img/install-step-grant-permissions_eng.png)

7. The window will close. Select `Start Deployment` - `Test Deployments`

   ![Deploy web application](/img/install-step-webapp_eng.png)

   In the window that appears, copy the link. Must end with `dev`.

   ![Copy link](/img/install-step-link_eng.png)

8. In a **new tab** follow the copied link. On the page that opens, copy the link at the bottom of the page. Ends with `usercallback`.

   ![Callback link](/img/install-step-callback-link.png)

9. Return to [Spotify Dashboad](https://developer.spotify.com/dashboard/). Press the `EDIT SETTINGS` button for your application.
    
    Paste the copied link from step 8 into the `Redirect URIs` field. Press the` ADD` button. Then at the bottom the `Save` button.
    
    ![Add callback](/img/install-step-dashboard-redirect.png)

10. Go to the tab from step 8 and refresh this page (`F5`).

    Click the `Authorize` button.

    ![Callback-link](/img/install-step-callback-link.png)

    Allow access to your Spotify account.

    ![Spotify Permissions](/img/install-step-grant-spotify_eng.png)

    Words of successful completion should appear.

    The first installation and configuration is now complete.

## Configuring Lastfm

If not used, do not need to be performed.

1. Create an entry point [here](https://www.last.fm/api/account/create). Fill in the title and description arbitrarily. Skip the rest, leave blank.
2. Assign the received `API key` to the parameter` LASTFM_API_KEY`.
3. Start execution of the `setProperties` function in the editor.

![Lastfm account api](/img/lastfm_account_api3_eng.png)

## Refresh library

1. Replace the entire contents of the `library.gs` file with a new one (Ctrl + A, Ctrl + V) taken from [here](https://github.com/Chimildic/goofy/blob/main/library.js) or [here](https://script.google.com/d/1DnC4H7yjqPV2unMZ_nmB-1bDSJT9wQUJ7Wq-ijF4Nc7Fl3qnbT0FkPSr/edit?usp=sharing) (Ctrl + A, Ctrl + C)
2. Save the file: `File` -` Save` or Ctrl + S

## Update parameters

1. Change the required parameter in the file `config.gs`
2. Run the `setProperties` function in the editor

## Update permissions

1. Insert the following function and run it in the editor once. Then you can delete it.
    ```js
    function resetAuth(){
        Auth.reset();
    }
    ```
2. Click in the top menu of the editor `Publish` -`Deploy as web application`. For new interface: `Deploy` -`Test Deployments`
3. Copy the link from the window that opens and follow it in a new tab
4. Click on `Authorize` and confirm the new access rights