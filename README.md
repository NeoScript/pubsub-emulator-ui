# PubSub Emulator UI
This application is meant to assist in local development of software related to Google Pub/Sub. This will allow one to view and create pubsub messages as well as create topics + pull subscriptions on a locally hosted instance of the pubsub emulator

## Quickstart

1. Utilize docker to run the pubsub emulator ui
   ```
   docker run -p 4200:80 ghcr.io/neoscript/pubsub-emulator-ui:latest
   ```
   - Note if you want to also spin up an instance of the pubsub emulator take a look at the [`docker-compose.yml`](https://github.com/NeoScript/pubsub-emulator-ui/blob/main/docker-compose.yml) file in this project's root 😉
2. Add the project you would like to track
   ![Screenshot from 2024-02-09 09-15-28](https://github.com/NeoScript/pubsub-emulator-ui/assets/3144162/7eab63e9-361e-45f4-9d29-714e6c286bb3)
3. Now add topics/subscribers and send/receive messages as you would like 😄
   ![Screenshot from 2024-02-09 09-16-26](https://github.com/NeoScript/pubsub-emulator-ui/assets/3144162/a5b6523a-30e8-4cdd-a4e6-620c58152067)

### Motivations
 - The current Google Pub/Sub emulator does not have any visual tooling
 - I hate having to communicate with the emulator strictly through code
 - An existing project ([gcp-pubsub-emulator-ui](https://github.com/echocode-io/gcp-pubsub-emulator-ui)) would allow users to pull messages, but was limited to only pulling 1 message at a time.
   - I didn't know enough about Maven/Gradle/Java to go in and modify so I just decided to rebuild the tool and try and pick-up some new skills in the process.

## Setting Up For Development

1. First Clone the repository
    ```
    git clone https://github.com/NeoScript/pubsub-ui.git
    ```
2. Then open the folder with VSCode
    - vscode is not required, but I've got a .devcontainers setup that may be helpful
    ```
    cd pubsub-ui
    code .
    ```
3. Reopen the workspace in a container
    - To learn more about devcontainers check out [this link](https://code.visualstudio.com/docs/remote/containers)
4. Spin up the supporting docker-compose file
    - note: we are currently spinning up [this very helpful wrapper](https://github.com/marcelcorso/gcloud-pubsub-emulator) around the emulator.
    - at some point we may try and transition to just spinning up the gcloud sdk itself (if anyone knows an easy way, tell me!)

5. Start serving the angular webapp
    ```
    cd webapp
    npm run start
    ```
6. You should now be able to develop and have changes trigger refreshes on the webapp!

---
### Additional Info
LICENSE: MIT

All improvements and suggestions are welcome!
