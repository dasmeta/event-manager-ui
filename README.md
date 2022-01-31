### install

```
 // npm
 npm install @dasmeta/event-manager-ui
 // yarn 
 yarn add @dasmeta/event-manager-ui
```

### usage

```jsx harmony
import React from "react";
import { PageDetailProvider } from "components/Page/PageDetail";
import MicroServiceUI from "@dasmeta/microservice-ui";


const getStats = async () => {
    // ...
    return [];
};
const republishFail = async ({topic, subscription}) => {
    // ...
};
const republishError = async ({topic, subscription}) => {
    // ...
};
const cleanAnomaly = async ({topic, subscription}) => {
    // ...
};
const populateMissing = async ({topic, subscription}) => {
    // ...
};
const calculateStats = async () => {
    // ...
};
const getError = async ({topic, subscription}) => {
    // ...
    return [];
};
const getEvent = async (eventId) => {
    // ...
    return {};
};

const googleBoard = "YOUR_GOOGLE_DASHBOARD_URL";
const googleZone = "GOOGLE_ZONE";
const googleProjectId = "YOUR_GOOGLE_PROJECT_ID";

export default () => {
    return (
        <MicroServiceUI
            onGetStats={async (...args) => {
                const { list } = await getStats(...args);
                return list;
            }}
            onRepublishFail={republishFail}
            onRepublishError={republishError}
            onCleanAnomaly={cleanAnomaly}
            onPopulateMissing={populateMissing}
            onCalculateStats={calculateStats}
            onGetError={async (...args) => {
                const { list } = await getError(...args);
                return list;
            }}
            onGetEvent={getEvent}
            options={{
                googleBoard,
                googleZone,
                googleProjectId,
            }}
            render={({ title, renderActions, renderSearch, renderLinks, renderList }) => (
                <>
                    <PageDetailProvider
                        title={title}
                        action={renderActions()}
                        content={renderSearch()}
                        extraContent={renderLinks()}
                    />
                    {renderList()}
                </>
            )}
        />
    );
};
```
