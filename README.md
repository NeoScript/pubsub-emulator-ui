# PubSub Emulator UI

## Quickstart

1. download the docker-compose.yml
2. Spin up the emulator + ui
    ```
    docker-compose up
    ```
3. You will have a pubsub emulator running with the project name: `test-project`
    - feel free to modify the topic + subscriptions in the docker compose for your needs
4. Run docker ps to list the running containers so that you can see the ports you need to connect to
    - by default emulator on 8681, ui on 7200 (you can change this in docker-compose)


## Introduction
This application is meant to assist in local development of software related to Google Pub/Sub.

### Screenshots
[![Screenshot-from-2022-05-15-15-47-40.png](https://i.postimg.cc/Fzy9cv7Q/Screenshot-from-2022-05-15-15-47-40.png)](https://postimg.cc/wRB88SXW)

[![Screenshot-from-2022-05-15-15-48-34.png](https://i.postimg.cc/2jhjgQTX/Screenshot-from-2022-05-15-15-48-34.png)](https://postimg.cc/CdMVqf3j)

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
    - VSCode is NOT required, but I've got some .devcontainers setup that may be helpful
    ```
    cd pubsub-ui
    code .
    ```
3. Reopen the workspace in a container
    - To learn more about devcontainers check out [this link](https://code.visualstudio.com/docs/remote/containers)
4. Spin up the supporting docker-compose file
    - note: we are currently spinning up [this very helpful wrapper](https://github.com/marcelcorso/gcloud-pubsub-emulator) around the emulator.
    - additionally I have the [gcp-pubsub-emulator-ui](https://github.com/echocode-io/gcp-pubsub-emulator-ui) image spinning up as well just so I can use it as a reference for some functionality
    - at some point we may try and transition to just spinning up the gcloud sdk itself

5. Start serving the angular webapp
    ```
    cd webapp
    npm run start
    ```
6. You should now be able to develop and have changes trigger refreshes on the webapp!